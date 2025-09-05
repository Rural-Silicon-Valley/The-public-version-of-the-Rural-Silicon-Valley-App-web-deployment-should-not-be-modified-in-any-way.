import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AnimatedForestBackground } from '../components/AnimatedForestBackground';

// 生成彩色头像
const getAvatarColor = (name: string) => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const HomePage: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const { users, tasks, checkIns } = state;

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('selectedUserId');
    navigate('/user-selection');
  };

  // 计算每个用户的任务完成情况
  const getUserTaskStats = (userId: string) => {
    const userTasks = tasks.filter(task => task.assignedTo.includes(userId));
    const completedTasks = userTasks.filter(task => 
      checkIns.some(checkIn => checkIn.taskId === task.id && checkIn.userId === userId)
    );
    return {
      total: userTasks.length,
      completed: completedTasks.length,
      progress: userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0
    };
  };

  // 按任务分组显示所有用户的完成情况
  const getTaskCompletionByUsers = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return [];
    
    return task.assignedTo.map(userId => {
      const user = users.find(u => u.id === userId);
      const isCompleted = checkIns.some(checkIn => 
        checkIn.taskId === taskId && checkIn.userId === userId
      );
      const checkIn = checkIns.find(checkIn => 
        checkIn.taskId === taskId && checkIn.userId === userId
      );
      
      return {
        user: user!,
        isCompleted,
        completedAt: checkIn?.timestamp
      };
    });
  };

  const totalTasks = tasks.length;
  const averageProgress = users.length > 0 
    ? users.reduce((sum, user) => sum + getUserTaskStats(user.id).progress, 0) / users.length 
    : 0;

  return (
    <>
      <AnimatedForestBackground />
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 1,
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        {/* 页面标题 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: { xs: 2, sm: 4 }
        }}>
          <Typography 
            variant="h4" 
            color="primary" 
            sx={{ 
              textShadow: '1px 1px 3px rgba(255,255,255,0.8)',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              flex: 1,
              textAlign: 'center'
            }}
          >
            🌳 团队任务管理 🌳
          </Typography>
          
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <ExitToApp />
          </IconButton>
        </Box>

        {/* 当前用户信息 */}
        {state.currentUser && (
          <Card sx={{
            mb: { xs: 3, sm: 4 },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(state.currentUser.name),
                    width: { xs: 40, sm: 50 },
                    height: { xs: 40, sm: 50 },
                  }}
                >
                  {state.currentUser.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    欢迎回来，{state.currentUser.name}！
                  </Typography>
                  <Chip
                    label={state.currentUser.role === 'admin' ? '管理员' : '成员'}
                    color={state.currentUser.role === 'admin' ? 'primary' : 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* 统计卡片 */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 2, sm: 3 }, 
          mb: { xs: 3, sm: 4 }, 
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap'
        }}>
          {/* 总任务数 */}
          <Card sx={{ 
            flex: 1, 
            minWidth: { xs: '100%', sm: '200px' },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <Typography variant="h4" color="primary" sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
                {totalTasks}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                总任务数
              </Typography>
            </CardContent>
          </Card>

          {/* 团队成员数 */}
          <Card sx={{ 
            flex: 1, 
            minWidth: { xs: '100%', sm: '200px' },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <Typography variant="h4" color="secondary" sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
                {users.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                团队成员
              </Typography>
            </CardContent>
          </Card>

          {/* 平均完成率 */}
          <Card sx={{ 
            flex: 1, 
            minWidth: { xs: '100%', sm: '200px' },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <Typography variant="h4" color="success.main" sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
                {averageProgress.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                平均完成率
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* 成员完成情况概览 */}
        <Card sx={{
          mb: { xs: 3, sm: 4 },
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              👥 成员完成情况概览
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1.5, sm: 2 }, 
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              {users.map(user => {
                const stats = getUserTaskStats(user.id);
                return (
                  <Box key={user.id} sx={{ flex: { xs: '1', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' } }}>
                    <Card variant="outlined" sx={{ 
                      p: { xs: 1.5, sm: 2 }, 
                      height: '100%',
                      backdropFilter: 'blur(5px)',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(user.name), 
                            mr: { xs: 1.5, sm: 2 },
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 }
                          }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            {user.name}
                          </Typography>
                          <Chip 
                            label={user.role === 'admin' ? '管理员' : '成员'} 
                            size="small" 
                            color={user.role === 'admin' ? 'primary' : 'default'}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          完成进度: {stats.completed}/{stats.total}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={stats.progress} 
                          sx={{ mt: 1, height: 8, borderRadius: 4 }}
                          color={stats.progress === 100 ? 'success' : 'primary'}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {stats.progress.toFixed(1)}% 完成
                      </Typography>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>

        {/* 任务详细情况 */}
        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              📋 任务完成详情
            </Typography>
            {tasks.map((task, index) => {
              const completionData = getTaskCompletionByUsers(task.id);
              const completedCount = completionData.filter(data => data.isCompleted).length;
              const totalAssigned = completionData.length;
              
              return (
                <Box key={task.id}>
                  {index > 0 && <Divider sx={{ my: { xs: 2, sm: 3 } }} />}
                  
                  {/* 任务标题和总体进度 */}
                  <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                    <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: { xs: 1, sm: 2 },
                      flexWrap: 'wrap'
                    }}>
                      <Chip 
                        label={`${completedCount}/${totalAssigned} 已完成`}
                        color={completedCount === totalAssigned ? 'success' : 'default'}
                        size="small"
                      />
                      <Chip 
                        label={task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                        color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'info'}
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* 用户完成状态列表 */}
                  <List dense sx={{ mt: 1 }}>
                    {completionData.map(({ user, isCompleted, completedAt }) => (
                      <ListItem key={user.id} sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: getAvatarColor(user.name), width: 32, height: 32 }}>
                            {user.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={isCompleted && completedAt ? `完成于 ${new Date(completedAt).toLocaleString()}` : '未完成'}
                          primaryTypographyProps={{ 
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}
                          secondaryTypographyProps={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        />
                        <ListItemSecondaryAction>
                          {isCompleted ? (
                            <CheckCircle color="success" />
                          ) : (
                            <RadioButtonUnchecked color="disabled" />
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              );
            })}
            
            {tasks.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  暂无任务，请先创建一些任务
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HomePage;
