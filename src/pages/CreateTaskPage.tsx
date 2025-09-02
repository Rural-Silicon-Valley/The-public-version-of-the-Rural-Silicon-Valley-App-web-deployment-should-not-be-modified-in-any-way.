import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Container,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  LocationOn,
  CameraAlt,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { User } from '../types';

interface CreateTaskPageProps {
  onTaskCreated?: () => void;
}

export function CreateTaskPage({ onTaskCreated }: CreateTaskPageProps = {}) {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    dueTime: '',
    assignedTo: [] as string[],
    tags: [] as string[],
    newTag: '',
    requireLocation: false,
    requirePhoto: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const availableUsers = state.users.filter(user => user.role === 'member');

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('请输入任务标题');
      return;
    }

    if (formData.assignedTo.length === 0) {
      alert('请至少选择一个执行人员');
      return;
    }

    if (!formData.dueDate) {
      alert('请选择截止日期');
      return;
    }

    // 创建新任务
    const newTask = {
      id: `task_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      createdBy: state.currentUser?.id || '',
      assignedTo: formData.assignedTo,
      dueDate: new Date(`${formData.dueDate}T${formData.dueTime || '23:59'}`),
      status: 'pending' as const,
      priority: formData.priority,
      tags: formData.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 添加到全局状态
    dispatch({ type: 'ADD_TASK', payload: newTask });

    // 显示成功提示
    setShowSuccess(true);
    setTimeout(() => {
      if (onTaskCreated) {
        onTaskCreated();
      } else {
        navigate('/');
      }
    }, 2000);
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: '',
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const toggleAssignee = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter(id => id !== userId)
        : [...prev.assignedTo, userId],
    }));
  };

  if (showSuccess) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 400, textAlign: 'center', p: 3 }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              ✅ 任务创建成功！
            </Typography>
            <Typography variant="body1" color="text.secondary">
              任务已分配给选定的成员，即将返回首页...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        {/* 标题栏 */}
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.dark' }}>
            创建新任务
          </Typography>
        </Box>

        {/* 基本信息 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.dark">
              📝 基本信息
            </Typography>
            
            <TextField
              fullWidth
              label="任务标题"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="例如：果园晨间巡视"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="任务描述"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="详细描述任务内容、要求和注意事项..."
              sx={{ mb: 2 }}
            />

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr 1fr' }} gap={2}>
              <FormControl fullWidth>
                <InputLabel>优先级</InputLabel>
                <Select
                  value={formData.priority}
                  label="优先级"
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                >
                  <MenuItem value="low">🟢 低优先级</MenuItem>
                  <MenuItem value="medium">🟡 中优先级</MenuItem>
                  <MenuItem value="high">🔴 高优先级</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="截止日期"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                type="time"
                label="截止时间"
                value={formData.dueTime}
                onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* 分配成员 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.dark">
              分配成员
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {availableUsers.map((user: User) => (
                <Chip
                  key={user.id}
                  avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                  label={user.name}
                  variant={formData.assignedTo.includes(user.id) ? "filled" : "outlined"}
                  color={formData.assignedTo.includes(user.id) ? "primary" : "default"}
                  onClick={() => toggleAssignee(user.id)}
                  clickable
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* 标签 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.dark">
              🏷️ 任务标签
            </Typography>
            
            <Box display="flex" gap={1} mb={2}>
              <TextField
                size="small"
                label="添加标签"
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button variant="outlined" onClick={handleAddTag} disabled={!formData.newTag.trim()}>
                <Add />
              </Button>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* 特殊要求 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.dark">
              ⚙️ 特殊要求
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.requireLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, requireLocation: e.target.checked }))}
                />
              }
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOn />
                  <Typography>需要位置验证</Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.requirePhoto}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirePhoto: e.target.checked }))}
                />
              }
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <CameraAlt />
                  <Typography>需要拍照记录</Typography>
                </Box>
              }
            />
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{ minWidth: 120 }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ minWidth: 120 }}
          >
            创建任务
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
