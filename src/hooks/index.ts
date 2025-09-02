import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { Task, CheckIn } from '../types';

// 获取用户任务的自定义hook
export function useUserTasks(userId?: string) {
  const { state } = useApp();
  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!userId) return;
    
    const tasks = state.tasks.filter(task => 
      task.assignedTo.includes(userId) || task.createdBy === userId
    );
    setUserTasks(tasks);
  }, [state.tasks, userId]);

  return userTasks;
}

// 获取任务打卡记录的自定义hook
export function useTaskCheckIns(taskId: string) {
  const { state } = useApp();
  const [taskCheckIns, setTaskCheckIns] = useState<CheckIn[]>([]);

  useEffect(() => {
    const checkIns = state.checkIns.filter(checkIn => checkIn.taskId === taskId);
    setTaskCheckIns(checkIns);
  }, [state.checkIns, taskId]);

  return taskCheckIns;
}

// 获取用户统计数据的自定义hook
export function useUserStats(userId?: string) {
  const { state } = useApp();
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    onTimeCheckIns: 0,
    lateCheckIns: 0,
    streakDays: 0,
    punctualityRate: 0,
  });

  useEffect(() => {
    if (!userId) return;

    const userCheckIns = state.checkIns.filter(checkIn => checkIn.userId === userId);
    const totalCheckIns = userCheckIns.length;
    const onTimeCheckIns = userCheckIns.filter(checkIn => checkIn.status === 'success').length;
    const lateCheckIns = userCheckIns.filter(checkIn => checkIn.status === 'late').length;
    const punctualityRate = totalCheckIns > 0 ? (onTimeCheckIns / totalCheckIns) * 100 : 0;

    // 计算连续打卡天数
    const sortedCheckIns = userCheckIns
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    let streakDays = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCheckIns.length; i++) {
      const checkInDate = new Date(sortedCheckIns[i].timestamp);
      checkInDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streakDays++;
      } else {
        break;
      }
    }

    setStats({
      totalCheckIns,
      onTimeCheckIns,
      lateCheckIns,
      streakDays,
      punctualityRate: Math.round(punctualityRate),
    });
  }, [state.checkIns, userId]);

  return stats;
}

// 检查是否为移动设备的自定义hook
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}

// 本地存储管理的自定义hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
