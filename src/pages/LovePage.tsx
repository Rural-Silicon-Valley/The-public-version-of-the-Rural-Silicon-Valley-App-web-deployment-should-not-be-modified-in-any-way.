import {
  Add as AddIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useApp } from '../context/AppContext';

interface Relationship {
  id: string;
  person1: {
    id: string;
    name: string;
  };
  person2: {
    id: string;
    name: string;
  };
  status: string;
  description: string;
}

// 生成头像颜色
const getAvatarColor = (name: string) => {
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return colors[hash % colors.length];
};

const RELATIONSHIP_STATUSES = [
  '恋爱中',
  '已订婚',
  '已结婚',
  '热恋期',
  '甜蜜期'
];

const LovePage = () => {
  const { state } = useApp();
  const [open, setOpen] = useState(false);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [editingRelationship, setEditingRelationship] = useState<Relationship | null>(null);
  const [formData, setFormData] = useState<Omit<Relationship, 'id'>>({
    person1: { id: '', name: '' },
    person2: { id: '', name: '' },
    status: RELATIONSHIP_STATUSES[0],
    description: ''
  });

  const handleOpenDialog = (relationship?: Relationship) => {
    if (relationship) {
      setEditingRelationship(relationship);
      setFormData(relationship);
    } else {
      setEditingRelationship(null);
      setFormData({
        person1: { id: '', name: '' },
        person2: { id: '', name: '' },
        status: RELATIONSHIP_STATUSES[0],
        description: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRelationship(null);
  };

  const handleSave = () => {
    if (editingRelationship) {
      setRelationships(relationships.map(rel =>
        rel.id === editingRelationship.id
          ? { ...formData, id: editingRelationship.id }
          : rel
      ));
    } else {
      const newRelationship = {
        ...formData,
        id: Date.now().toString(),
      };
      setRelationships([...relationships, newRelationship]);
    }
    handleClose();
  };

  return (
    <PageLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          color: '#e91e63'
        }}>
          <FavoriteIcon sx={{ mr: 1 }} /> 硅谷恋人
        </Typography>

        <Grid container spacing={2}>
          {relationships.map((relation) => (
            <Box key={relation.id}>
              <Card sx={{
                bgcolor: 'rgba(233, 30, 99, 0.05)',
                borderRadius: 2,
                position: 'relative',
                overflow: 'visible'
              }}>
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Avatar
                      sx={{
                        bgcolor: getAvatarColor(relation.person1.name),
                        width: 56,
                        height: 56
                      }}
                    >
                      {relation.person1.name[0]}
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
                        bgcolor: getAvatarColor(relation.person2.name),
                        width: 56,
                        height: 56
                      }}
                    >
                      {relation.person2.name[0]}
                    </Avatar>
                  </Stack>

                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body1" gutterBottom>
                      {relation.person1.name} ♥ {relation.person2.name}
                    </Typography>
                    <Chip
                      label={relation.status}
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

                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => handleOpenDialog(relation)}
                  >
                    <EditIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>

        <Fab
          color="secondary"
          aria-label="添加恋爱关系"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
          }}
          onClick={() => handleOpenDialog()}
        >
          <AddIcon />
        </Fab>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#e91e63' }}>
            <FavoriteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {editingRelationship ? '编辑恋爱关系' : '添加恋爱关系'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="成员1"
                value={formData.person1.id}
                onChange={(e) => {
                  const selectedUser = state.users?.find(u => u.id === e.target.value);
                  setFormData(prev => ({
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
                value={formData.status}
                onChange={(e) => setFormData(prev => ({
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
                value={formData.person2.id}
                onChange={(e) => {
                  const selectedUser = state.users?.find(u => u.id === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    person2: {
                      id: selectedUser?.id || '',
                      name: selectedUser?.name || ''
                    }
                  }));
                }}
                fullWidth
              >
                {state.users?.filter(u => u.id !== formData.person1.id).map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>



              <TextField
                label="关系描述"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                fullWidth
                placeholder="请描述一下这段关系..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="secondary"
              disabled={!formData.person1.id || !formData.person2.id}
            >
              {editingRelationship ? '保存' : '创建'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageLayout>
  );
};

export default LovePage;
