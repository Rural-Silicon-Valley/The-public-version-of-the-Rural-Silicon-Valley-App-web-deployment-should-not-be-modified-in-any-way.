import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Container,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Fab,
  IconButton,
} from '@mui/material';
import {
  AdminPanelSettings,
  Person,
  Add,
  Close,
  Edit,
  Delete,
  Assignment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
// import { AnimatedForestBackground } from '../components/AnimatedForestBackground';
import type { User } from '../types';

export function UserSelectionPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'member'>('member');

  // 检查是否有保存的用户选择
  useEffect(() => {
    const savedUserId = localStorage.getItem('selectedUserId');
    if (savedUserId) {
      const savedUser = state.users.find(u => u.id === savedUserId);
      if (savedUser) {
        dispatch({ type: 'SET_CURRENT_USER', payload: savedUser });
        navigate('/');
      }
    }
  }, [state.users, dispatch, navigate]);

  // 保存用户选择到本地存储
  const handleConfirmUser = () => {
    if (selectedUser) {
      localStorage.setItem('selectedUserId', selectedUser.id);
      dispatch({ type: 'SET_CURRENT_USER', payload: selectedUser });
      navigate('/');
    }
  };

  // 添加新用户
  const handleAddUser = () => {
    if (newUserName.trim()) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: newUserName.trim(),
        role: newUserRole,
        joinDate: new Date(),
        email: `${newUserName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      };

      dispatch({ type: 'ADD_USER', payload: newUser });
      setNewUserName('');
      setNewUserRole('member');
      setAddUserDialogOpen(false);
    }
  };

  // 编辑用户
  const handleEditUser = () => {
    if (editingUser && newUserName.trim()) {
      const updatedUser: User = {
        ...editingUser,
        name: newUserName.trim(),
        role: newUserRole,
      };

      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      setEditUserDialogOpen(false);
      setEditingUser(null);
      setNewUserName('');
      setNewUserRole('member');
    }
  };

  // 删除用户
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      dispatch({ type: 'DELETE_USER', payload: userId });
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    }
  };

  // 打开编辑对话框
  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setNewUserName(user.name);
    setNewUserRole(user.role);
    setEditUserDialogOpen(true);
  };

  // 获取用户头像背景色
  const getUserAvatarColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
      '#2ECC71', '#E74C3C', '#3498DB', '#9B59B6', '#F39C12'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <AdminPanelSettings /> : <Person />;
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? '管理员' : '成员';
  };

  return (
    <>
      {/* <AnimatedForestBackground /> */}
      <Container maxWidth="md" sx={{ 
        py: { xs: 2, sm: 4 }, 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 页面标题 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <Assignment color="primary" sx={{ fontSize: '2.5rem' }} />
            <Typography 
              variant="h3" 
              color="primary" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '3rem' },
                textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                fontWeight: 'bold'
              }}
            >
              乡村硅谷任务系统
            </Typography>
          </Box>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              textShadow: '1px 1px 2px rgba(255,255,255,0.7)'
            }}
          >
            请选择您的身份
          </Typography>
        </Box>

        {/* 用户选择网格 */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 3 },
          mb: 4, 
          flex: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          {state.users.map((user) => (
            <Box key={user.id} sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' },
              maxWidth: { xs: '100%', sm: '300px' }
            }}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transform: selectedUser?.id === user.id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  border: selectedUser?.id === user.id ? '3px solid' : '1px solid transparent',
                  borderColor: selectedUser?.id === user.id ? 'primary.main' : 'transparent',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  boxShadow: selectedUser?.id === user.id 
                    ? '0 12px 40px rgba(76, 175, 80, 0.3)' 
                    : '0 8px 32px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                  position: 'relative'
                }}
                onClick={() => setSelectedUser(user)}
              >
                {/* 编辑和删除按钮 */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  display: 'flex', 
                  gap: 0.5,
                  zIndex: 2
                }}>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(user);
                    }}
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                    }}
                  >
                    <Delete fontSize="small" color="error" />
                  </IconButton>
                </Box>

                <CardContent sx={{ 
                  textAlign: 'center', 
                  p: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%'
                }}>
                  <Avatar
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 60, sm: 80 },
                      bgcolor: getUserAvatarColor(user.name),
                      mb: 2,
                      fontSize: { xs: '1.5rem', sm: '2rem' },
                      fontWeight: 'bold',
                      border: selectedUser?.id === user.id ? '3px solid' : 'none',
                      borderColor: 'primary.main'
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      fontWeight: 'bold',
                      color: selectedUser?.id === user.id ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {user.name}
                  </Typography>
                  
                  <Chip
                    icon={getRoleIcon(user.role)}
                    label={getRoleLabel(user.role)}
                    color={user.role === 'admin' ? 'primary' : 'default'}
                    variant={selectedUser?.id === user.id ? 'filled' : 'outlined'}
                    sx={{ mb: 1 }}
                  />
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    加入时间: {user.joinDate.toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* 底部操作按钮 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2, 
          mt: 'auto',
          pt: 2
        }}>
          <Button
            variant="contained"
            size="large"
            disabled={!selectedUser}
            onClick={handleConfirmUser}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 'bold',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(76, 175, 80, 0.4)',
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
                boxShadow: 'none',
              }
            }}
          >
            {selectedUser ? `以 ${selectedUser.name} 身份进入` : '请选择用户'}
          </Button>
        </Box>

        {/* 添加用户浮动按钮 */}
        <Fab
          color="primary"
          onClick={() => setAddUserDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 24, sm: 32 },
            right: { xs: 24, sm: 32 },
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(76, 175, 80, 0.4)',
            }
          }}
        >
          <Add />
        </Fab>

        {/* 添加用户对话框 */}
        <Dialog 
          open={addUserDialogOpen} 
          onClose={() => setAddUserDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant="h6">添加新用户</Typography>
            <IconButton onClick={() => setAddUserDialogOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="用户姓名"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="请输入用户姓名"
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">用户角色</FormLabel>
              <RadioGroup
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'member')}
                row
              >
                <FormControlLabel 
                  value="member" 
                  control={<Radio />} 
                  label="成员" 
                />
                <FormControlLabel 
                  value="admin" 
                  control={<Radio />} 
                  label="管理员" 
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={() => setAddUserDialogOpen(false)}>
              取消
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAddUser}
              disabled={!newUserName.trim()}
            >
              添加用户
            </Button>
          </DialogActions>
        </Dialog>

        {/* 编辑用户对话框 */}
        <Dialog 
          open={editUserDialogOpen} 
          onClose={() => setEditUserDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant="h6">编辑用户信息</Typography>
            <IconButton onClick={() => setEditUserDialogOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="用户姓名"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="请输入用户姓名"
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">用户角色</FormLabel>
              <RadioGroup
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'member')}
                row
              >
                <FormControlLabel 
                  value="member" 
                  control={<Radio />} 
                  label="成员" 
                />
                <FormControlLabel 
                  value="admin" 
                  control={<Radio />} 
                  label="管理员" 
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={() => setEditUserDialogOpen(false)}>
              取消
            </Button>
            <Button 
              variant="contained" 
              onClick={handleEditUser}
              disabled={!newUserName.trim()}
            >
              保存修改
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default UserSelectionPage;
