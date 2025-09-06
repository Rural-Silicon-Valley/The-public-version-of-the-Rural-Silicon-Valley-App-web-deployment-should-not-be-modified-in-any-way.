import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
        color: 'white',
        padding: 2
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          textAlign: 'center',
          fontWeight: 'medium',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        原内容全部删除，等待后续开发，很快呦~
      </Typography>
    </Box>
  );
};

export default HomePage;
