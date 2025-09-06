param(
    [Parameter(Mandatory=$true)]
    [string]$RemoteHost,
    
    [Parameter(Mandatory=$true)]
    [string]$RemoteUser,
    
    [Parameter(Mandatory=$true)]
    [string]$RemotePath
)

# 构建项目
Write-Host "正在构建项目..." -ForegroundColor Green
npm run build

# 检查构建是否成功
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}

# 压缩dist目录
Write-Host "正在压缩构建文件..." -ForegroundColor Green
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# 使用SCP上传文件
Write-Host "正在上传到服务器..." -ForegroundColor Green
scp ".\dist.zip" "${RemoteUser}@${RemoteHost}:${RemotePath}"

# 使用SSH执行远程命令
Write-Host "正在部署文件..." -ForegroundColor Green
ssh "${RemoteUser}@${RemoteHost}" "cd ${RemotePath} && rm -rf dist/* && unzip -o dist.zip -d dist/ && rm dist.zip"

# 清理本地临时文件
Remove-Item ".\dist.zip" -Force

Write-Host "部署完成！" -ForegroundColor Green
