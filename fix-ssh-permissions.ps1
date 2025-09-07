# 确保 .ssh 目录存在
$sshDir = "$env:USERPROFILE\.ssh"
if (-not (Test-Path $sshDir)) {
    New-Item -ItemType Directory -Path $sshDir
}

# 修改权限
$acl = Get-Acl $sshDir
$acl.SetAccessRuleProtection($true, $true)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("$env:USERNAME", "FullControl", "Allow")
$acl.AddAccessRule($rule)
Set-Acl $sshDir $acl

# 修改 id_ed25519 文件权限
$keyFile = "$sshDir\id_ed25519"
if (Test-Path $keyFile) {
    $acl = Get-Acl $keyFile
    $acl.SetAccessRuleProtection($true, $true)
    $acl.AddAccessRule($rule)
    Set-Acl $keyFile $acl
}

Write-Host "SSH权限已修复！" -ForegroundColor Green
