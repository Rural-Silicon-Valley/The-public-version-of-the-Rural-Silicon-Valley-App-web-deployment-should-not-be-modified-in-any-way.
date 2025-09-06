import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AppProvider } from './context/AppContext';
import { theme } from './theme';
import './App.css';

// 页面组件
import HomePage from './pages/HomePage';
import UserSelectionPage from './pages/SimpleUserSelectionPage';
import CreateTaskPage from './pages/CreateTaskPage';
import CheckInPage from './pages/CheckInPage';
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';
import TaskCenterPage from './pages/TaskCenterPage';
import TeamPage from './pages/TeamPage';
import { FamilyPage } from './pages/FamilyPage';
import LovePage from './pages/LovePage';
import ExploreView3DPage from './pages/ExploreView3DPage';

// 组件
import BottomNav from './components/BottomNav';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Box sx={{ pb: 7 }}> {/* 为底部导航留出空间 */}
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/select-user" element={<UserSelectionPage />} />
              <Route path="/create-task" element={<CreateTaskPage />} />
              <Route path="/check-in" element={<CheckInPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/tasks" element={<TaskCenterPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/family" element={<FamilyPage />} />
              <Route path="/love" element={<LovePage />} />
              <Route path="/explore-3d" element={<ExploreView3DPage />} />
            </Routes>
          </Box>
          <BottomNav />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
