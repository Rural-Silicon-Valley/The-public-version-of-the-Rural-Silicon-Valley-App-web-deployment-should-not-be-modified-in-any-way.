# 手动部署指南

以下是手动部署应用到阿里云服务器的详细步骤：

## 1. 构建应用

确保应用已正确构建：

```powershell
npm run build
```

## 2. 创建部署压缩包

```powershell
Compress-Archive -Path dist/* -DestinationPath dist.zip -Force
```

## 3. 上传文件到服务器

使用 SCP 命令上传文件（需替换 `<username>` 为您的服务器用户名）：

```bash
scp -P 22 dist.zip <username>@116.62.56.214:/tmp/
```

系统会提示您输入密码。

## 4. SSH 连接到服务器

```bash
ssh -p 22 <username>@116.62.56.214
```

输入密码登录服务器。

## 5. 在服务器上执行部署命令

登录成功后，在服务器上执行以下命令：

```bash
# 解压文件到临时目录
unzip -o /tmp/dist.zip -d /tmp/dist-temp

# 清空现有网站文件
sudo rm -rf /usr/share/nginx/html/*

# 复制新文件到网站目录
sudo cp -r /tmp/dist-temp/* /usr/share/nginx/html/

# --- 关键权限修复步骤 ---

# 1. 设置正确的文件和目录权限
sudo find /usr/share/nginx/html -type d -exec chmod 755 {} \;
sudo find /usr/share/nginx/html -type f -exec chmod 644 {} \;

# 2. 设置正确的文件所有权
sudo chown -R nginx:nginx /usr/share/nginx/html/

# 3. 恢复文件的 SELinux 安全上下文
sudo restorecon -Rv /usr/share/nginx/html/

# --- 权限修复结束 ---

# 重启 Nginx 以应用更改
sudo systemctl restart nginx

# 清理临时文件
rm -rf /tmp/dist.zip /tmp/dist-temp

echo '部署完成!'
```

## 6. 验证部署

部署完成后，在浏览器中访问 http://116.62.56.214 查看应用是否成功部署。

## 常见问题排查

### 如果无法连接到服务器

- 确认服务器 IP 地址是否正确
- 确认用户名和密码是否正确
- 确认服务器防火墙是否允许 SSH 连接

### 如果部署后网站无法访问

- 检查 Nginx 状态：`sudo systemctl status nginx`
- 检查 Nginx 配置：`sudo nginx -t`
- 检查 Nginx 日志：`sudo cat /var/log/nginx/error.log`
