// 用户类型定义
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member' | 'couple';
  joinDate: Date;
  email?: string;
  phone?: string;
  relationships?: {
    family?: FamilyRelationship[];
    love?: LoveRelationship[];
  };
}

// 家庭关系类型定义
export interface FamilyRelationship {
  id: string;
  memberId: string;
  relationshipType: string;
  description?: string;
}

// 恋爱关系类型定义
export interface LoveRelationship {
  id: string;
  partnerId: string;
  status: 'dating' | 'engaged' | 'married';
  description?: string;
}

// 任务类型定义
export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string[];
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 打卡记录类型定义
export interface CheckIn {
  id: string;
  taskId: string;
  userId: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  photo?: string;
  note?: string;
  status: 'success' | 'late' | 'incomplete';
}

// 团队/集体类型定义
export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  admins: string[];
  createdAt: Date;
  settings: {
    allowMemberInvite: boolean;
    requireLocationForCheckIn: boolean;
    requirePhotoForCheckIn: boolean;
  };
}

// 任务统计类型定义
export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
}

// 用户统计类型定义
export interface UserStats {
  totalCheckIns: number;
  onTimeCheckIns: number;
  lateCheckIns: number;
  streakDays: number;
  punctualityRate: number;
}
