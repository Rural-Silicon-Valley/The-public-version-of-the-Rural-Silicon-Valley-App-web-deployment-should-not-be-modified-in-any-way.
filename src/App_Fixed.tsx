import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { theme } from './theme';
import NewUserSelectionPage from './pages/NewUserSelectionPage';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';
import TeamPage from './pages/TeamPage';
import TaskCenterPage from './pages/TaskCenterPage';
import CheckInPage from './pages/CheckInPage';
import BottomNav from './components/BottomNav';
import PageLayout from './components/PageLayout';

// 认证守卫组件
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const currentUserId = localStorage.getItem('selectedUserId');
  
  if (!currentUserId) {
    // 重定向到登录页面，保留当前位置便于登录后返回
    return <Navigate to="/user-selection" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

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
              <Route path="/" element={<RequireAuth><PageLayout><HomePage /></PageLayout></RequireAuth>} />
              <Route path="/create-task" element={
                <PageLayout>
                  <CreateTaskPage />
                </PageLayout>
              } />
              <Route path="/profile" element={
                <PageLayout>
                  <ProfilePage />
                </PageLayout>
              } />
              <Route path="/statistics" element={
                <PageLayout>
                  <StatisticsPage />
                </PageLayout>
              } />
              <Route path="/team" element={
                <PageLayout>
                  <TeamPage />
                </PageLayout>
              } />
              <Route path="/tasks" element={
                <PageLayout>
                  <TaskCenterPage />
                </PageLayout>
              } />
              <Route path="/checkin" element={
                <PageLayout>
                  <CheckInPage />
                </PageLayout>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <BottomNav />
          </Box>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
