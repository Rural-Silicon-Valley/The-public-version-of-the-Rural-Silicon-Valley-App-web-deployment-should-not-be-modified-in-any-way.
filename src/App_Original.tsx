import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { theme } from './theme';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import ProfilePage from './pages/ProfilePage';
import NewUserSelectionPage from './pages/NewUserSelectionPage';
import StatisticsPage from './pages/StatisticsPage';
import TeamPage from './pages/TeamPage';
import TaskCenterPage from './pages/TaskCenterPage';
import CheckInPage from './pages/CheckInPage';
import BottomNav from './components/BottomNav';
import PageLayout from './components/PageLayout';

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
              <Route path="/" element={
                <PageLayout>
                  <HomePage />
                </PageLayout>
              } />
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
