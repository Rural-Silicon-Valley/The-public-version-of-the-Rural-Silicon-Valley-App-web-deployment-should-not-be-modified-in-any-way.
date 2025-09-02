import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ p: 3, backgroundColor: '#e8f5e8', minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ color: 'primary.main', mb: 2, textAlign: 'center' }}>
        🌳 乡村硅谷任务管理系统
      </Typography>
      
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          欢迎使用面向小型集体的多人员任务打卡和派发系统
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: 600,
        margin: '0 auto'
      }}>
        <Button 
          component={Link} 
          to="/user-selection" 
          variant="contained" 
          size="large"
          sx={{ 
            minWidth: 160,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          👥 用户选择
        </Button>
        
        <Button 
          variant="outlined" 
          size="large"
          sx={{ 
            minWidth: 160,
            py: 1.5,
            fontSize: '1.1rem'
          }}
          onClick={() => alert('更多功能即将推出！')}
        >
          📋 任务中心
        </Button>
        
        <Button 
          variant="outlined" 
          size="large"
          sx={{ 
            minWidth: 160,
            py: 1.5,
            fontSize: '1.1rem'
          }}
          onClick={() => alert('更多功能即将推出！')}
        >
          📊 数据统计
        </Button>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          采用移动端优先设计 • 半卡通风格 • 树木主题
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
