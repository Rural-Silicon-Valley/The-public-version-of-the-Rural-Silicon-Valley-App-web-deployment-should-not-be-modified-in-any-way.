# 简单部署脚本 - v2
# 这个脚本避免使用了可能导致问题的 PowerShell 语法

# 创建 dist.zip
Write-Host "正在创建部署压缩包..." -ForegroundColor Yellow
Compress-Archive -Path dist/* -DestinationPath dist.zip -Force

# 输出部署指令
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "请按照以下步骤手动部署:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 通过SCP将dist.zip上传到服务器:" -ForegroundColor Green
$username = Read-Host -Prompt "请输入服务器用户名"
Write-Host "scp -P 22 ./dist.zip $username@116.62.56.214:/tmp/" -ForegroundColor White
Write-Host ""
Write-Host "2. 通过SSH连接到服务器:" -ForegroundColor Green
Write-Host "ssh -p 22 $username@116.62.56.214" -ForegroundColor White
Write-Host ""
Write-Host "3. 在服务器上执行以下命令:" -ForegroundColor Green
Write-Host @"
unzip -o /tmp/dist.zip -d /tmp/dist-temp
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r /tmp/dist-temp/* /usr/share/nginx/html/
sudo restorecon -Rv /usr/share/nginx/html/
sudo systemctl restart nginx
rm -rf /tmp/dist.zip /tmp/dist-temp
"@ -ForegroundColor White
Write-Host ""
Write-Host "4. 完成后退出SSH连接" -ForegroundColor Green
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "部署完成后，访问 http://116.62.56.214 验证应用" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
