import { Box, Container } from '@mui/material';
import React from 'react';
import BottomNav from './BottomNav';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasBottomNav?: boolean;
}

function PageLayout({
  children,
  maxWidth = 'sm',
  hasBottomNav = true
}: PageLayoutProps) {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingBottom: hasBottomNav ? '80px' : '0px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Container
        maxWidth={maxWidth}
        sx={{
          py: { xs: 3, sm: 4 }, // 增加垂直内边距
          px: { xs: 2.5, sm: 3 }, // 优化水平内边距
          minHeight: hasBottomNav ? 'calc(100vh - 80px)' : '100vh',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // 添加一些默认的间距规则
          '& > *': {
            mb: { xs: 2.5, sm: 3 }, // 子元素之间的默认间距
          },
          '& > *:last-child': {
            mb: 0, // 最后一个元素不需要底部间距
          },
          // 针对Typography组件的优化
          '& .MuiTypography-root': {
            lineHeight: 1.6,
            letterSpacing: 0.3,
          },
          // 针对按钮组件的优化
          '& .MuiButton-root': {
            py: { xs: 1.5, sm: 1.75 },
            px: { xs: 3, sm: 4 },
          }
        }}
      >
        {children}
      </Container>

      {hasBottomNav && <BottomNav sx={{
        // 优化底部导航栏
        height: '72px', // 增加高度
        '& .MuiBottomNavigationAction-root': {
          py: 1.5, // 增加内边距
          minWidth: 'auto', // 自适应宽度
        }
      }} />}
    </Box>
  );
}

export default PageLayout;
