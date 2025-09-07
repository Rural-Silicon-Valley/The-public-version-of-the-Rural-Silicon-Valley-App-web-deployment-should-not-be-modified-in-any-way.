# 设置参数
param(
    [string]$versionTag = "",
    [string]$message = "",
    [string]$serverHost = "116.62.56.214",
    [string]$serverUser = "root"
)

# 验证参数
if ([string]::IsNullOrEmpty($versionTag)) {
    Write-Error "请提供版本号！例如：.\github-deploy.ps1 -versionTag '1.0.0'"
    exit 1
}

if ([string]::IsNullOrEmpty($message)) {
    $message = "Release version $versionTag"
}

# 设置输出编码
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

# 显示开始信息
Write-Host "开始GitHub部署流程..." -ForegroundColor Green

# 1. 构建项目
Write-Host "构建项目..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败!" -ForegroundColor Red
    exit 1
}

# 2. Git操作
Write-Host "执行Git操作..." -ForegroundColor Green
git add .
git commit -m "$message"
git push origin main
git tag -a "v$versionTag" -m "Version $versionTag"
git push origin "v$versionTag"

# 3. 部署到服务器
Write-Host "开始服务器部署..." -ForegroundColor Green

# 压缩dist目录
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# 设置SSH参数
$sshHost = "${serverUser}@${serverHost}"
$sshKeyPath = "$env:USERPROFILE\.ssh\id_ed25519"
$sshParams = @("-i", $sshKeyPath, "-o", "StrictHostKeyChecking=no")

# 上传文件
Write-Host "上传文件到服务器..." -ForegroundColor Green
& scp $sshParams ".\dist.zip" "${sshHost}:/var/www/html/"

# 执行远程命令
Write-Host "部署文件..." -ForegroundColor Green
$remoteScript = "cd /var/www/html && unzip -o dist.zip -d . && rm -f dist.zip && chown -R nginx:nginx . && chmod -R 755 . && systemctl restart nginx"
& ssh $sshParams $sshHost $remoteScript

# 清理临时文件
Write-Host "清理临时文件..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

Write-Host "部署完成! 版本 v$versionTag 已成功部署到 GitHub 和服务器" -ForegroundColor Green
