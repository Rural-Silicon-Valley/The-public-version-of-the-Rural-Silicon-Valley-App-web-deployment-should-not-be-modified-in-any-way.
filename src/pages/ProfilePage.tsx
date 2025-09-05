import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Slider,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Notifications,
  Help,
  ExitToApp,
  Edit,
  Settings,
  Shield,
  Phone,
  Mail,
  Save,
  Info,
  Language,
  Storage,
  BugReport,
  Feedback,
  ContactSupport,
  VolumeUp,
  Vibration,
  DarkMode,
  LightMode,
  DeleteForever,
  CloudDownload,
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [showAppSettingsDialog, setShowAppSettingsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showDataDialog, setShowDataDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // 用户编辑表单状态
  const [editForm, setEditForm] = useState({
    name: state.currentUser?.name || '',
    phone: state.currentUser?.phone || '',
    email: state.currentUser?.email || '',
    role: state.currentUser?.role || 'member' as 'admin' | 'member'
  });

  // 通知设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    taskReminder: true,
    messageNotification: true,
    soundEnabled: true,
    vibrationEnabled: true,
    reminderTime: 9, // 9点提醒
  });

  // 应用设置状态
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'zh',
    autoSave: true,
    showAnimations: true,
    compactMode: false,
  });

  // 隐私设置状态
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    allowDataCollection: true,
    shareProgress: true,
    profileVisibility: 'team', // 'public', 'team', 'private'
  });

  const handleUserSwitch = (userId: string) => {
    const newUser = state.users.find(u => u.id === userId);
    if (newUser) {
      dispatch({ type: 'SET_CURRENT_USER', payload: newUser });
      localStorage.setItem('selectedUserId', newUser.id);
      setShowUserDialog(false);
      showSnackbar('用户切换成功');
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSaveProfile = () => {
    // 这里应该调用API保存用户信息
    // 暂时只更新本地状态
    if (state.currentUser) {
      const updatedUser = { 
        ...state.currentUser, 
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        role: editForm.role as 'admin' | 'member'
      };
      dispatch({ type: 'SET_CURRENT_USER', payload: updatedUser });
      setShowEditDialog(false);
      showSnackbar('个人信息保存成功');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('selectedUserId');
    navigate('/user-selection');
  };

  const handleExportData = () => {
    // 导出用户数据
    const userData = {
      user: state.currentUser,
      tasks: state.tasks.filter(task => task.assignedTo.includes(state.currentUser?.id || '')),
      checkIns: state.checkIns.filter(checkIn => checkIn.userId === state.currentUser?.id),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `乡村硅谷_用户数据_${state.currentUser?.name}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSnackbar('数据导出成功');
  };

  const handleClearCache = () => {
    // 清理缓存
    localStorage.removeItem('app-cache');
    sessionStorage.clear();
    showSnackbar('缓存清理成功');
  };

  // 计算当前用户的任务统计
  const userTasks = state.tasks.filter(task => 
    task.assignedTo.includes(state.currentUser?.id || '')
  );
  const completedTasks = userTasks.filter(task => 
    state.checkIns.some(checkIn => checkIn.taskId === task.id && checkIn.userId === state.currentUser?.id)
  );
  const totalTasks = userTasks.length;

  const handleBack = () => {
    navigate('/');
  };

  const profileMenuItems = [
    { 
      icon: <Edit />, 
      title: '编辑个人信息', 
      subtitle: '修改姓名、电话等基本信息',
      action: () => setShowEditDialog(true) 
    },
    { 
      icon: <Notifications />, 
      title: '通知设置', 
      subtitle: '任务提醒、消息通知设置',
      action: () => setShowNotificationDialog(true) 
    },
    { 
      icon: <Settings />, 
      title: '应用设置', 
      subtitle: '主题、语言、显示偏好',
      action: () => setShowAppSettingsDialog(true) 
    },
    { 
      icon: <Shield />, 
      title: '隐私与安全', 
      subtitle: '数据隐私、可见性设置',
      action: () => setShowPrivacyDialog(true) 
    },
    { 
      icon: <Storage />, 
      title: '数据管理', 
      subtitle: '导出数据、清理缓存',
      action: () => setShowDataDialog(true) 
    },
    { 
      icon: <Help />, 
      title: '帮助与反馈', 
      subtitle: '使用说明、意见反馈',
      action: () => setShowHelpDialog(true) 
    },
    { 
      icon: <ExitToApp />, 
      title: '退出登录', 
      subtitle: '安全退出当前账户',
      action: handleLogout 
    },
  ];

  return (
    <PageLayout maxWidth="md" hasBottomNav={false}>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        {/* 标题栏 */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'primary.main',
              fontWeight: 'bold',
              borderRadius: 2,
              px: 2,
              py: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }
            }}
          >
            退出设置
          </Button>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            个人中心
          </Typography>
          <Box width={120} />
        </Box>

        {/* 用户信息卡片 */}
        <Card 
          sx={{ 
            mb: 3, 
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mr: 3,
                  border: '3px solid #1976d2'
                }}
                src={state.currentUser?.avatar}
              >
                <Person />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {state.currentUser?.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Phone sx={{ fontSize: 16, mr: 1, color: 'gray' }} />
                  <Typography variant="body2" color="textSecondary">
                    {state.currentUser?.phone}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Mail sx={{ fontSize: 16, mr: 1, color: 'gray' }} />
                  <Typography variant="body2" color="textSecondary">
                    {state.currentUser?.email || '未设置邮箱'}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowUserDialog(true)}
                sx={{ borderRadius: 2 }}
              >
                切换用户
              </Button>
            </Box>
            
            {/* 用户统计 */}
            <Box display="flex" justifyContent="space-around" mt={2} pt={2} borderTop="1px solid #eee">
              <Box textAlign="center">
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {totalTasks}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  总任务数
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                  {completedTasks.length}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  已完成
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="warning.main" sx={{ fontWeight: 'bold' }}>
                  {totalTasks - completedTasks.length}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  进行中
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 功能菜单 */}
        <Card 
          sx={{ 
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <List>
              {profileMenuItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={item.action}
                    sx={{ 
                      py: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.1)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      secondary={item.subtitle}
                      primaryTypographyProps={{
                        fontSize: '1rem',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.8rem',
                        color: 'text.secondary'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

      {/* 用户切换对话框 */}
      <Dialog 
        open={showUserDialog} 
        onClose={() => setShowUserDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          选择用户
        </DialogTitle>
        <DialogContent>
          <List>
            {state.users.map((user) => (
              <ListItem key={user.id} disablePadding>
                <ListItemButton
                  onClick={() => handleUserSwitch(user.id)}
                  selected={user.id === state.currentUser?.id}
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(76, 175, 80, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.3)'
                      }
                    }
                  }}
                >
                  <ListItemIcon>
                    <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>
                      <Person />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={user.name}
                    secondary={user.phone}
                    primaryTypographyProps={{
                      fontWeight: user.id === state.currentUser?.id ? 'bold' : 'normal'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowUserDialog(false)} sx={{ borderRadius: 2 }}>
            取消
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑个人信息对话框 */}
      <Dialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Edit sx={{ mr: 1 }} />
          编辑个人信息
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="姓名"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="电话"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="邮箱"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>角色</InputLabel>
              <Select
                value={editForm.role}
                label="角色"
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'admin' | 'member' })}
              >
                <MenuItem value="admin">管理员</MenuItem>
                <MenuItem value="member">成员</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowEditDialog(false)}>
            取消
          </Button>
          <Button onClick={handleSaveProfile} variant="contained" startIcon={<Save />}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 通知设置对话框 */}
      <Dialog
        open={showNotificationDialog}
        onClose={() => setShowNotificationDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Notifications sx={{ mr: 1 }} />
          通知设置
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.taskReminder}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    taskReminder: e.target.checked
                  })}
                />
              }
              label="任务提醒"
              sx={{ mb: 2, width: '100%' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.messageNotification}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    messageNotification: e.target.checked
                  })}
                />
              }
              label="消息通知"
              sx={{ mb: 2, width: '100%' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.soundEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    soundEnabled: e.target.checked
                  })}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VolumeUp sx={{ mr: 1, fontSize: 20 }} />
                  声音提醒
                </Box>
              }
              sx={{ mb: 2, width: '100%' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.vibrationEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    vibrationEnabled: e.target.checked
                  })}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Vibration sx={{ mr: 1, fontSize: 20 }} />
                  震动提醒
                </Box>
              }
              sx={{ mb: 3, width: '100%' }}
            />
            <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
              每日提醒时间: {notificationSettings.reminderTime}:00
            </Typography>
            <Slider
              value={notificationSettings.reminderTime}
              onChange={(_, value) => setNotificationSettings({
                ...notificationSettings,
                reminderTime: value as number
              })}
              min={6}
              max={22}
              marks
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowNotificationDialog(false)}>
            关闭
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            保存设置
          </Button>
        </DialogActions>
      </Dialog>

      {/* 应用设置对话框 */}
      <Dialog
        open={showAppSettingsDialog}
        onClose={() => setShowAppSettingsDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Settings sx={{ mr: 1 }} />
          应用设置
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>主题模式</InputLabel>
              <Select
                value={appSettings.theme}
                label="主题模式"
                onChange={(e) => setAppSettings({ ...appSettings, theme: e.target.value })}
                startAdornment={appSettings.theme === 'dark' ? <DarkMode /> : <LightMode />}
              >
                <MenuItem value="light">浅色模式</MenuItem>
                <MenuItem value="dark">深色模式</MenuItem>
                <MenuItem value="auto">跟随系统</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>语言</InputLabel>
              <Select
                value={appSettings.language}
                label="语言"
                onChange={(e) => setAppSettings({ ...appSettings, language: e.target.value })}
                startAdornment={<Language />}
              >
                <MenuItem value="zh">简体中文</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.autoSave}
                  onChange={(e) => setAppSettings({
                    ...appSettings,
                    autoSave: e.target.checked
                  })}
                />
              }
              label="自动保存"
              sx={{ mb: 2, width: '100%' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.showAnimations}
                  onChange={(e) => setAppSettings({
                    ...appSettings,
                    showAnimations: e.target.checked
                  })}
                />
              }
              label="显示动画效果"
              sx={{ mb: 2, width: '100%' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.compactMode}
                  onChange={(e) => setAppSettings({
                    ...appSettings,
                    compactMode: e.target.checked
                  })}
                />
              }
              label="紧凑模式"
              sx={{ mb: 2, width: '100%' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowAppSettingsDialog(false)}>
            关闭
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            保存设置
          </Button>
        </DialogActions>
      </Dialog>

      {/* 隐私与安全对话框 */}
      <Dialog
        open={showPrivacyDialog}
        onClose={() => setShowPrivacyDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Shield sx={{ mr: 1 }} />
          隐私与安全
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showOnlineStatus}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    showOnlineStatus: e.target.checked
                  })}
                />
              }
              label="显示在线状态"
              sx={{ mb: 2, width: '100%' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.allowDataCollection}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    allowDataCollection: e.target.checked
                  })}
                />
              }
              label="允许数据收集用于改进服务"
              sx={{ mb: 2, width: '100%' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.shareProgress}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    shareProgress: e.target.checked
                  })}
                />
              }
              label="分享任务进度"
              sx={{ mb: 3, width: '100%' }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>个人资料可见性</InputLabel>
              <Select
                value={privacySettings.profileVisibility}
                label="个人资料可见性"
                onChange={(e) => setPrivacySettings({ 
                  ...privacySettings, 
                  profileVisibility: e.target.value 
                })}
              >
                <MenuItem value="public">所有人可见</MenuItem>
                <MenuItem value="team">仅团队成员可见</MenuItem>
                <MenuItem value="private">仅自己可见</MenuItem>
              </Select>
            </FormControl>

            <Alert severity="info" sx={{ mt: 2 }}>
              我们重视您的隐私，所有数据都会得到妥善保护。
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowPrivacyDialog(false)}>
            关闭
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            保存设置
          </Button>
        </DialogActions>
      </Dialog>

      {/* 数据管理对话框 */}
      <Dialog
        open={showDataDialog}
        onClose={() => setShowDataDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Storage sx={{ mr: 1 }} />
          数据管理
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                导出个人数据
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                导出您的任务记录、打卡数据等个人信息
              </Typography>
              <Button
                variant="contained"
                startIcon={<CloudDownload />}
                onClick={handleExportData}
                sx={{ borderRadius: 2 }}
              >
                导出数据
              </Button>
            </Card>

            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 152, 0, 0.1)' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                清理缓存
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                清理应用缓存可能会提高性能，但需要重新加载数据
              </Typography>
              <Button
                variant="outlined"
                startIcon={<DeleteForever />}
                onClick={handleClearCache}
                sx={{ borderRadius: 2 }}
              >
                清理缓存
              </Button>
            </Card>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              数据存储大小: 约 2.5 MB
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowDataDialog(false)}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>

      {/* 帮助与反馈对话框 */}
      <Dialog
        open={showHelpDialog}
        onClose={() => setShowHelpDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Help sx={{ mr: 1 }} />
          帮助与反馈
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Info color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="使用指南"
                  secondary="了解如何使用乡村硅谷任务管理系统"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <ContactSupport color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="联系客服"
                  secondary="遇到问题？联系我们的客服团队"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Feedback color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="意见反馈"
                  secondary="您的建议对我们很重要"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <BugReport color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="报告问题"
                  secondary="发现了Bug？告诉我们吧"
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                版本信息
              </Typography>
              <Chip label="v1.0.0" size="small" sx={{ mt: 1 }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                © 2024 乡村硅谷任务管理系统
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowHelpDialog(false)}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>

      {/* 成功提示 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{ borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Container>
    </PageLayout>
  );
};

export default ProfilePage;
