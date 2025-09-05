console.log('DebugApp 开始加载');

function DebugApp() {
  console.log('DebugApp 组件渲染');
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#333'
    }}>
      <h1 style={{ color: 'green' }}>🌳 乡村硅谷 DEBUG 页面</h1>
      <p>当前时间: {new Date().toLocaleString()}</p>
      <p>React 应用正常加载</p>
      <button 
        onClick={() => {
          console.log('按钮点击成功');
          alert('React 事件系统正常工作!');
        }}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        点击测试
      </button>
    </div>
  );
}

export default DebugApp;

console.log('DebugApp 模块加载完成');
