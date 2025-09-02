import { createRoot } from 'react-dom/client';

function SimpleApp() {
  return (
    <div style={{ padding: '20px', background: 'lightblue' }}>
      <h1>简单测试页面</h1>
      <p>如果你能看到这个，说明React正在工作。</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<SimpleApp />);
}
