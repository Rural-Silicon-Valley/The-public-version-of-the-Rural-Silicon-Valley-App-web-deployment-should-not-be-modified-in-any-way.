import { createRoot } from 'react-dom/client';

function TestApp() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontSize: '18px' 
    }}>
      <h1 style={{ color: 'green' }}>🌳 测试页面</h1>
      <p>如果你看到这个页面，说明基础应用运行正常。</p>
      <p>时间: {new Date().toLocaleString()}</p>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<TestApp />);
} else {
  console.error('找不到 root 元素');
}
