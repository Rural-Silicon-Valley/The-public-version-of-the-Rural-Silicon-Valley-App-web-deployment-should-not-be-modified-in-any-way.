# 后续修复步骤
# 这个脚本包含了修复403错误的后续步骤

Write-Host "已完成文件权限的修改，接下来的步骤..." -ForegroundColor Yellow

# Connect to server via SSH and continue fixing
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "请在服务器上继续执行以下命令:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 修复SELinux上下文:" -ForegroundColor Green
Write-Host "sudo restorecon -Rv /usr/share/nginx/html/" -ForegroundColor White
Write-Host ""
Write-Host "2. 检查Nginx配置是否正确:" -ForegroundColor Green
Write-Host "sudo nginx -t" -ForegroundColor White
Write-Host ""
Write-Host "3. 重启Nginx服务:" -ForegroundColor Green
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "4. 如果问题仍然存在，检查SELinux状态:" -ForegroundColor Green
Write-Host "sudo getenforce" -ForegroundColor White
Write-Host "# 如果输出为'Enforcing'，可以尝试临时设置为宽容模式:" -ForegroundColor White
Write-Host "sudo setenforce 0" -ForegroundColor White
Write-Host "# 然后再次重启Nginx:" -ForegroundColor White
Write-Host "sudo systemctl restart nginx" -ForegroundColor White
Write-Host ""
Write-Host "5. 查看Nginx错误日志以获取更多信息:" -ForegroundColor Green
Write-Host "sudo tail -n 50 /var/log/nginx/error.log" -ForegroundColor White
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "执行完这些命令后，请访问 http://116.62.56.214 验证问题是否解决" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
