import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Button } from '@mui/material';
import { theme } from './theme';

console.log('TestApp 模块加载');

function TestApp() {
  console.log('TestApp 组件渲染');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Typography variant="h3" color="primary">
          测试应用运行正常
        </Typography>
        <Typography variant="h6" color="text.secondary">
          当前时间: {new Date().toLocaleString()}
        </Typography>
        <Button variant="contained" onClick={() => alert('按钮点击成功!')}>
          测试按钮
        </Button>
        <Typography variant="body1">
          如果您能看到这个页面，说明基础组件工作正常
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default TestApp;
