import { Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// 生成用户头像颜色
function generateAvatarColor(name: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function UserSelectionPage() {
  const users = [
    { id: 1, name: '张三', role: '项目经理', avatar: '' },
    { id: 2, name: '李四', role: '开发工程师', avatar: '' },
    { id: 3, name: '王五', role: '测试工程师', avatar: '' },
    { id: 4, name: '赵六', role: '产品经理', avatar: '' },
  ];

  const handleUserSelect = (user: any) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    alert(`已选择用户: ${user.name} (${user.role})`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f8f0', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'primary.main', mb: 3, textAlign: 'center' }}>
        选择您的身份
      </Typography>
      
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
        请选择您在团队中的角色，系统将根据您的身份提供相应的功能和权限
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 3, 
        maxWidth: 900, 
        margin: '0 auto',
        mb: 4
      }}>
        {users.map(user => (
          <Card 
            key={user.id} 
            sx={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
              }
            }}
            onClick={() => handleUserSelect(user)}
          >
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 20px',
                  bgcolor: generateAvatarColor(user.name),
                  fontSize: '28px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ mb: 1, color: 'text.primary', fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'medium',
                  fontSize: '1.1rem'
                }}
              >
                {user.role}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button 
          component={Link} 
          to="/" 
          variant="outlined" 
          size="large"
          sx={{ minWidth: 120 }}
        >
          返回首页
        </Button>
      </Box>
    </Box>
  );
}

export default UserSelectionPage;
