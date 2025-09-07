[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 设置服务器信息
$serverHost = "116.62.56.214"
$serverUser = "root"

# 获取密码（安全输入）
$password = Read-Host -Prompt "Enter server password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# 读取公钥内容
$pubKey = Get-Content "C:\Users\Admin\.ssh\id_ed25519.pub"

# 准备远程命令
$remoteCommands = @'
mkdir -p ~/.ssh
echo "$pubKey" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
'@

# 执行远程命令
$sshParams = "-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"
Write-Output $plainPassword | ssh @sshParams "$serverUser@$serverHost" "$remoteCommands"

Write-Host "SSH key configuration completed!" -ForegroundColor Green

# 清理密码变量
$plainPassword = $null
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)
