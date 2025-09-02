// 测试用户选择功能的 JavaScript 代码
// 在浏览器开发者工具控制台中运行这些代码

// 1. 清除用户选择，回到用户选择页面
function resetUserSelection() {
    localStorage.removeItem('selectedUserId');
    alert('用户选择已清除，页面即将刷新');
    location.reload();
}

// 2. 查看当前选择的用户
function showCurrentUser() {
    const userId = localStorage.getItem('selectedUserId');
    if (userId) {
        console.log('当前选择的用户ID:', userId);
        alert('当前选择的用户ID: ' + userId);
    } else {
        console.log('没有选择用户');
        alert('没有选择用户');
    }
}

// 3. 直接设置用户
function setUser(userId) {
    localStorage.setItem('selectedUserId', userId);
    alert('用户设置为: ' + userId + '，页面即将刷新');
    location.reload();
}

// 4. 清除所有本地存储
function clearAll() {
    localStorage.clear();
    alert('所有本地存储已清除，页面即将刷新');
    location.reload();
}

// 使用方法：
console.log('=== 用户选择测试工具 ===');
console.log('1. resetUserSelection() - 清除用户选择');
console.log('2. showCurrentUser() - 查看当前用户');
console.log('3. setUser("user1") - 直接设置用户（可选 user1, user2, user3, user4）');
console.log('4. clearAll() - 清除所有本地存储');
console.log('');
console.log('可用的用户ID:');
console.log('- user1: 张小明 (管理员)');
console.log('- user2: 李小红 (成员)');
console.log('- user3: 王小强 (成员)');
console.log('- user4: 赵小丽 (成员)');

// 自动显示当前状态
showCurrentUser();
