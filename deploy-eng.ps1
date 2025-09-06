# Simple Deployment Script
# This script avoids using any non-ASCII characters

# Create dist.zip
Write-Host "Creating deployment package..." -ForegroundColor Yellow
Compress-Archive -Path dist/* -DestinationPath dist.zip -Force

# Output deployment instructions
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Please follow these steps to deploy manually:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Upload dist.zip to server via SCP:" -ForegroundColor Green
$username = Read-Host -Prompt "Enter server username"
Write-Host "scp -P 22 ./dist.zip $username@116.62.56.214:/tmp/" -ForegroundColor White
Write-Host ""
Write-Host "2. Connect to server via SSH:" -ForegroundColor Green
Write-Host "ssh -p 22 $username@116.62.56.214" -ForegroundColor White
Write-Host ""
Write-Host "3. Execute these commands on server:" -ForegroundColor Green
Write-Host "unzip -o /tmp/dist.zip -d /tmp/dist-temp" -ForegroundColor White
Write-Host "sudo rm -rf /usr/share/nginx/html/*" -ForegroundColor White
Write-Host "sudo cp -r /tmp/dist-temp/* /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo restorecon -Rv /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host "rm -rf /tmp/dist.zip /tmp/dist-temp" -ForegroundColor White
Write-Host ""
Write-Host "4. Exit SSH connection when done" -ForegroundColor Green
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "After deployment, verify at http://116.62.56.214" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
