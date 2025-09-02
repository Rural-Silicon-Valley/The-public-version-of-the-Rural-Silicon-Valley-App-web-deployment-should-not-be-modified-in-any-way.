import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Task, CheckIn, Team } from '../types';
import { initializeAppData } from '../utils/mockData';

// 应用状态接口
interface AppState {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  checkIns: CheckIn[];
  teams: Team[];
  loading: boolean;
  error: string | null;
}

// 动作类型
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_CHECKINS'; payload: CheckIn[] }
  | { type: 'ADD_CHECKIN'; payload: CheckIn }
  | { type: 'SET_TEAMS'; payload: Team[] }
  | { type: 'ADD_TEAM'; payload: Team }
  | { type: 'UPDATE_TEAM'; payload: Team };

// 初始状态
const initialState: AppState = {
  currentUser: null,
  users: [],
  tasks: [],
  checkIns: [],
  teams: [],
  loading: false,
  error: null,
};

// 状态管理 reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'SET_USERS':
      return { ...state, users: action.payload };
    
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser,
      };
    
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        currentUser: state.currentUser?.id === action.payload ? null : state.currentUser,
      };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'SET_CHECKINS':
      return { ...state, checkIns: action.payload };
    
    case 'ADD_CHECKIN':
      return { ...state, checkIns: [...state.checkIns, action.payload] };
    
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.payload] };
    
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(team => 
          team.id === action.payload.id ? action.payload : team
        ),
      };
    
    default:
      return state;
  }
}

// 创建上下文
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// 上下文提供者组件
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 初始化数据
  useEffect(() => {
    const data = initializeAppData();
    
    // 检查本地存储中是否有已选择的用户
    const savedUserId = localStorage.getItem('selectedUserId');
    let currentUser = null;
    
    if (savedUserId) {
      // 从用户列表中查找已保存的用户
      currentUser = data.users.find(user => user.id === savedUserId) || null;
    }
    
    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
    dispatch({ type: 'SET_USERS', payload: data.users });
    dispatch({ type: 'SET_TASKS', payload: data.tasks });
    dispatch({ type: 'SET_CHECKINS', payload: data.checkIns });
    dispatch({ type: 'SET_TEAMS', payload: data.teams });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 自定义 hook 来使用上下文
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
