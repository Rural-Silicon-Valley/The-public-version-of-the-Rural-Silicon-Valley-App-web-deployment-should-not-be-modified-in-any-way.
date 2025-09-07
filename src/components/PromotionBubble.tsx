import React, { useState } from 'react';
import { Typography, Box, Tooltip } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';

interface PromotionBubbleProps {
  text?: string;
}

/**
 * 促销气泡组件 - 显示带有爱心引导的动画气泡文本
 */
const PromotionBubble: React.FC<PromotionBubbleProps> = ({ 
  text = "点击领取今日小宋独家文案" 
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <Box
      className="promotion-bubble"
      sx={{
        position: 'fixed',
        bottom: 85, 
        right: 20,
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
        animation: 'float 2s ease-in-out infinite',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '8px 16px',
        borderRadius: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        '@keyframes heartBeat': {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip 
        title={clicked ? "已领取！请查看消息中心" : "点击爱心领取"} 
        placement="top" 
        arrow
      >
        <Typography 
          variant="body1"
          sx={{
            margin: 0,
            lineHeight: 1.6,
            fontFamily: '"Noto Sans SC","Microsoft YaHei","PingFang SC",sans-serif',
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.3px',
            animation: 'pulse 2s infinite',
          }}
        >
          {text}
          <FavoriteIcon 
            color="error" 
            fontSize="small"
            sx={{ 
              ml: 0.5, 
              animation: hovered ? 'heartBeat 1.3s ease-in-out infinite' : 'none',
              color: clicked ? '#ff6b6b' : '#e91e63',
              transition: 'color 0.3s ease',
            }} 
          />
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default PromotionBubble;
