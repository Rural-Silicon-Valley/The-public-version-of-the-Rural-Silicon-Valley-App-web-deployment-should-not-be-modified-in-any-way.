import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Snackbar } from '@mui/material';
import PageLayout from '../components/PageLayout';

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageLayout maxWidth="sm">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: { xs: 2, sm: 3 }
      }}>
        <Paper 
          elevation={2}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '3px dashed #4CAF50',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            原展示界面删除
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2, fontStyle: 'italic' }}>
            小宋正在奋笔疾书开发完整功能
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 3, fontSize: '1.1rem' }}>
            崭新版本，敬请期待！
          </Typography>
          <Typography variant="body2" color="success.main" sx={{ mt: 2, fontStyle: 'italic' }}>
            开发进行时 ✍️
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              padding: '12px 28px',
              background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
              boxShadow: '0 6px 20px rgba(76, 175, 80, 0.25)',
              transition: 'all 0.3s ease-in-out',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.25)'
                },
                '50%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(76, 175, 80, 0.35)'
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.25)'
                }
              },
              '&:hover': {
                background: 'linear-gradient(45deg, #81C784 30%, #4CAF50 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
              }
            }}
            onClick={handleClick}
          >
            ✨ 点击看看会发生什么？ 🌟
          </Button>
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: '50% !important',
            transform: 'translateY(-50%)',
            '& .MuiSnackbarContent-root': {
              minWidth: 'auto',
              background: 'rgba(76, 175, 80, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              padding: '16px 24px',
              animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              '@keyframes popIn': {
                '0%': {
                  transform: 'scale(0.8)',
                  opacity: 0
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1
                }
              }
            }
          }}
          message={
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&::before, &::after': {
                  content: '""',
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: 0.8
                }
              }}
            >
              ✨ 生活乱七八糟，我要多点花招 ✨
            </Typography>
          }
        />
      </Box>
    </PageLayout>
  );
}
