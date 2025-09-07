import type { User, Task, CheckIn, Team } from '../types';

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '小宋',
    avatar: '',
    role: 'admin',
    joinDate: new Date('2024-01-15'),
    email: 'xiaosong@example.com',
    phone: '13800138001',
    relationships: {
      family: [
        {
          id: 'fam1',
          memberId: 'user2',
          relationshipType: '兄弟',
          description: '同一个创业团队的兄弟'
        }
      ],
      love: [
        {
          id: 'love1',
          partnerId: 'user4',
          status: 'dating',
          description: '在一起创业的恋人'
        }
      ]
    }
  },
  {
    id: 'user2',
    name: '辉哥',
    avatar: '',
    role: 'member',
    joinDate: new Date('2024-04-04'),
    email: 'huige@example.com',
    phone: '13800138002',
    relationships: {
      family: [
        {
          id: 'fam2',
          memberId: 'user1',
          relationshipType: '兄弟',
          description: '创业团队中的好兄弟'
        }
      ]
    }
  },
  {
    id: 'user3',
    name: '倍倍',
    avatar: '',
    role: 'member',
    joinDate: new Date('2025-09-03'),
    email: 'beibei@example.com',
    phone: '13800138003',
  },
  {
    id: 'user4',
    name: '小甜',
    avatar: '',
    role: 'member',
    joinDate: new Date('2025-09-03'),
    email: 'xiaotian@example.com',
    phone: '13800138004',
    relationships: {
      love: [
        {
          id: 'love2',
          partnerId: 'user1',
          status: 'dating',
          description: '一起打造硅谷农场的恋人'
        }
      ]
    }
  },
  {
    id: 'user5',
    name: '谷哥',
    avatar: '',
    role: 'member',
    joinDate: new Date('2025-09-03'),
    email: 'guge@example.com',
    phone: '13800138005',
  },
  {
    id: 'user6',
    name: '谷妹',
    avatar: '',
    role: 'admin',
    joinDate: new Date('2025-09-03'),
    email: 'gumei@example.com',
    phone: '13800138006',
  },
  {
    id: 'user7',
    name: '黎子',
    avatar: '',
    role: 'admin',
    joinDate: new Date('2025-09-03'),
    email: 'lizi@example.com',
    phone: '13800138007',
  },
  {
    id: 'user8',
    name: '八戒',
    avatar: '',
    role: 'member',
    joinDate: new Date('2025-09-03'),
    email: 'bajie@example.com',
    phone: '13800138008',
  },
  {
    id: 'user9',
    name: '葡萄',
    avatar: '',
    role: 'member',
    joinDate: new Date('2025-09-03'),
    email: 'putao@example.com',
    phone: '13800138009',
  },
  {
    id: 'user10',
    name: '洋葱',
    avatar: '',
    role: 'couple',
    joinDate: new Date('2024-02-15'),
    email: 'yangcong@example.com',
    phone: '13800138010',
  },
  {
    id: 'user11',
    name: '冰冰',
    avatar: '',
    role: 'couple',
    joinDate: new Date('2024-02-15'),
    email: 'bingbing@example.com',
    phone: '13800138011',
  },
  {
    id: 'user12',
    name: '叮叮组',
    avatar: '',
    role: 'couple',
    joinDate: new Date('2024-02-10'),
    email: 'dingdingzu@example.com',
    phone: '13800138012',
  },
];

// 模拟任务数据
export const mockTasks: Task[] = [];

// 模拟打卡记录
export const mockCheckIns: CheckIn[] = [];

// 模拟团队数据
export const mockTeams: Team[] = [
  {
    id: 'team1',
    name: '乡村硅谷农业合作社',
    description: '致力于现代化农业技术与传统农业相结合的新型农业组织',
    members: mockUsers,
    admins: ['user1'],
    createdAt: new Date('2024-01-01'),
    settings: {
      allowMemberInvite: false,
      requireLocationForCheckIn: true,
      requirePhotoForCheckIn: false,
    },
  },
];

// 每日励志语录
export const dailyQuotes = [
  "今天的汗水，是明天的收获",
  "坚持就是胜利，每一步都在向目标靠近",
  "用心播种，必有收获",
  "创新思维，让农业更智慧",
  "团结就是力量，合作创造未来",
  "生活乱七八糟，我要多点花招",
  "心中有阳光，脚下有力量",
  "让梦想在田野中生长",
  "科技助力，让农业更美好",
  "用双手创造乡村硅谷的未来"
];

// 获取当前用户（模拟登录状态）
export function getCurrentUser(): User {
  return mockUsers[0]; // 默认返回管理员用户
}

// 初始化应用数据
export function initializeAppData() {
  // 尝试从localStorage加载用户数据，如果没有则使用默认数据（包含最新添加的用户）
  const savedUsersJson = localStorage.getItem('appUsers');
  const users = savedUsersJson ? JSON.parse(savedUsersJson) : mockUsers;
  
  // 确保日期对象和关系数据正确恢复
  const processedUsers = users.map((user: any) => ({
    ...user,
    joinDate: new Date(user.joinDate),
    relationships: user.relationships || { family: [], love: [] }
  }));
  
  return {
    currentUser: getCurrentUser(),
    users: processedUsers,
    tasks: [], // 返回空任务列表
    checkIns: [], // 返回空打卡记录
    teams: mockTeams,
  };
}
