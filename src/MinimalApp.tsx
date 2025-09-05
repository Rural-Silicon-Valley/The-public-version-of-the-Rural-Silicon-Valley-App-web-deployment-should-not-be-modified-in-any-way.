import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { theme } from './theme';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import ProfilePage from './pages/ProfilePage';
import TeamPage from './pages/TeamPage';
import TaskCenterPage from './pages/TaskCenterPage';
import CheckInPage from './pages/CheckInPage';
import BottomNav from './components/BottomNav';
import PageLayout from './components/PageLayout';
import { FamilyPage } from './pages/FamilyPage';
import ExploreView3DPage from './pages/ExploreView3DPage';

console.log('MinimalApp 模块加载');

// 调试导入的组件
console.log('导入的组件:', {
  HomePage,
  CreateTaskPage,
  ProfilePage,
  TeamPage,
  TaskCenterPage,
  CheckInPage,
  BottomNav,
  PageLayout
});

// 设置默认用户
const defaultUser = {
  id: 'default-user',
  name: '默认用户',
  role: 'member'
};

// 简化的认证守卫组件
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  // 确保有默认用户
  if (!localStorage.getItem('selectedUserId')) {
    localStorage.setItem('selectedUserId', defaultUser.id);
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
  }
  return <>{children}</>;
};

export default function MinimalApp() {
  console.log('MinimalApp 组件渲染');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <RequireAuth>
            <Box sx={{ pb: 7 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/create-task" element={<CreateTaskPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/tasks" element={<TaskCenterPage />} />
                <Route path="/check-in" element={<CheckInPage />} />
                <Route path="/family" element={<FamilyPage />} />
                <Route path="/explore-3d" element={<ExploreView3DPage />} />
              </Routes>
              <BottomNav />
            </Box>
          </RequireAuth>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
  
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
              <Route path="/" element={
                <RequireAuth>
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/create-task" element={
                <RequireAuth>
                  <PageLayout>
                    <CreateTaskPage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/profile" element={
                <RequireAuth>
                  <PageLayout>
                    <ProfilePage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/team" element={
                <RequireAuth>
                  <PageLayout>
                    <TeamPage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/family" element={
                <RequireAuth>
                  <PageLayout>
                    <FamilyPage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/tasks" element={
                <RequireAuth>
                  <PageLayout>
                    <TaskCenterPage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/checkin" element={
                <RequireAuth>
                  <PageLayout>
                    <CheckInPage />
                  </PageLayout>
                </RequireAuth>
              } />
              <Route path="/explore" element={
                <RequireAuth>
                  <PageLayout>
                    <ExploreView3DPage />
                  </PageLayout>
                </RequireAuth>
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
