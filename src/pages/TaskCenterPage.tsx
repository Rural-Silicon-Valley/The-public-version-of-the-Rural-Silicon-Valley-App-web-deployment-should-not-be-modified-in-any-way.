import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  LinearProgress,
  Paper,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { PageLayout } from '../components/PageLayout';
import { useApp } from '../context/AppContext';
import type { Task } from '../types';
import { TaskCard } from '../components/TaskCard';
import { CreateTaskPage } from './CreateTaskPage';

// 任务状态枚举
const TaskStatus = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;

type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

// 任务统计卡片组件
function TaskStatsCard({ title, count, icon, color }: {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card sx={{ 
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}30`,
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" sx={{ color, fontWeight: 'bold' }}>
              {count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function TaskCenterPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<TaskStatusType>(TaskStatus.ALL);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // 筛选任务
  const filteredTasks = state.tasks.filter((task: Task) => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    
    switch (activeTab) {
      case TaskStatus.ACTIVE:
        return task.status !== 'completed' && dueDate >= now;
      case TaskStatus.COMPLETED:
        return task.status === 'completed';
      case TaskStatus.OVERDUE:
        return task.status !== 'completed' && dueDate < now;
      default:
        return true;
    }
  });

  // 计算统计数据
  const stats = {
    total: state.tasks.length,
    active: state.tasks.filter(task => task.status !== 'completed' && new Date(task.dueDate) >= new Date()).length,
    completed: state.tasks.filter(task => task.status === 'completed').length,
    overdue: state.tasks.filter(task => task.status !== 'completed' && new Date(task.dueDate) < new Date()).length,
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TaskStatusType) => {
    setActiveTab(newValue);
  };

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
          📋 任务中心
        </Typography>
        <Typography variant="body2" color="text.secondary">
          管理和跟踪所有任务进度
        </Typography>
      </Box>

      {/* 统计概览 */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          任务概览
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <TaskStatsCard
              title="总任务"
              count={stats.total}
              icon={<AssignmentIcon />}
              color="#1976d2"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TaskStatsCard
              title="进行中"
              count={stats.active}
              icon={<TimeIcon />}
              color="#ff9800"
            />
          </Box>
        </Stack>
        
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <TaskStatsCard
              title="已完成"
              count={stats.completed}
              icon={<CheckIcon />}
              color="#4caf50"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TaskStatsCard
              title="已逾期"
              count={stats.overdue}
              icon={<CancelIcon />}
              color="#f44336"
            />
          </Box>
        </Stack>

        {/* 完成率进度条 */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              整体完成率
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {completionRate.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionRate} 
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

      {/* 任务筛选标签 */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
            },
          }}
        >
          <Tab 
            label={`全部 (${stats.total})`} 
            value={TaskStatus.ALL}
            icon={<AssignmentIcon />}
          />
          <Tab 
            label={`进行中 (${stats.active})`} 
            value={TaskStatus.ACTIVE}
            icon={<TimeIcon />}
          />
          <Tab 
            label={`已完成 (${stats.completed})`} 
            value={TaskStatus.COMPLETED}
            icon={<CheckIcon />}
          />
          <Tab 
            label={`逾期 (${stats.overdue})`} 
            value={TaskStatus.OVERDUE}
            icon={<CancelIcon />}
          />
        </Tabs>
      </Paper>

      {/* 任务列表 */}
      <Box sx={{ mb: 2 }}>
        {filteredTasks.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <AssignmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              {activeTab === TaskStatus.ALL ? '暂无任务' : '暂无相关任务'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {activeTab === TaskStatus.ALL ? '点击右下角按钮创建第一个任务' : '尝试切换其他标签查看任务'}
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        )}
      </Box>

      {/* 创建任务浮动按钮 */}
      <Fab
        color="primary"
        aria-label="创建任务"
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 20,
          background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1B5E20 30%, #388E3C 90%)',
          },
        }}
        onClick={() => setShowCreateTask(true)}
      >
        <AddIcon />
      </Fab>

      {/* 创建任务对话框 */}
      <Dialog
        fullScreen
        open={showCreateTask}
        onClose={() => setShowCreateTask(false)}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">创建新任务</Typography>
          <Button onClick={() => setShowCreateTask(false)}>取消</Button>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <CreateTaskPage onTaskCreated={() => setShowCreateTask(false)} />
        </DialogContent>
      </Dialog>

      {/* 底部导航 */}
    </PageLayout>
  );
}
