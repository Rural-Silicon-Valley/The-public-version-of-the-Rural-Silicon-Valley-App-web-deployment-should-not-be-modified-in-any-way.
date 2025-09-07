# Deploy to server
$ServerIP = "116.62.56.214"
$Username = "root"
$RemotePath = "/usr/share/nginx/html"

# Check if dist directory exists
if (-not (Test-Path ".\dist")) {
    Write-Host "Error: dist directory not found" -ForegroundColor Red
    exit 1
}

# Compress dist folder
Write-Host "Compressing dist folder..." -ForegroundColor Yellow
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# Upload to server
Write-Host "Uploading to server..." -ForegroundColor Yellow
scp .\dist.zip ${Username}@${ServerIP}:${RemotePath}/

# Extract and set permissions
Write-Host "Extracting files on server..." -ForegroundColor Yellow
ssh ${Username}@${ServerIP} "cd ${RemotePath} && unzip -o dist.zip && rm dist.zip && chown -R nginx:nginx ./* && nginx -s reload"

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Visit http://${ServerIP} to view the site" -ForegroundColor Green
