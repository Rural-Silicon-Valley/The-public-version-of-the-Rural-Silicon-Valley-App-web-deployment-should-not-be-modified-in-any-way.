import React, { useState } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Button,
  Card,
  Avatar,
  Chip
} from '@mui/material';
import {
  Assignment,
  BarChart,
  Group,
  Settings,
  Notifications
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { User, Task, CheckIn } from '../types';

// 生成彩色头像
const getAvatarColor = (name: string) => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface TaskBottomNavProps {
  currentPage?: string;
}

const TaskBottomNav: React.FC<TaskBottomNavProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { state } = useApp();
  const { users, tasks, checkIns } = state;

  // 根据当前路径确定选中的标签
  const getCurrentValue = () => {
    switch (location.pathname) {
      case '/':
        return 0;
      case '/statistics':
        return 1;
      case '/profile':
        return 4;
      default:
        return 0;
    }
  };

  const [value, setValue] = useState(getCurrentValue());

  // 计算每个用户的任务完成情况
  const getUserTaskStats = (userId: string) => {
    const userTasks = tasks.filter((task: Task) => task.assignedTo.includes(userId));
    const completedTasks = userTasks.filter((task: Task) => 
      checkIns.some((checkIn: CheckIn) => checkIn.taskId === task.id && checkIn.userId === userId)
    );
    return {
      total: userTasks.length,
      completed: completedTasks.length,
      progress: userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0
    };
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue !== 0) {
      setSelectedUserId(null); // 切换到其他标签时隐藏任务详情
    }

    // 根据选择的标签导航到对应页面
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/statistics');
        break;
      case 4:
        navigate('/profile');
        break;
      default:
        // 其他标签暂时不处理，可以在这里添加更多页面
        break;
    }
  };

  const renderTaskDetails = () => {
    if (value !== 0 || !selectedUserId) return null;

    const selectedUser = users.find((u: User) => u.id === selectedUserId);
    const userStats = getUserTaskStats(selectedUserId);
    
    return (
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.3)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ 
            bgcolor: getAvatarColor(selectedUser?.name || ''), 
            mr: 2,
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}>
            {selectedUser?.avatar}
          </Avatar>
          <Box>
            <Typography variant="h6" color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {selectedUser?.name} 的任务详情
            </Typography>
            <Typography variant="body2" color="text.secondary">
              总任务: {userStats.total} | 已完成: {userStats.completed} | 完成率: {userStats.progress.toFixed(0)}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 }, maxHeight: '300px', overflow: 'auto' }}>
          {tasks.filter((task: Task) => task.assignedTo.includes(selectedUserId!)).map((task: Task) => {
            const isCompleted = checkIns.some((checkIn: CheckIn) => 
              checkIn.taskId === task.id && checkIn.userId === selectedUserId
            );
            const completedCheckIn = checkIns.find((checkIn: CheckIn) => 
              checkIn.taskId === task.id && checkIn.userId === selectedUserId
            );
            
            return (
              <Box key={task.id} sx={{ width: '100%' }}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    p: { xs: 2, sm: 2.5 },
                    backgroundColor: isCompleted ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                    borderColor: isCompleted ? 'success.main' : 'warning.main',
                    borderWidth: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 600,
                        color: isCompleted ? 'success.main' : 'warning.main'
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Chip 
                      label={isCompleted ? "✅ 已完成" : "⏳ 进行中"}
                      color={isCompleted ? "success" : "warning"}
                      size="small"
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}
                  >
                    {task.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="text.secondary">
                      📅 创建: {new Date(task.createdAt).toLocaleDateString('zh-CN')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      📍 状态: {task.status}
                    </Typography>
                    {completedCheckIn && (
                      <Typography variant="caption" color="success.main">
                        ✅ 完成于: {new Date(completedCheckIn.timestamp).toLocaleDateString('zh-CN')}
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Box>
            );
          })}
          
          {tasks.filter((task: Task) => task.assignedTo.includes(selectedUserId!)).length === 0 && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  暂无任务分配给该用户
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const renderTabContent = () => {
    switch (value) {
      case 0: // 任务栏
        return (
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 1.5 }, 
              flexWrap: 'wrap',
              mb: 2
            }}>
              {users.map((user: User) => (
                <Button
                  key={user.id}
                  variant={selectedUserId === user.id ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  onClick={() => setSelectedUserId(selectedUserId === user.id ? null : user.id)}
                  sx={{ 
                    minWidth: { xs: 'auto', sm: '120px' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    px: { xs: 1, sm: 2 }
                  }}
                >
                  {user.avatar} {user.name}
                </Button>
              ))}
            </Box>
            
            {!selectedUserId && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4, 
                color: 'text.secondary',
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2
              }}>
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  👆 点击上方按钮查看对应成员的详细任务完成情况
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 1: // 数据统计
        return (
          <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              📊 数据统计
            </Typography>
            <Typography variant="body2" color="text.secondary">
              功能开发中，敬请期待...
            </Typography>
          </Box>
        );
      case 2: // 团队管理
        return (
          <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              👥 团队管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              功能开发中，敬请期待...
            </Typography>
          </Box>
        );
      case 3: // 通知中心
        return (
          <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              🔔 通知中心
            </Typography>
            <Typography variant="body2" color="text.secondary">
              功能开发中，敬请期待...
            </Typography>
          </Box>
        );
      case 4: // 设置
        return (
          <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              ⚙️ 设置
            </Typography>
            <Typography variant="body2" color="text.secondary">
              功能开发中，敬请期待...
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000,
      backgroundColor: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      maxHeight: '60vh', // 限制最大高度，避免遮挡太多内容
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 标签页内容区域 */}
      {value !== null && (
        <Box sx={{ 
          borderTop: '1px solid rgba(0,0,0,0.1)',
          maxHeight: 'calc(60vh - 60px)', // 减去底部导航栏的高度
          overflow: 'auto',
          flex: 1
        }}>
          {renderTabContent()}
          {renderTaskDetails()}
        </Box>
      )}
      
      {/* 底部导航栏 */}
      <Paper 
        sx={{ 
          backgroundColor: '#1b5e20', // 深绿色背景
          borderRadius: 0,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }} 
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255,255,255,0.7)',
              '&.Mui-selected': {
                color: '#fff',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                '&.Mui-selected': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }
              }
            }
          }}
        >
          <BottomNavigationAction 
            label="任务中心" 
            icon={<Assignment />} 
          />
          <BottomNavigationAction 
            label="统计分析" 
            icon={<BarChart />} 
          />
          <BottomNavigationAction 
            label="团队管理" 
            icon={<Group />} 
          />
          <BottomNavigationAction 
            label="通知中心" 
            icon={<Notifications />} 
          />
          <BottomNavigationAction 
            label="系统设置" 
            icon={<Settings />} 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default TaskBottomNav;
