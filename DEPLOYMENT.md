# 部署指南

## 部署前准备

1. 确保你有以下信息：
   - 服务器IP地址或域名
   - SSH访问凭据（用户名和密码/密钥）
   - 服务器上的目标部署路径

2. 确保服务器已安装：
   - Nginx
   - Node.js（如果需要后端服务）
   - 必要的SSL证书（如果使用HTTPS）

## 部署步骤

1. 构建项目：
   ```bash
   npm run build
   ```

2. 运行部署脚本：
   ```powershell
   .\deploy.ps1 -RemoteHost "your-server-ip" -RemoteUser "your-username" -RemotePath "/path/to/deployment"
   ```

3. 检查部署：
   - 访问 http://your-server-ip 确认网站是否正常运行
   - 检查控制台是否有错误信息
   - 测试主要功能是否正常工作

## Nginx 配置

已配置的nginx.conf包含：
- 静态文件服务
- SPA路由支持
- 缓存控制
- 错误页面处理

## 故障排除

1. 如果网站无法访问：
   - 检查nginx服务是否运行
   - 检查防火墙设置
   - 查看nginx错误日志

2. 如果页面显示不正确：
   - 清除浏览器缓存
   - 检查文件权限
   - 验证构建文件是否完整

## 回滚流程

如需回滚到之前的版本：
1. 保存当前备份：
   ```bash
   cp -r /path/to/deployment/dist /path/to/deployment/dist_backup_$(date +%Y%m%d)
   ```

2. 恢复之前的版本：
   ```bash
   cp -r /path/to/deployment/dist_previous /path/to/deployment/dist
   ```

## 维护说明

1. 定期检查：
   - 服务器磁盘空间
   - 日志文件大小
   - 性能监控

2. 建议：
   - 保留最近3个版本的备份
   - 每次部署后进行功能测试
   - 记录每次部署的更改内容
