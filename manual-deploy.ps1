# 部署脚本
# 请在执行前设置以下变量

$SERVER_HOST = "116.62.56.214"  # 阿里云服务器IP
$SERVER_USER = ""  # 服务器用户名
$SERVER_PORT = "22"  # SSH端口，默认22
$PRIVATE_KEY_PATH = ""  # SSH私钥路径，如果使用密码认证可以留空

# 确认变量已设置
if (-not $SERVER_USER) {
    Write-Host "请先设置服务器用户名" -ForegroundColor Red
    exit 1
}

# 确认dist.zip存在
if (-not (Test-Path ".\dist.zip")) {
    Write-Host "dist.zip不存在，请先运行构建命令: npm run build" -ForegroundColor Red
    exit 1
}

Write-Host "开始部署到服务器: $SERVER_HOST" -ForegroundColor Green

# 使用SCP上传dist.zip
if ($PRIVATE_KEY_PATH -and (Test-Path $PRIVATE_KEY_PATH)) {
    # 使用密钥认证
    Write-Host "使用SSH密钥上传文件..." -ForegroundColor Yellow
    scp -P $SERVER_PORT -i $PRIVATE_KEY_PATH .\dist.zip ${SERVER_USER}@${SERVER_HOST}:/tmp/
} else {
    # 使用密码认证（会提示输入密码）
    Write-Host "使用密码认证上传文件（请准备输入密码）..." -ForegroundColor Yellow
    scp -P $SERVER_PORT .\dist.zip ${SERVER_USER}@${SERVER_HOST}:/tmp/
}

# 执行远程部署命令
if ($PRIVATE_KEY_PATH -and (Test-Path $PRIVATE_KEY_PATH)) {
    # 使用密钥认证
    ssh -p $SERVER_PORT -i $PRIVATE_KEY_PATH ${SERVER_USER}@${SERVER_HOST} "
        unzip -o /tmp/dist.zip -d /tmp/dist-temp &&
        sudo rm -rf /usr/share/nginx/html/* &&
        sudo cp -r /tmp/dist-temp/* /usr/share/nginx/html/ &&
        sudo restorecon -Rv /usr/share/nginx/html/ &&
        sudo systemctl restart nginx &&
        rm -rf /tmp/dist.zip /tmp/dist-temp &&
        echo '部署完成'
    "
} else {
    # 使用密码认证
    ssh -p $SERVER_PORT ${SERVER_USER}@${SERVER_HOST} "
        unzip -o /tmp/dist.zip -d /tmp/dist-temp &&
        sudo rm -rf /usr/share/nginx/html/* &&
        sudo cp -r /tmp/dist-temp/* /usr/share/nginx/html/ &&
        sudo restorecon -Rv /usr/share/nginx/html/ &&
        sudo systemctl restart nginx &&
        rm -rf /tmp/dist.zip /tmp/dist-temp &&
        echo '部署完成'
    "
}

Write-Host "部署过程结束，请验证网站是否正常运行" -ForegroundColor Green
