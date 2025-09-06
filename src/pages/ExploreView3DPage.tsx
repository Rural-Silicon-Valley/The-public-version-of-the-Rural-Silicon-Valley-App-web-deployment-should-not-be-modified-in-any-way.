import React from 'react';
import { Box, Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const ExploreView3DPage: React.FC = () => {
  return (
    <PageLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          3D 探索视图
        </Typography>
        <Typography variant="body1">
          3D 视图功能正在开发中...
        </Typography>
      </Box>
    </PageLayout>
  );
};

export default ExploreView3DPage;