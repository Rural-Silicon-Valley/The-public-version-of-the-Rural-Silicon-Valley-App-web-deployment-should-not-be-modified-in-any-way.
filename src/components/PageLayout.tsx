import React from 'react';
import { Container, Box } from '@mui/material';
import { BottomNav } from './BottomNav';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasBottomNav?: boolean;
}

export function PageLayout({ 
  children, 
  maxWidth = 'sm', 
  hasBottomNav = true 
}: PageLayoutProps) {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingBottom: hasBottomNav ? '80px' : '0px',
    }}>
      <Container 
        maxWidth={maxWidth} 
        sx={{ 
          py: 2,
          px: { xs: 2, sm: 3 },
          minHeight: hasBottomNav ? 'calc(100vh - 80px)' : '100vh',
        }}
      >
        {children}
      </Container>
      
      {hasBottomNav && <BottomNav />}
    </Box>
  );
}
