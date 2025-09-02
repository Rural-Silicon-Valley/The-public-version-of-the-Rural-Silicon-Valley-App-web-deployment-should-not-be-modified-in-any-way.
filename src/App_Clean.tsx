import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import HomePage from './pages/HomePage_Clean';
import UserSelectionPage from './pages/UserSelectionPage_Clean';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default',
          position: 'relative'
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-selection" element={<UserSelectionPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
