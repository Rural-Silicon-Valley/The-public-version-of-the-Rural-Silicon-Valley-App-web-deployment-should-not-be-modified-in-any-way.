import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import './App.css';

// 导入Context提供者
import { AppProvider, useApp } from './context/AppContext';

// 导入页面组件
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskCenterPage from './pages/TaskCenterPage';
import StatisticsPage from './pages/StatisticsPage';
import LovePage from './pages/LovePage';
import { FamilyPage } from './pages/FamilyPage';
import TeamPage from './pages/TeamPage';
import CheckInPage from './pages/CheckInPage';

// 导入自定义组件
import PromotionBubble from './components/PromotionBubble';

// 路由保护组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useApp();

  if (state.loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          乡村硅谷APP
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          应用正在加载中...
        </Typography>
        <PromotionBubble text="点击领取今日小宋独家文案 ❤️" />
      </Box>
    );
  }

  return <>{children}</>;
};

// 主应用组件
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/create-task" element={
          <ProtectedRoute>
            <CreateTaskPage />
          </ProtectedRoute>
        } />

        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskCenterPage />
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute>
            <StatisticsPage />
          </ProtectedRoute>
        } />
        <Route path="/love" element={
          <ProtectedRoute>
            <LovePage />
          </ProtectedRoute>
        } />
        <Route path="/family" element={
          <ProtectedRoute>
            <FamilyPage />
          </ProtectedRoute>
        } />
        <Route path="/team" element={
          <ProtectedRoute>
            <TeamPage />
          </ProtectedRoute>
        } />
        <Route path="/checkin" element={
          <ProtectedRoute>
            <CheckInPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// 根应用组件
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
