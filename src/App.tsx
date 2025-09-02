import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { theme } from './theme';
import NewUserSelectionPage from './pages/NewUserSelectionPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: 'background.default',
            position: 'relative'
          }}>
            <Routes>
              <Route path="/user-selection" element={<NewUserSelectionPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

// 创建现代化的主题
const theme = createTheme({
  palette: {
    primary: { 
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: { 
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // 移动端优化字体大小
    h4: {
      fontSize: '1.8rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1.4rem',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      fontSize: '1.1rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  components: {
    // 移动端优化组件
    MuiCard: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            margin: '8px 0',
            borderRadius: '12px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            padding: '12px',
            '&:last-child': {
              paddingBottom: '12px',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          '@media (max-width:600px)': {
            textAlign: 'center',
            marginBottom: '16px',
          },
        },
      },
    },
  },
});

function App() {
  console.log('App组件渲染，显示团队任务管理界面');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/user-selection" element={<UserSelectionPage />} />
            <Route 
              path="/" 
              element={
                <Box sx={{ p: 3, backgroundColor: 'lightgreen', minHeight: '100vh' }}>
                  <Typography variant="h3" sx={{ color: 'darkgreen', mb: 2 }}>
                    🌳 乡村硅谷任务管理系统
                  </Typography>
                  <Typography sx={{ color: 'darkgreen', mb: 2 }}>
                    主页 - 路由和AppContext正常工作！
                  </Typography>
                  <Typography sx={{ color: 'darkgreen' }}>
                    <a href="/user-selection" style={{ color: 'darkgreen', textDecoration: 'underline' }}>
                      点击这里访问用户选择页面
                    </a>
                  </Typography>
                </Box>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
