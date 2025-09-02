import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  People,
  CheckCircle,
  Schedule,
  BarChart,
  PieChart,
  Timeline,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageLayout } from '../components/PageLayout';

// 生成彩色头像
const getAvatarColor = (name: string) => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface StatCard {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const StatisticsPage: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const { users, tasks, checkIns } = state;
  const [timeFilter, setTimeFilter] = React.useState('all');

  // 基础统计计算
  const totalTasks = tasks.length;
  const totalUsers = users.length;
  const totalCheckIns = checkIns.length;
  const completedTasks = tasks.filter(task => {
    const assignedUsers = task.assignedTo;
    return assignedUsers.every(userId => 
      checkIns.some(checkIn => checkIn.taskId === task.id && checkIn.userId === userId)
    );
  }).length;

  const averageProgress = totalTasks > 0 ? Math.round((totalCheckIns / (totalTasks * totalUsers)) * 100) : 0;
  const todayCheckIns = checkIns.filter(checkIn => {
    const today = new Date().toDateString();
    return new Date(checkIn.timestamp).toDateString() === today;
  }).length;

  // 用户表现统计
  const getUserStats = () => {
    return users.map(user => {
      const userTasks = tasks.filter(task => task.assignedTo.includes(user.id));
      const userCheckIns = checkIns.filter(checkIn => checkIn.userId === user.id);
      const completionRate = userTasks.length > 0 ? (userCheckIns.length / userTasks.length) * 100 : 0;
      
      // 计算最近活跃度（过去7天的打卡次数）
      const recentActivity = checkIns.filter(checkIn => {
        const checkInDate = new Date(checkIn.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return checkIn.userId === user.id && checkInDate >= weekAgo;
      }).length;

      return {
        user,
        totalTasks: userTasks.length,
        completedTasks: userCheckIns.length,
        completionRate: Math.round(completionRate),
        recentActivity
      };
    }).sort((a, b) => b.completionRate - a.completionRate);
  };

  // 任务类型统计
  const getTaskTypeStats = () => {
    const tasksByCreator = tasks.reduce((acc, task) => {
      const creator = users.find(u => u.id === task.createdBy);
      const creatorName = creator ? creator.name : '未知';
      acc[creatorName] = (acc[creatorName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tasksByCreator).map(([creator, count]) => ({
      creator,
      count,
      percentage: Math.round((count / totalTasks) * 100)
    }));
  };

  // 每日活跃度统计
  const getDailyActivity = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();

    return last7Days.map(date => {
      const dayCheckIns = checkIns.filter(checkIn => {
        const checkInDate = new Date(checkIn.timestamp);
        return checkInDate.toDateString() === date.toDateString();
      }).length;

      return {
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        checkIns: dayCheckIns
      };
    });
  };

  const userStats = getUserStats();
  const taskTypeStats = getTaskTypeStats();
  const dailyActivity = getDailyActivity();

  // 统计卡片数据
  const statCards: StatCard[] = [
    {
      title: '总任务数',
      value: totalTasks,
      icon: <Assignment />,
      color: '#2196f3',
      subtitle: '系统中的任务总数'
    },
    {
      title: '团队成员',
      value: totalUsers,
      icon: <People />,
      color: '#4caf50',
      subtitle: '活跃用户数量'
    },
    {
      title: '完成率',
      value: `${averageProgress}%`,
      icon: <CheckCircle />,
      color: '#ff9800',
      subtitle: '整体任务完成率'
    },
    {
      title: '今日打卡',
      value: todayCheckIns,
      icon: <Schedule />,
      color: '#9c27b0',
      subtitle: '今天的打卡次数'
    }
  ];

  return (
    <PageLayout maxWidth="md" hasBottomNav={false}>
      {/* 头部 */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        gap: 2
      }}>
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <BarChart color="primary" />
          <Typography 
            variant="h4" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            数据统计中心
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>时间范围</InputLabel>
          <Select
            value={timeFilter}
            label="时间范围"
            onChange={(e) => setTimeFilter(e.target.value)}
            size="small"
          >
            <MenuItem value="all">全部时间</MenuItem>
            <MenuItem value="week">最近7天</MenuItem>
            <MenuItem value="month">最近30天</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 统计卡片 */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 3 
      }}>
        {statCards.map((card, index) => (
          <Card key={index} sx={{ 
            height: '100%',
            background: `linear-gradient(135deg, ${card.color}15, ${card.color}25)`,
            border: `1px solid ${card.color}30`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    backgroundColor: card.color,
                    borderRadius: '50%',
                    p: 1,
                    color: 'white',
                    mr: 2
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: card.color }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </Box>
              </Box>
              {card.subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {card.subtitle}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 用户表现排行榜和任务创建统计 */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
        gap: 3, 
        mb: 3 
      }}>
        <Card sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="primary">
                用户表现排行榜
              </Typography>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List>
                {userStats.map((stat, index) => (
                  <React.Fragment key={stat.user.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(stat.user.name),
                            width: 40,
                            height: 40
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {stat.user.name}
                            </Typography>
                            <Chip 
                              label={`${stat.completionRate}%`} 
                              size="small"
                              color={stat.completionRate >= 80 ? 'success' : stat.completionRate >= 60 ? 'warning' : 'default'}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              完成: {stat.completedTasks}/{stat.totalTasks} 任务
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={stat.completionRate} 
                              sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < userStats.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: '400px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PieChart sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="primary">
                任务创建分布
              </Typography>
            </Box>
            <List>
              {taskTypeStats.map((stat, index) => (
                <React.Fragment key={stat.creator}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getAvatarColor(stat.creator) }}>
                        {stat.creator[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={stat.creator}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            创建了 {stat.count} 个任务 ({stat.percentage}%)
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={stat.percentage} 
                            sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < taskTypeStats.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* 每日活跃度趋势 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Timeline sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary">
              最近7天活跃度趋势
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'end', 
            gap: 2, 
            height: 150,
            overflow: 'auto'
          }}>
            {dailyActivity.map((day, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {day.checkIns}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 40,
                    height: `${Math.max((day.checkIns / Math.max(...dailyActivity.map(d => d.checkIns), 1)) * 100, 10)}px`,
                    backgroundColor: 'primary.main',
                    borderRadius: 1,
                    transition: 'all 0.3s ease'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {day.date}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* 详细数据表格 */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BarChart sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary">
              详细统计数据
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
            gap: 2 
          }}>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
              <Typography variant="h4" color="primary">{totalTasks}</Typography>
              <Typography variant="body2">总任务数</Typography>
            </Card>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
              <Typography variant="h4" color="success.main">{completedTasks}</Typography>
              <Typography variant="body2">已完成任务</Typography>
            </Card>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255, 152, 0, 0.1)' }}>
              <Typography variant="h4" color="warning.main">{totalTasks - completedTasks}</Typography>
              <Typography variant="body2">进行中任务</Typography>
            </Card>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(156, 39, 176, 0.1)' }}>
              <Typography variant="h4" color="secondary.main">{totalCheckIns}</Typography>
              <Typography variant="body2">总打卡次数</Typography>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default StatisticsPage;
