import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  AccessTime,
  Flag,
  MoreVert,
  CheckCircle,
  Schedule,
  Warning,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { Task } from '../types';
import { useApp } from '../context/AppContext';
import { useTaskCheckIns } from '../hooks';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TaskCard({ task, onClick, onMenuClick }: TaskCardProps) {
  const { state } = useApp();
  const checkIns = useTaskCheckIns(task.id);

  // 获取分配给任务的用户
  const assignedUsers = state.users.filter(user => 
    task.assignedTo.includes(user.id)
  );

  // 计算完成进度
  const completionRate = task.assignedTo.length > 0 
    ? (checkIns.length / task.assignedTo.length) * 100 
    : 0;

  // 获取任务状态图标和颜色
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'in-progress':
        return <Schedule sx={{ color: 'warning.main' }} />;
      case 'overdue':
        return <Warning sx={{ color: 'error.main' }} />;
      default:
        return <AccessTime sx={{ color: 'text.secondary' }} />;
    }
  };

  // 获取优先级颜色
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  // 格式化状态文本
  const getStatusText = () => {
    switch (task.status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'overdue':
        return '已逾期';
      case 'pending':
        return '待开始';
      default:
        return '未知';
    }
  };

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        mb: 2,
        '&:hover': onClick ? {
          boxShadow: (theme) => theme.shadows[8],
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        {/* 任务标题和菜单 */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="h3" sx={{ flex: 1, mr: 1 }}>
            {task.title}
          </Typography>
          {onMenuClick && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick(e);
              }}
            >
              <MoreVert />
            </IconButton>
          )}
        </Box>

        {/* 任务描述 */}
        {task.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {task.description}
          </Typography>
        )}

        {/* 状态和优先级 */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {getStatusIcon()}
          <Typography variant="body2" color="text.secondary">
            {getStatusText()}
          </Typography>
          <Chip
            label={`${task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}优先级`}
            size="small"
            color={getPriorityColor() as any}
            variant="outlined"
          />
        </Box>

        {/* 进度条 */}
        {task.assignedTo.length > 0 && (
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography variant="body2" color="text.secondary">
                完成进度
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {checkIns.length}/{task.assignedTo.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        {/* 截止时间和分配用户 */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <Flag fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {format(new Date(task.dueDate), 'MM月dd日 HH:mm', { locale: zhCN })}
            </Typography>
          </Box>
          
          {assignedUsers.length > 0 && (
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
              {assignedUsers.map((user) => (
                <Avatar key={user.id} alt={user.name} src={user.avatar}>
                  {user.name.charAt(0)}
                </Avatar>
              ))}
            </AvatarGroup>
          )}
        </Box>

        {/* 标签 */}
        {task.tags.length > 0 && (
          <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
            {task.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: '20px' }}
              />
            ))}
            {task.tags.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{task.tags.length - 3}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
