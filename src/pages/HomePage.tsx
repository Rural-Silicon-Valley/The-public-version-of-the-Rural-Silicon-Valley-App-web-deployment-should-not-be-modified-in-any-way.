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
import { CheckCircle, RadioButtonUnchecked, ExitToApp, Assessment, Group, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PageLayout from '../components/PageLayout';

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
  const getTaskCompletionDetails = () => {
    return tasks.map(task => {
      const taskUsers = users.filter(user => task.assignedTo.includes(user.id));
      const completions = taskUsers.map(user => {
        const hasCompleted = checkIns.some(checkIn => 
          checkIn.taskId === task.id && checkIn.userId === user.id
        );
        return { user, completed: hasCompleted };
      });
      return { task, completions };
    });
  };

  const taskDetails = getTaskCompletionDetails();

  return (
    <PageLayout maxWidth="sm">
      {/* 主内容区域 - 可滚动 */}
      <Box sx={{ 
        overflow: 'auto', // 允许此区域滚动
        paddingBottom: '20px', // 内容底部留白
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
      }}>
        {/* 头部欢迎区域 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h4" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            乡村硅谷任务中心
          </Typography>
          <IconButton 
            onClick={handleLogout}
            color="primary"
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ExitToApp />
          </IconButton>
        </Box>

        {/* 总体统计卡片 */}
        <Card sx={{ 
          mb: { xs: 2, sm: 3 },
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assessment color="primary" />
                <Typography variant="h5" color="primary" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                  整体统计
                </Typography>
              </Box>
              <Chip 
                label="详细统计" 
                onClick={() => navigate('/statistics')}
                sx={{ 
                  backgroundColor: 'primary.main', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              />
            </Box>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
              gap: { xs: 2, sm: 3 },
              mt: 2 
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  团队成员
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {tasks.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总任务数
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="success.main" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {checkIns.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  已打卡次数
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="info.main" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {tasks.length > 0 ? Math.round((checkIns.length / (tasks.length * users.length)) * 100) : 0}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总完成率
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 成员完成情况概览 */}
        <Card sx={{ 
          mb: { xs: 2, sm: 3 },
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Group color="primary" />
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                成员完成情况概览
              </Typography>
            </Box>
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
                            mr: { xs: 1, sm: 1.5 },
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            fontSize: { xs: '1rem', sm: '1.2rem' }
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                          {user.name}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            完成进度
                          </Typography>
                          <Typography variant="body2" color="primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {stats.completed}/{stats.total}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={stats.progress} 
                          sx={{ 
                            height: { xs: 6, sm: 8 },
                            borderRadius: 1,
                            bgcolor: 'rgba(0,0,0,0.1)'
                          }}
                        />
                      </Box>
                      
                      <Chip 
                        label={`${stats.progress.toFixed(0)}% 完成`}
                        color={stats.progress === 100 ? "success" : stats.progress >= 50 ? "warning" : "default"}
                        size="small"
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                      />
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>

        {/* 任务详细情况 */}
        <Card sx={{ 
          mb: { xs: 2, sm: 3 },
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Assignment color="primary" />
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                任务完成详情（每个任务的完成情况）
              </Typography>
            </Box>
            
            {taskDetails.map(({ task, completions }) => (
              <Card key={task.id} variant="outlined" sx={{ 
                mb: { xs: 2, sm: 3 }, 
                p: { xs: 1.5, sm: 2 },
                backgroundColor: 'rgba(255,255,255,0.5)'
              }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.85rem', sm: '0.875rem' }
                }}>
                  {task.description}
                </Typography>
                
                <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                
                <List dense>
                  {completions.map(({ user, completed }) => (
                    <ListItem key={user.id} sx={{ 
                      px: 0,
                      py: { xs: 0.5, sm: 1 }
                    }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: getAvatarColor(user.name),
                          width: { xs: 28, sm: 32 },
                          height: { xs: 28, sm: 32 },
                          fontSize: { xs: '0.8rem', sm: '1rem' }
                        }}>
                          {user.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                            {user.name}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                            {user.role}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        {completed ? (
                          <CheckCircle color="success" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                        ) : (
                          <RadioButtonUnchecked color="disabled" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Card>
            ))}
            
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
    </PageLayout>
  );
};

export default HomePage;
