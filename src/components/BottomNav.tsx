import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { 
  Home, 
  Assignment, 
  CheckCircle, 
  People, 
  Person 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavProps {
  sx?: any;
}

export function BottomNav({ sx }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: '首页', value: '/', icon: <Home /> },
    { label: '统计', value: '/home', icon: <Assignment /> },
    { label: '打卡', value: '/checkin', icon: <CheckCircle /> },
    { label: '团队', value: '/team', icon: <People /> },
    { label: '我的', value: '/profile', icon: <Person /> },
  ];

  const currentValue = navigationItems.find(item => 
    location.pathname === item.value
  )?.value || '/';

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderRadius: '20px 20px 0 0',
        ...sx 
      }} 
      elevation={8}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        sx={{
          borderRadius: '20px 20px 0 0',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
