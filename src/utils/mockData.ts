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
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: '晨间果园巡视',
    description: '检查果园的苹果树生长情况，记录病虫害和浇水需求',
    createdBy: 'user1',
    assignedTo: ['user2', 'user3'],
    dueDate: new Date(new Date().setHours(8, 0, 0, 0)), // 今天早上8点
    status: 'in-progress',
    priority: 'high',
    tags: ['果园', '巡视', '苹果'],
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-08-30'),
  },
  {
    id: 'task2',
    title: '蔬菜大棚温度监测',
    description: '每日早晚两次检查大棚内温度，确保蔬菜正常生长',
    createdBy: 'user1',
    assignedTo: ['user2', 'user4'],
    dueDate: new Date(new Date().setHours(18, 0, 0, 0)), // 今天晚上6点
    status: 'pending',
    priority: 'medium',
    tags: ['大棚', '温度', '蔬菜'],
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-08-30'),
  },
  {
    id: 'task3',
    title: '鸡舍清洁与喂食',
    description: '清洁鸡舍卫生，为鸡群添加饲料和清水',
    createdBy: 'user1',
    assignedTo: ['user3'],
    dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 明天
    status: 'pending',
    priority: 'high',
    tags: ['鸡舍', '清洁', '喂食'],
    createdAt: new Date('2024-08-28'),
    updatedAt: new Date('2024-08-30'),
  },
  {
    id: 'task4',
    title: '农具维护检修',
    description: '检查和维护农用工具，确保设备正常运行',
    createdBy: 'user1',
    assignedTo: ['user2', 'user3', 'user4'],
    dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 后天
    status: 'pending',
    priority: 'low',
    tags: ['农具', '维护', '检修'],
    createdAt: new Date('2024-08-29'),
    updatedAt: new Date('2024-08-30'),
  },
  {
    id: 'task5',
    title: '有机肥料配制',
    description: '按照配方调配有机肥料，为下周的施肥做准备',
    createdBy: 'user1',
    assignedTo: ['user4'],
    dueDate: new Date('2024-09-05'),
    status: 'completed',
    priority: 'medium',
    tags: ['肥料', '有机', '配制'],
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-08-25'),
  },
];

// 模拟打卡记录
export const mockCheckIns: CheckIn[] = [
  {
    id: 'checkin1',
    taskId: 'task1',
    userId: 'user2',
    timestamp: new Date(new Date().setHours(8, 15, 0, 0)), // 今天早上8:15
    location: {
      latitude: 39.9042,
      longitude: 116.4074,
      address: '北京市朝阳区某某农场果园区',
    },
    photo: '',
    note: '果园情况良好，发现部分苹果树需要补水',
    status: 'late', // 迟到了15分钟
  },
  {
    id: 'checkin2',
    taskId: 'task5',
    userId: 'user4',
    timestamp: new Date('2024-08-25T10:30:00'),
    location: {
      latitude: 39.9042,
      longitude: 116.4074,
      address: '北京市朝阳区某某农场仓库',
    },
    photo: '',
    note: '已按配方完成有机肥料配制，质量良好',
    status: 'success',
  },
  {
    id: 'checkin3',
    taskId: 'task1',
    userId: 'user3',
    timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 昨天
    location: {
      latitude: 39.9042,
      longitude: 116.4074,
      address: '北京市朝阳区某某农场果园区',
    },
    photo: '',
    note: '巡视完成，记录了需要处理的问题',
    status: 'success',
  },
];

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
    tasks: mockTasks,
    checkIns: mockCheckIns,
    teams: mockTeams,
  };
}
