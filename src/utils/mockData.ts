import type { User, Task, CheckIn, Team } from '../types';

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '张小明',
    avatar: '',
    role: 'admin',
    joinDate: new Date('2024-01-15'),
    email: 'zhangxiaoming@example.com',
    phone: '13800138001',
  },
  {
    id: 'user2',
    name: '李小红',
    avatar: '',
    role: 'member',
    joinDate: new Date('2024-02-01'),
    email: 'lixiaohong@example.com',
    phone: '13800138002',
  },
  {
    id: 'user3',
    name: '王小强',
    avatar: '',
    role: 'member',
    joinDate: new Date('2024-02-10'),
    email: 'wangxiaoqiang@example.com',
    phone: '13800138003',
  },
  {
    id: 'user4',
    name: '赵小丽',
    avatar: '',
    role: 'member',
    joinDate: new Date('2024-02-15'),
    email: 'zhaoxiaoli@example.com',
    phone: '13800138004',
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
  return {
    currentUser: getCurrentUser(),
    users: mockUsers,
    tasks: mockTasks,
    checkIns: mockCheckIns,
    teams: mockTeams,
  };
}
