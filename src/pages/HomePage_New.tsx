import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { state, dispatch } = useApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>, taskId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  }, []);

  const handleDeleteTask = useCallback(() => {
    if (selectedTaskId) {
      dispatch({ type: 'DELETE_TASK', payload: selectedTaskId });
      setSnackbar({ open: true, message: '任务已删除', severity: 'success' });
    }
    handleMenuClose();
  }, [selectedTaskId, dispatch]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  // 获取统计数据
  const totalTasks = state.tasks.length;
  const activeTasks = state.tasks.filter(task => task.status !== 'completed').length;
  const completedTasks = state.tasks.filter(task => task.status === 'completed').length;

  return (
    <Container maxWidth="md" sx={{ py: 2, pb: 10 }}>
      {/* 欢迎信息 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          乡村硅谷
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {state.currentUser ? `欢迎，${state.currentUser.name}！` : '欢迎使用任务管理系统'}
        </Typography>
      </Box>

      {/* 统计卡片 */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'primary.light', color: 'white' }}>
            <CardContent sx={{ py: 2 }}>
              <AssignmentIcon sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="h6" component="div">
                {totalTasks}
              </Typography>
              <Typography variant="body2">
                总任务
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'warning.light', color: 'white' }}>
            <CardContent sx={{ py: 2 }}>
              <ScheduleIcon sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="h6" component="div">
                {activeTasks}
              </Typography>
              <Typography variant="body2">
                进行中
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'success.light', color: 'white' }}>
            <CardContent sx={{ py: 2 }}>
              <GroupIcon sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="h6" component="div">
                {completedTasks}
              </Typography>
              <Typography variant="body2">
                已完成
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 任务列表 */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          最新任务
        </Typography>
      </Box>

      {state.tasks.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              暂无任务
            </Typography>
            <Typography variant="body2" color="text.secondary">
              点击右下角的"+"按钮创建第一个任务
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {state.tasks.slice(0, 5).map((task) => (
            <Card key={task.id} sx={{ position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                    {task.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, task.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={task.status === 'completed' ? '已完成' : task.status === 'in_progress' ? '进行中' : '待开始'}
                    color={task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    截止：{new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* 任务操作菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteTask} sx={{ color: 'error.main' }}>
          删除任务
        </MenuItem>
      </Menu>

      {/* 提示消息 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
