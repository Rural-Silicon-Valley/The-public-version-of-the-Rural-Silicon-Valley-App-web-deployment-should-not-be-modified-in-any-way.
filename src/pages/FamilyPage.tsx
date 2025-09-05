import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useApp } from '../context/AppContext';
import type { FamilyRelationship, LoveRelationship, User } from '../types';

// 生成头像颜色
const getAvatarColor = (name: string) => {
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return colors[hash % colors.length];
};

// 定义常量
const RELATIONSHIP_STATUSES = [
  '相识期',
  '暧昧期',
  '热恋期',
  '已订婚',
  '已结婚',
  '甜蜜期'
];

export const FamilyPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [tabValue, setTabValue] = useState(0);

  // 家庭成员相关状态
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  // 恋人关系相关状态
  const [relationshipDialogOpen, setRelationshipDialogOpen] = useState(false);
  const [editingRelationship, setEditingRelationship] = useState<{
    id: string;
    person1: { id: string; name: string };
    person2: { id: string; name: string };
    status: string;
    description: string;
  } | null>(null);
  const [relationshipFormData, setRelationshipFormData] = useState({
    person1: { id: '', name: '' },
    person2: { id: '', name: '' },
    status: RELATIONSHIP_STATUSES[0],
    description: ''
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 编辑成员状态
  const [editingMember, setEditingMember] = useState<User | null>(null);

  // 处理添加成员
  const handleAddMember = () => {
    if (newMemberName.trim()) {
      // 如果是编辑模式
      if (editingMember) {
        // 更新现有用户
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            ...editingMember,
            name: newMemberName,
          }
        });
        setEditingMember(null);
      } else {
        // 添加新用户
        const newMember: User = {
          id: `user-${Date.now()}`,
          name: newMemberName,
          role: 'member',
          joinDate: new Date(),
        };
        dispatch({
          type: 'ADD_USER',
          payload: newMember
        });
      }
      setNewMemberName('');
      setMemberDialogOpen(false);
    }
  };

  // 处理编辑成员
  const handleEditMember = (user: User) => {
    setEditingMember(user);
    setNewMemberName(user.name);
    setMemberDialogOpen(true);
  };

  // 处理删除成员
  const handleDeleteMember = (userId: string) => {
    if (window.confirm('确定要删除这个家庭成员吗？')) {
      dispatch({
        type: 'DELETE_USER',
        payload: userId
      });
    }
  };

  const handleOpenRelationshipDialog = (relationship?: {
    id: string;
    person1: { id: string; name: string };
    person2: { id: string; name: string };
    status: string;
    description: string;
  }) => {
    if (relationship) {
      setEditingRelationship(relationship);
      setRelationshipFormData(relationship);
    } else {
      setEditingRelationship(null);
      setRelationshipFormData({
        person1: { id: '', name: '' },
        person2: { id: '', name: '' },
        status: RELATIONSHIP_STATUSES[0],
        description: ''
      });
    }
    setRelationshipDialogOpen(true);
  };

  const handleCloseRelationshipDialog = () => {
    setRelationshipDialogOpen(false);
    setEditingRelationship(null);
  };

  // 处理删除关系
  const handleDeleteRelationship = (relationshipId: string, userId: string) => {
    const doDelete = window.confirm('确定要删除这段关系吗？');
    if (doDelete) {
      try {
        if (tabValue === 0) {
          // 删除家庭关系
          dispatch({
            type: 'DELETE_FAMILY_RELATIONSHIP',
            payload: { userId, relationshipId }
          });
        } else {
          // 删除恋爱关系
          dispatch({
            type: 'DELETE_LOVE_RELATIONSHIP',
            payload: { userId, relationshipId }
          });
        }
        alert('删除成功');
      } catch (error) {
        console.error('删除关系时出错:', error);
        alert('删除失败，请重试');
      }
    }
  };

  const handleSaveRelationship = () => {
    if (!state.currentUser) {
      alert('请先选择当前用户！');
      return;
    }

    const relationshipId = editingRelationship ? editingRelationship.id : Date.now().toString();

    if (tabValue === 0) {
      // 保存家庭关系
      const familyRelationship: FamilyRelationship = {
        id: relationshipId,
        memberId: relationshipFormData.person2.id,
        relationshipType: relationshipFormData.status,
        description: relationshipFormData.description
      };

      dispatch({
        type: 'ADD_FAMILY_RELATIONSHIP',
        payload: {
          userId: state.currentUser.id,
          relationship: familyRelationship
        }
      });
    } else {
      // 保存恋爱关系
      const loveRelationship: LoveRelationship = {
        id: relationshipId,
        partnerId: relationshipFormData.person2.id,
        status: relationshipFormData.status as 'dating' | 'engaged' | 'married',
        description: relationshipFormData.description
      };

      dispatch({
        type: 'ADD_LOVE_RELATIONSHIP',
        payload: {
          userId: state.currentUser.id,
          relationship: loveRelationship
        }
      });
    }

    handleCloseRelationshipDialog();
  };

  return (
    <PageLayout>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                minHeight: '48px',
              }
            }}
          >
            <Tab
              icon={<PeopleIcon sx={{ mr: 1 }} />}
              label="家庭成员"
              iconPosition="start"
            />
            <Tab
              icon={<FavoriteIcon sx={{ mr: 1, color: '#e91e63' }} />}
              label="硅谷恋人"
              iconPosition="start"
              sx={{
                color: '#e91e63',
                '&.Mui-selected': {
                  color: '#e91e63'
                }
              }}
            />
          </Tabs>
        </Paper>

        {tabValue === 0 ? (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              硅谷家庭成员
            </Typography>

            <List>
              {state.users?.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditMember(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: getAvatarColor(user.name),
                        width: 40,
                        height: 40
                      }}
                    >
                      {user.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.role === 'admin' ? '管理员' : '成员'}
                  />
                </ListItem>
              ))}
            </List>

            {/* 添加成员按钮 */}
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: 'fixed',
                bottom: 80,
                right: 16,
              }}
              onClick={() => setMemberDialogOpen(true)}
            >
              <AddIcon />
            </Fab>

            {/* 添加/编辑成员对话框 */}
            <Dialog
              open={memberDialogOpen}
              onClose={() => {
                setMemberDialogOpen(false);
                setEditingMember(null);
                setNewMemberName('');
              }}
            >
              <DialogTitle>{editingMember ? '编辑成员' : '添加新成员'}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="成员姓名"
                  fullWidth
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setMemberDialogOpen(false);
                    setEditingMember(null);
                    setNewMemberName('');
                  }}
                >
                  取消
                </Button>
                <Button onClick={handleAddMember} variant="contained" color="primary">
                  {editingMember ? '保存' : '添加'}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              color: '#e91e63'
            }}>
              <FavoriteIcon sx={{ mr: 1 }} /> 硅谷恋人
            </Typography>

            <Grid container spacing={2}>
              {(state.currentUser?.relationships?.[tabValue === 0 ? 'family' : 'love'] || []).map((relation) => {
                const relatedUser = state.users.find(u =>
                  tabValue === 0
                    ? u.id === (relation as FamilyRelationship).memberId
                    : u.id === (relation as LoveRelationship).partnerId
                );
                if (!relatedUser) return null;

                return (
                  <Grid item xs={12} key={relation.id}>
                    <Card sx={{
                      bgcolor: 'rgba(233, 30, 99, 0.05)',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'visible'
                    }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          display: 'flex',
                          gap: 1,
                          zIndex: 10,
                          pointerEvents: 'auto'
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => state.currentUser && handleOpenRelationshipDialog({
                            id: relation.id,
                            person1: {
                              id: state.currentUser.id,
                              name: state.currentUser.name
                            },
                            person2: {
                              id: relatedUser.id,
                              name: relatedUser.name
                            },
                            status: tabValue === 0
                              ? (relation as FamilyRelationship).relationshipType
                              : (relation as LoveRelationship).status,
                            description: relation.description || ''
                          })}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => state.currentUser && handleDeleteRelationship(relation.id, state.currentUser.id)}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                          position="relative"
                          sx={{ mt: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: getAvatarColor(state.currentUser?.name || ''),
                              width: 56,
                              height: 56
                            }}
                          >
                            {state.currentUser?.name?.[0] || '?'}
                          </Avatar>

                          <FavoriteIcon
                            sx={{
                              color: '#e91e63',
                              animation: 'pulse 1.5s infinite',
                              '@keyframes pulse': {
                                '0%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.2)' },
                                '100%': { transform: 'scale(1)' },
                              }
                            }}
                          />

                          <Avatar
                            sx={{
                              bgcolor: getAvatarColor(relatedUser.name),
                              width: 56,
                              height: 56
                            }}
                          >
                            {relatedUser.name[0]}
                          </Avatar>
                        </Stack>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          <Typography variant="body1" gutterBottom>
                            {state.currentUser?.name} ♥ {relatedUser.name}
                          </Typography>
                          <Chip
                            label={tabValue === 0
                              ? (relation as FamilyRelationship).relationshipType
                              : (relation as LoveRelationship).status
                            }
                            color="primary"
                            size="small"
                            sx={{
                              bgcolor: '#e91e63',
                              '& .MuiChip-label': { color: 'white' }
                            }}
                          />
                          {relation.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {relation.description}
                            </Typography>
                          )}
                        </Box>

                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {/* 添加恋爱关系按钮 */}
            <Fab
              color="secondary"
              aria-label="添加恋爱关系"
              sx={{
                position: 'fixed',
                bottom: 80,
                right: 16,
              }}
              onClick={() => handleOpenRelationshipDialog()}
            >
              <AddIcon />
            </Fab>
            {/* 添加/编辑恋爱关系对话框 */}
            <Dialog
              open={relationshipDialogOpen}
              onClose={handleCloseRelationshipDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle sx={{ color: '#e91e63' }}>
                <FavoriteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {editingRelationship ? '编辑恋爱关系' : '添加恋爱关系'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    select
                    label="成员1"
                    value={relationshipFormData.person1.id}
                    onChange={(e) => {
                      const selectedUser = state.users?.find(u => u.id === e.target.value);
                      setRelationshipFormData(prev => ({
                        ...prev,
                        person1: {
                          id: selectedUser?.id || '',
                          name: selectedUser?.name || ''
                        }
                      }));
                    }}
                    fullWidth
                  >
                    {state.users?.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="关系状态"
                    value={relationshipFormData.status}
                    onChange={(e) => setRelationshipFormData(prev => ({
                      ...prev,
                      status: e.target.value
                    }))}
                    fullWidth
                  >
                    {RELATIONSHIP_STATUSES.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="成员2"
                    value={relationshipFormData.person2.id}
                    onChange={(e) => {
                      const selectedUser = state.users?.find(u => u.id === e.target.value);
                      setRelationshipFormData(prev => ({
                        ...prev,
                        person2: {
                          id: selectedUser?.id || '',
                          name: selectedUser?.name || ''
                        }
                      }));
                    }}
                    fullWidth
                  >
                    {state.users?.filter(u => u.id !== relationshipFormData.person1.id).map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </TextField>



                  <TextField
                    label="关系描述"
                    multiline
                    rows={4}
                    value={relationshipFormData.description}
                    onChange={(e) => setRelationshipFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    fullWidth
                    placeholder="请描述一下这段关系..."
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRelationshipDialog}>取消</Button>
                <Button
                  onClick={handleSaveRelationship}
                  variant="contained"
                  color="secondary"
                  disabled={!relationshipFormData.person1.id || !relationshipFormData.person2.id}
                >
                  {editingRelationship ? '保存' : '创建'}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </PageLayout>
  );
};
