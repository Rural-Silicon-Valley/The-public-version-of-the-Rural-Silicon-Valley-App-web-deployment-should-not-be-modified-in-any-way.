param (
    [string]$ServerIP = "116.62.56.214",
    [string]$Username = "root"
)

$nginxConfig = @"
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;

    # SPA路由支持
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
"@

# 连接到服务器并检查nginx配置
$SshCommands = @"
echo '$nginxConfig' > /etc/nginx/conf.d/app.conf
nginx -t
"@

Write-Host "正在检查Nginx配置..." -ForegroundColor Yellow
$SshCommand = "ssh ${Username}@${ServerIP} `"$SshCommands`""
Invoke-Expression $SshCommand
