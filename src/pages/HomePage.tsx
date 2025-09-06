import React, { useState, useCallback } from 'react';
import { Box, Typography, IconButton, Snackbar, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export default function HomePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = useCallback(() => {
    setIsLiked(prev => !prev);
    setShowMessage(true);
  }, []);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        position: 'relative',
        padding: 2,
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        乡村硅谷打卡应用
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
        功能正在开发中...
      </Typography>

      <Tooltip title="点击喜欢" arrow>
        <IconButton
          onClick={handleHeartClick}
          color={isLiked ? 'secondary' : 'default'}
          sx={{
            animation: isLiked ? 'pulse 0.5s ease-in-out' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        >
          <FavoriteIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Tooltip>

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <TouchAppIcon sx={{ mr: 1 }} />
        <Typography variant="body2">
          点击心形图标试试看
        </Typography>
      </Box>

      <Snackbar
        open={showMessage}
        autoHideDuration={2000}
        onClose={handleCloseMessage}
        message={isLiked ? '谢谢喜欢！❤️' : '取消喜欢 💔'}
      />
    </Box>
  );
}
