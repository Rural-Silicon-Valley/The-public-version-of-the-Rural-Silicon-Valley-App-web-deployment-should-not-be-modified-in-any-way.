import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import {
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';
import { useApp } from '../context/AppContext';

// 生成头像颜色
function getAvatarColor(name: string): string {
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function TeamPage() {
  const { state } = useApp();
  
  // 计算每个成员的任务统计
  const memberStats = state.users.map(user => {
    const userTasks = state.tasks.filter(task => 
      task.assignedTo.includes(user.id)
    );
    const completedTasks = userTasks.filter(task => task.status === 'completed');
    const activeTasks = userTasks.filter(task => task.status !== 'completed');
    
    return {
      ...user,
      totalTasks: userTasks.length,
      completedTasks: completedTasks.length,
      activeTasks: activeTasks.length,
      completionRate: userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0,
    };
  }).sort((a, b) => b.completionRate - a.completionRate);

  // 团队整体统计
  const teamStats = {
    totalMembers: state.users.length,
    totalTasks: state.tasks.length,
    completedTasks: state.tasks.filter(task => task.status === 'completed').length,
    activeTasks: state.tasks.filter(task => task.status !== 'completed').length,
  };

  const teamCompletionRate = teamStats.totalTasks > 0 
    ? (teamStats.completedTasks / teamStats.totalTasks) * 100 
    : 0;

  return (
    <PageLayout maxWidth="sm">
      {/* 页面标题 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}>
          👥 团队管理
        </Typography>
        <Typography variant="body2" color="text.secondary">
          查看团队成员和整体表现
        </Typography>
      </Box>

      {/* 团队概览 */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          团队概览
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {teamStats.totalMembers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              团队成员
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {teamStats.totalTasks}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              总任务数
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              团队完成率
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {teamCompletionRate.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={teamCompletionRate} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #4CAF50 0%, #81C784 100%)',
              }
            }} 
          />
        </Box>
      </Paper>

      {/* 成员排行榜 */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ mr: 1, color: 'warning.main' }} />
            成员排行榜
          </Typography>
        </Box>
        
        <List sx={{ pt: 0 }}>
          {memberStats.map((member, index) => (
            <Box key={member.id}>
              <ListItem sx={{ px: 2 }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', minWidth: 40 }}>
                  {index < 3 ? (
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {index + 1}
                    </Typography>
                  )}
                </Box>
                
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getAvatarColor(member.name) }}>
                    {member.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle1">{member.name}</Typography>
                        <Box display="flex" gap={1} sx={{ mt: 0.5 }}>
                          <Chip
                            label={member.role === 'admin' ? '管理员' : '成员'}
                            size="small"
                            variant="outlined"
                            color={member.role === 'admin' ? 'primary' : 'default'}
                          />
                        </Box>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          {member.completionRate.toFixed(0)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {member.completedTasks}/{member.totalTasks} 任务
                        </Typography>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={member.completionRate}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            bgcolor: member.completionRate >= 80 ? 'success.main' : 
                                    member.completionRate >= 60 ? 'warning.main' : 'error.main',
                          }
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              {index < memberStats.length - 1 && <Divider sx={{ mx: 2 }} />}
            </Box>
          ))}
        </List>
      </Paper>

      {/* 团队活动统计 */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <AssignmentIcon sx={{ mr: 1, color: 'info.main' }} />
          活动统计
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #2196f320 0%, #2196f310 100%)',
              border: '1px solid #2196f330',
            }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <AssignmentIcon sx={{ color: '#2196f3', fontSize: 32, mb: 1 }} />
                <Typography variant="h5" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  {teamStats.activeTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  进行中任务
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4caf5020 0%, #4caf5010 100%)',
              border: '1px solid #4caf5030',
            }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 32, mb: 1 }} />
                <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  {teamStats.completedTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  已完成任务
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Paper>

      {/* 底部导航 */}
    </PageLayout>
  );
}
