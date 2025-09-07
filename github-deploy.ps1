[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$versionTag,
    [Parameter(Mandatory=$false)]
    [string]$message = "Release version $versionTag",
    [Parameter(Mandatory=$true)]
    [SecureString]$serverPassword,
    [Parameter(Mandatory=$false)]
    [string]$serverHost = "116.62.56.214",
    [Parameter(Mandatory=$false)]
    [string]$serverUser = "root"
)

# 将 SecureString 转换为明文密码 (仅在内存中)
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($serverPassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

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

# 添加所有更改
git add .

# 提交更改
git commit -m "$message"

# 推送到远程仓库
git push origin main

# 创建并推送标签
git tag -a "v$versionTag" -m "Version $versionTag"
git push origin "v$versionTag"

# 3. 部署到服务器
Write-Host "开始服务器部署..." -ForegroundColor Green

# 压缩dist目录
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# 设置SSH和SCP环境
$ENV:DISPLAY = $null
$ENV:SSH_ASKPASS = $null
$SCPParams = "-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
$SSHParams = "-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

# 上传文件
Write-Host "上传文件到服务器..." -ForegroundColor Green
$sshHost = "${serverUser}@${serverHost}"

Write-Output $plainPassword | scp $SCPParams ".\dist.zip" "${sshHost}:/var/www/html/"

# 执行远程命令
Write-Host "部署文件..." -ForegroundColor Green
$remoteScript = @'
cd /var/www/html;
unzip -o dist.zip -d .;
rm -f dist.zip;
'@

Write-Output $plainPassword | ssh $SSHParams $sshHost $remoteScript

# 清除密码变量
$plainPassword = $null

# 清理临时文件
Write-Host "清理临时文件..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

Write-Host "部署完成! 版本 v$versionTag 已成功部署到 GitHub 和服务器" -ForegroundColor Green
