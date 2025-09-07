# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Clean up old files
Write-Host "Cleaning up old files..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

# Compress dist directory
Write-Host "Compressing files..." -ForegroundColor Green
Compress-Archive -Path ".\dist\*" -DestinationPath ".\dist.zip" -Force

# Upload to server
Write-Host "Uploading to server..." -ForegroundColor Green
scp -o StrictHostKeyChecking=no ".\dist.zip" "root@116.62.56.214:/root/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed!" -ForegroundColor Red
    exit 1
}

# Extract on server
Write-Host "Deploying files on server..." -ForegroundColor Green
ssh -o StrictHostKeyChecking=no "root@116.62.56.214" "cd /root && unzip -o dist.zip -d /root/web && rm dist.zip"

# Cleanup
Write-Host "Cleaning up..." -ForegroundColor Green
Remove-Item -Path ".\dist.zip" -ErrorAction SilentlyContinue

Write-Host "Deployment complete! Visit http://116.62.56.214" -ForegroundColor Green
