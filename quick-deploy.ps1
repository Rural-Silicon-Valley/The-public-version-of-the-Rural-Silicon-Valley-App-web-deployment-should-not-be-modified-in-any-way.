# 确保在运行出错时停止
$ErrorActionPreference = "Stop"

# 显示彩色信息
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

try {
    # 清理旧的构建文件
    Write-ColorOutput Green "正在清理旧文件..."
    Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue
    Remove-Item -Path ".\dist" -Recurse -ErrorAction SilentlyContinue

    # 执行新的构建
    Write-ColorOutput Green "开始构建项目..."
    npm run build

    if ($LASTEXITCODE -ne 0) {
        throw "构建失败！"
    }

    # 压缩dist目录
    Write-ColorOutput Green "正在压缩文件..."
    Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

    # 设置服务器信息
    $serverHost = "116.62.56.214"
    $username = "root"
    $remotePath = "/var/www/html"

    # 上传文件到服务器
    Write-ColorOutput Green "正在上传文件到服务器 ${serverHost}..."
    scp -o StrictHostKeyChecking=no ".\dist.zip" "${username}@${serverHost}:${remotePath}/"

    # 在服务器上解压文件
    Write-ColorOutput Green "正在服务器上部署文件..."
    ssh -o StrictHostKeyChecking=no "${username}@${serverHost}" "cd ${remotePath} && unzip -o dist.zip && rm -f dist.zip"

    # 清理本地临时文件
    Write-ColorOutput Green "正在清理临时文件..."
    Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

    Write-ColorOutput Green "部署完成！"
    Write-ColorOutput Green "请访问 http://${serverHost} 查看结果"
}
catch {
    Write-ColorOutput Red "部署过程中出现错误："
    Write-ColorOutput Red $_.Exception.Message
    exit 1
}
