// 乡村硅谷APP功能测试脚本
// 在浏览器控制台中运行此脚本来测试各项功能

console.log('🌳 乡村硅谷APP功能测试开始');

// 1. 清除本地存储，模拟首次访问
function resetApp() {
    console.log('1. 重置应用状态...');
    localStorage.removeItem('selectedUserId');
    localStorage.removeItem('appUsers');
    localStorage.removeItem('customUsers');
    console.log('✅ 应用状态已重置');
    console.log('请刷新页面，应该会重定向到用户选择页面');
}

// 2. 检查当前用户状态
function checkUserStatus() {
    console.log('2. 检查当前用户状态...');
    const selectedUserId = localStorage.getItem('selectedUserId');
    console.log('选中的用户ID:', selectedUserId);
    
    if (selectedUserId) {
        console.log('✅ 已选择用户，应该显示主页面');
    } else {
        console.log('❌ 未选择用户，应该显示用户选择页面');
    }
}

// 3. 模拟用户选择
function selectTestUser() {
    console.log('3. 模拟选择测试用户...');
    localStorage.setItem('selectedUserId', 'user1');
    console.log('✅ 已选择测试用户 (user1)');
    console.log('请刷新页面，应该会显示主页面');
}

// 4. 测试路由导航
function testNavigation() {
    console.log('4. 测试路由导航...');
    const routes = ['/', '/statistics', '/checkin', '/team', '/profile', '/create-task', '/tasks'];
    
    routes.forEach(route => {
        console.log(`测试路由: ${route}`);
        console.log(`访问地址: ${window.location.origin}${route}`);
    });
}

// 5. 检查应用组件是否正常加载
function checkComponents() {
    console.log('5. 检查应用组件...');
    
    // 检查是否有React应用
    const root = document.getElementById('root');
    if (root && root.children.length > 0) {
        console.log('✅ React应用已挂载');
    } else {
        console.log('❌ React应用未挂载');
    }
    
    // 检查是否有MUI主题
    const muiElements = document.querySelectorAll('[class*="Mui"]');
    if (muiElements.length > 0) {
        console.log('✅ Material-UI组件已加载');
    } else {
        console.log('❌ Material-UI组件未加载');
    }
}

// 运行所有测试
function runAllTests() {
    console.log('🚀 运行完整测试套件...');
    checkUserStatus();
    checkComponents();
    testNavigation();
    console.log('📋 测试完成，请查看上方结果');
    console.log('💡 如需重置应用: resetApp()');
    console.log('💡 如需选择用户: selectTestUser()');
}

// 导出测试函数
window.testApp = {
    resetApp,
    checkUserStatus,
    selectTestUser,
    testNavigation,
    checkComponents,
    runAllTests
};

console.log('🎯 测试脚本已加载，可用命令:');
console.log('- testApp.runAllTests() : 运行所有测试');
console.log('- testApp.resetApp() : 重置应用');
console.log('- testApp.selectTestUser() : 选择测试用户');
console.log('- testApp.checkUserStatus() : 检查用户状态');

// 自动运行基础检查
runAllTests();
