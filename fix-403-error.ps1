# Fix 403 forbidden errors and permission issues
Write-Host "Fixing permissions and Nginx configuration..." -ForegroundColor Green
ssh -o StrictHostKeyChecking=no "root@116.62.56.214" @'
# 1. Set correct ownership
echo "Setting correct ownership..."
chown -R www-data:www-data /var/www/html

# 2. Set correct permissions
echo "Setting correct permissions..."
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

# 3. Update Nginx configuration
echo "Updating Nginx configuration..."
cat > /etc/nginx/conf.d/default.conf << "EOF"
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets {
        alias /var/www/html/assets;
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 404 /index.html;

    # Enable CORS
    add_header "Access-Control-Allow-Origin" "*";
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS";
    add_header "Access-Control-Allow-Headers" "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
}
EOF

# 4. Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

# 5. Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

# 6. Show status
echo "Showing Nginx status..."
systemctl status nginx

# 7. List files in web root
echo "Listing files in web root..."
ls -la /var/www/html/
'@
