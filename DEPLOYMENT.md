# 乡村硅谷APP部署指南

## 自动部署（通过GitHub Actions）

如果要使用GitHub Actions进行自动部署，请在GitHub仓库中设置以下密钥：

1. 进入GitHub仓库设置
2. 点击"Secrets and variables" > "Actions"
3. 添加以下密钥：
   - `HOST`: 服务器IP (例如: 116.62.56.214)
   - `USERNAME`: SSH用户名
   - `PASSWORD`: SSH密码
   - `PORT`: SSH端口 (通常是22)

设置完成后，每次推送代码到main分支时，都会自动构建并部署到服务器。

## 手动部署

如果您希望手动部署，可以按照以下步骤操作：

### 前提条件

1. 本地安装了Node.js和npm
2. 安装了PowerShell (Windows系统默认已安装)
3. 有服务器的SSH访问权限

### 部署步骤

1. **构建项目**

   ```powershell
   npm run build
   ```

2. **创建部署压缩包**

   ```powershell
   Compress-Archive -Path dist/* -DestinationPath dist.zip -Force
   ```

3. **配置部署脚本**

   编辑 `manual-deploy.ps1` 文件，设置以下变量：
   - `$SERVER_USER`: 服务器用户名
   - `$PRIVATE_KEY_PATH`: 如果使用SSH密钥，设置密钥路径；否则留空

4. **执行部署脚本**

   ```powershell
   .\manual-deploy.ps1
   ```
   
   根据提示输入密码（如果没有使用SSH密钥）

5. **验证部署**

   打开浏览器访问服务器IP，确认网站是否正常运行。

## 故障排除

如果部署过程中遇到问题，可以检查以下几点：

1. **构建失败**
   - 检查终端输出的错误信息
   - 确保所有依赖已安装：`npm install`
   
2. **上传失败**
   - 检查服务器IP和端口是否正确
   - 确认用户名和密码/密钥是否正确
   - 检查服务器防火墙是否允许SSH连接

3. **部署后网站不可访问**
   - 检查Nginx配置：`sudo nginx -t`
   - 重启Nginx：`sudo systemctl restart nginx`
   - 查看Nginx日志：`sudo cat /var/log/nginx/error.log`
