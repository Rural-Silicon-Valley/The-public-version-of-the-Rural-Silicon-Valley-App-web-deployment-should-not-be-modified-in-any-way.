# Nginx Configuration Check Script
# This script helps check and fix Nginx configuration issues

Write-Host "Creating Nginx configuration check script..." -ForegroundColor Yellow
$username = Read-Host -Prompt "Enter server username"

# Connect to server via SSH and check Nginx config
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Please execute these commands on the server to check Nginx configuration:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Connect to server via SSH:" -ForegroundColor Green
Write-Host "ssh -p 22 $username@116.62.56.214" -ForegroundColor White
Write-Host ""
Write-Host "2. Check current Nginx configuration:" -ForegroundColor Green
Write-Host "sudo cat /etc/nginx/nginx.conf" -ForegroundColor White
Write-Host "sudo cat /etc/nginx/conf.d/default.conf" -ForegroundColor White
Write-Host ""
Write-Host "3. If needed, update the default Nginx configuration:" -ForegroundColor Green
Write-Host "sudo nano /etc/nginx/conf.d/default.conf" -ForegroundColor White
Write-Host ""
Write-Host "Make sure your server block has the following content:" -ForegroundColor Yellow
Write-Host @"
server {
    listen       80;
    server_name  _;

    # Root directory for files
    root   /usr/share/nginx/html;
    index  index.html index.htm;

    # Enable directory listing
    autoindex on;

    # Set proper permissions for files
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    }

    # Handle errors
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
"@ -ForegroundColor White
Write-Host ""
Write-Host "4. After updating the configuration, restart Nginx:" -ForegroundColor Green
Write-Host "sudo nginx -t" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "5. Check for SELinux issues:" -ForegroundColor Green
Write-Host "sudo getenforce" -ForegroundColor White
Write-Host "# If Enforcing, try setting to permissive mode temporarily:" -ForegroundColor White
Write-Host "sudo setenforce 0" -ForegroundColor White
Write-Host "# Then restart Nginx and check if it works" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "After executing these commands, verify at http://116.62.56.214" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
