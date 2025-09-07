param (
    [string]$ServerIP = "116.62.56.214",
    [string]$Username = "root",
    [string]$RemotePath = "/usr/share/nginx/html"
)

# 压缩dist文件夹
Write-Host "正在压缩dist文件夹..."
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# 使用scp上传文件
Write-Host "正在上传文件到服务器..."
$ScpCommand = "scp .\dist.zip ${Username}@${ServerIP}:${RemotePath}/dist.zip"
Write-Host "执行命令: $ScpCommand"
Invoke-Expression $ScpCommand

# 使用ssh执行远程命令
$SshCommands = @"
cd $RemotePath
unzip -o dist.zip -d .
rm dist.zip
"@

Write-Host "正在服务器上解压文件..."
$SshCommand = "ssh ${Username}@${ServerIP} `"$SshCommands`""
Write-Host "执行命令: $SshCommand"
Invoke-Expression $SshCommand

Write-Host "部署完成！"
