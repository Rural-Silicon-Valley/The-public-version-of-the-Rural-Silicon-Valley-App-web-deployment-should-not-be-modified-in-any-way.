# Fix 403 Forbidden Error Script
# This script will help resolve the 403 Forbidden error by correcting file permissions

Write-Host "Creating fix permissions script..." -ForegroundColor Yellow
$username = Read-Host -Prompt "Enter server username"

# Connect to server via SSH and fix permissions
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Please execute these commands on the server to fix the 403 Forbidden error:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Connect to server via SSH:" -ForegroundColor Green
Write-Host "ssh -p 22 $username@116.62.56.214" -ForegroundColor White
Write-Host ""
Write-Host "2. Execute these commands to fix permissions:" -ForegroundColor Green
Write-Host "sudo chmod -R 755 /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo chown -R nginx:nginx /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo restorecon -Rv /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "3. If the above doesn't work, try these alternative commands:" -ForegroundColor Green
Write-Host "sudo find /usr/share/nginx/html -type d -exec chmod 755 {} \;" -ForegroundColor White
Write-Host "sudo find /usr/share/nginx/html -type f -exec chmod 644 {} \;" -ForegroundColor White
Write-Host "sudo chown -R nginx:nginx /usr/share/nginx/html/" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "4. Check Nginx configuration and logs:" -ForegroundColor Green
Write-Host "sudo nginx -t" -ForegroundColor White
Write-Host "sudo cat /var/log/nginx/error.log" -ForegroundColor White
Write-Host "sudo cat /var/log/nginx/access.log" -ForegroundColor White
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "After executing these commands, verify at http://116.62.56.214" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
