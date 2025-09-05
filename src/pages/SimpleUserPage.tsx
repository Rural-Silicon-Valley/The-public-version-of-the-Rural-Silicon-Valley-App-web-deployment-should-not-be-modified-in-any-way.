import { Box, Typography, Button } from '@mui/material';

console.log('SimpleUserPage 模块加载');

const SimpleUserPage = () => {
  console.log('SimpleUserPage 组件渲染');
  
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 3
    }}>
      <Typography variant="h3" color="primary">
        🌳 乡村硅谷任务系统
      </Typography>
      <Typography variant="h5" color="text.secondary">
        简化版用户选择页面
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        onClick={() => {
          console.log('按钮被点击');
          alert('测试成功！');
        }}
      >
        测试按钮
      </Button>
      <Typography variant="body1">
        页面加载时间: {new Date().toLocaleString()}
      </Typography>
    </Box>
  );
};

export default SimpleUserPage;
