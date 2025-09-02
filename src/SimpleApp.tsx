import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 简单的主页组件
function HomePage() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e8f5e8',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2e7d32', textAlign: 'center' }}>
        🌳 乡村硅谷任务管理系统
      </h1>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1976d2' }}>欢迎使用任务管理系统</h2>
        <p>这是一个面向小型集体的多人员任务打卡和派发系统。</p>
        
        <div style={{ marginTop: '20px' }}>
          <Link 
            to="/users" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              marginRight: '10px'
            }}
          >
            用户管理
          </Link>
          
          <Link 
            to="/tasks"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            任务中心
          </Link>
        </div>
      </div>
    </div>
  );
}

// 简单的用户管理页面
function UsersPage() {
  const users = [
    { id: 1, name: '张三', role: '管理员' },
    { id: 2, name: '李四', role: '成员' },
    { id: 3, name: '王五', role: '成员' },
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e8f5e8',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2e7d32' }}>用户管理</h1>
        
        <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
          ← 返回主页
        </Link>
        
        <div style={{ marginTop: '20px' }}>
          {users.map(user => (
            <div key={user.id} style={{
              padding: '15px',
              margin: '10px 0',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{user.name}</h3>
              <p style={{ margin: 0, color: '#666' }}>角色: {user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 简单的任务中心页面
function TasksPage() {
  const tasks = [
    { id: 1, title: '完成项目文档', status: '进行中' },
    { id: 2, title: '代码审查', status: '待开始' },
    { id: 3, title: '部署测试', status: '已完成' },
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e8f5e8',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2e7d32' }}>任务中心</h1>
        
        <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
          ← 返回主页
        </Link>
        
        <div style={{ marginTop: '20px' }}>
          {tasks.map(task => (
            <div key={task.id} style={{
              padding: '15px',
              margin: '10px 0',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{task.title}</h3>
              <p style={{ margin: 0, color: '#666' }}>状态: {task.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimpleApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default SimpleApp;
