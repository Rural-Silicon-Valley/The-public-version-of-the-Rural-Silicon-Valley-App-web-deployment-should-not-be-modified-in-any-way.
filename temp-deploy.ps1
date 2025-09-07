# 显示开始信息
Write-Host "开始部署..." -ForegroundColor Green

# 清理并创建临时目录
Write-Host "准备文件..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# 设置 SCP 和 SSH 命令不提示主机验证
$ENV:DISPLAY = $null
$ENV:SSH_ASKPASS = $null
$Env:SCPCommand = "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
$Env:SSHCommand = "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

# 上传文件
Write-Host "上传文件到服务器..." -ForegroundColor Green
$sshPass = "your_password_here"  # 替换为实际密码
echo $sshPass | &$Env:SCPCommand ".\dist.zip" "root@116.62.56.214:/var/www/html/"

# 执行远程命令
Write-Host "部署文件..." -ForegroundColor Green
echo $sshPass | &$Env:SSHCommand "root@116.62.56.214" "cd /var/www/html && unzip -o dist.zip -d . && rm -f dist.zip"

# 清理
Write-Host "清理临时文件..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

Write-Host "部署完成！" -ForegroundColor Green
