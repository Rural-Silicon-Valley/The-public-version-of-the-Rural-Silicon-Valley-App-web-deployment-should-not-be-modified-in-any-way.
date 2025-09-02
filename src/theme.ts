import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// 自定义调色板
const palette = {
  primary: {
    main: '#4CAF50', // 主绿色（树木主题）
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#fff',
  },
  secondary: {
    main: '#8BC34A', // 浅绿色
    light: '#AED581',
    dark: '#689F38',
    contrastText: '#fff',
  },
  success: {
    main: '#66BB6A',
    light: '#A5D6A7',
    dark: '#43A047',
  },
  warning: {
    main: '#FFA726',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  error: {
    main: '#EF5350',
    light: '#E57373',
    dark: '#C62828',
  },
  background: {
    default: '#F1F8E9', // 浅绿背景
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2E7D32',
    secondary: '#558B2F',
  },
};

// 半卡通风格的主题配置
const themeOptions: ThemeOptions = {
  palette,
  typography: {
    fontFamily: '"Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: palette.primary.dark,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: palette.primary.dark,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: palette.primary.main,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: palette.primary.main,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16, // 圆润的边角，符合卡通风格
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: `linear-gradient(45deg, ${palette.primary.main}, ${palette.primary.light})`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(76, 175, 80, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: palette.primary.light,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(76, 175, 80, 0.4)',
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

// 3D树林卡通风格背景样式
export const treeBackgroundStyle = {
  background: `
    /* 天空渐变背景 */
    linear-gradient(180deg, 
      #87CEEB 0%,    /* 天蓝色 */
      #B0E0E6 50%,   /* 粉蓝色 */
      #F0F8FF 100%   /* 浅蓝白 */
    )
  `,
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative' as const,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      /* SVG 3D 树木 */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='tree1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23228B22'/%3E%3Cstop offset='50%25' style='stop-color:%234CAF50'/%3E%3Cstop offset='100%25' style='stop-color:%23006400'/%3E%3C/linearGradient%3E%3ClinearGradient id='trunk1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23DEB887'/%3E%3Cstop offset='50%25' style='stop-color:%23D2B48C'/%3E%3Cstop offset='100%25' style='stop-color:%23A0522D'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(50,200)'%3E%3Crect x='18' y='0' width='14' height='40' fill='url(%23trunk1)' rx='2'/%3E%3Cellipse cx='25' cy='-10' rx='30' ry='35' fill='url(%23tree1)' opacity='0.9'/%3E%3Cellipse cx='25' cy='-25' rx='25' ry='30' fill='url(%23tree1)' opacity='0.8'/%3E%3Cellipse cx='25' cy='-35' rx='20' ry='25' fill='url(%23tree1)' opacity='0.9'/%3E%3C/g%3E%3Cg transform='translate(150,180)'%3E%3Crect x='15' y='0' width='18' height='50' fill='url(%23trunk1)' rx='3'/%3E%3Cellipse cx='24' cy='-15' rx='35' ry='40' fill='url(%23tree1)' opacity='0.9'/%3E%3Cellipse cx='24' cy='-30' rx='30' ry='35' fill='url(%23tree1)' opacity='0.8'/%3E%3Cellipse cx='24' cy='-45' rx='25' ry='30' fill='url(%23tree1)' opacity='0.9'/%3E%3C/g%3E%3Cg transform='translate(280,190)'%3E%3Crect x='16' y='0' width='16' height='45' fill='url(%23trunk1)' rx='2'/%3E%3Cellipse cx='24' cy='-12' rx='32' ry='38' fill='url(%23tree1)' opacity='0.9'/%3E%3Cellipse cx='24' cy='-28' rx='27' ry='32' fill='url(%23tree1)' opacity='0.8'/%3E%3Cellipse cx='24' cy='-40' rx='22' ry='27' fill='url(%23tree1)' opacity='0.9'/%3E%3C/g%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Cdefs%3E%3ClinearGradient id='tree2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2332CD32'/%3E%3Cstop offset='50%25' style='stop-color:%2398FB98'/%3E%3Cstop offset='100%25' style='stop-color:%23228B22'/%3E%3C/linearGradient%3E%3ClinearGradient id='trunk2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'/%3E%3Cstop offset='0%25' style='stop-color:%23CD853F'/%3E%3Cstop offset='100%25' style='stop-color:%238B4513'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(30,150)'%3E%3Crect x='12' y='0' width='12' height='30' fill='url(%23trunk2)' rx='2'/%3E%3Cellipse cx='18' cy='-8' rx='25' ry='28' fill='url(%23tree2)' opacity='0.85'/%3E%3Cellipse cx='18' cy='-20' rx='20' ry='23' fill='url(%23tree2)' opacity='0.9'/%3E%3C/g%3E%3Cg transform='translate(120,140)'%3E%3Crect x='14' y='0' width='14' height='35' fill='url(%23trunk2)' rx='2'/%3E%3Cellipse cx='21' cy='-10' rx='28' ry='32' fill='url(%23tree2)' opacity='0.85'/%3E%3Cellipse cx='21' cy='-25' rx='23' ry='27' fill='url(%23tree2)' opacity='0.9'/%3E%3C/g%3E%3Cg transform='translate(220,135)'%3E%3Crect x='13' y='0' width='13' height='32' fill='url(%23trunk2)' rx='2'/%3E%3Cellipse cx='19.5' cy='-9' rx='26' ry='30' fill='url(%23tree2)' opacity='0.85'/%3E%3Cellipse cx='19.5' cy='-22' rx='21' ry='25' fill='url(%23tree2)' opacity='0.9'/%3E%3C/g%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Cdefs%3E%3ClinearGradient id='tree3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2366BB6A'/%3E%3Cstop offset='50%25' style='stop-color:%234CAF50'/%3E%3Cstop offset='100%25' style='stop-color:%23388E3C'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(40,120)'%3E%3Crect x='8' y='0' width='8' height='20' fill='%238D6E63' rx='1'/%3E%3Cellipse cx='12' cy='-5' rx='18' ry='20' fill='url(%23tree3)' opacity='0.8'/%3E%3C/g%3E%3Cg transform='translate(100,115)'%3E%3Crect x='9' y='0' width='9' height='22' fill='%238D6E63' rx='1'/%3E%3Cellipse cx='13.5' cy='-6' rx='20' ry='22' fill='url(%23tree3)' opacity='0.8'/%3E%3C/g%3E%3Cg transform='translate(160,110)'%3E%3Crect x='7' y='0' width='7' height='18' fill='%238D6E63' rx='1'/%3E%3Cellipse cx='10.5' cy='-4' rx='16' ry='18' fill='url(%23tree3)' opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")
    `,
    backgroundSize: '800px 600px, 600px 400px, 400px 300px',
    backgroundPosition: 'left bottom, center bottom, right bottom',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
    animation: 'treeSway 6s ease-in-out infinite',
    zIndex: 1,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      /* 云朵 */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3Cdefs%3E%3ClinearGradient id='cloud1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFFFFF' stop-opacity='0.9'/%3E%3Cstop offset='100%25' style='stop-color:%23F0F8FF' stop-opacity='0.7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='25' cy='25' rx='15' ry='10' fill='url(%23cloud1)'/%3E%3Cellipse cx='35' cy='20' rx='12' ry='8' fill='url(%23cloud1)'/%3E%3Cellipse cx='45' cy='25' rx='10' ry='7' fill='url(%23cloud1)'/%3E%3Cellipse cx='55' cy='22' rx='8' ry='6' fill='url(%23cloud1)'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40'%3E%3Cellipse cx='20' cy='20' rx='12' ry='8' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='30' cy='15' rx='10' ry='6' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='40' cy='20' rx='8' ry='5' fill='%23FFFFFF' opacity='0.8'/%3E%3C/svg%3E"),
      /* 飞鸟 */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 10'%3E%3Cpath d='M2,5 Q5,2 8,5 Q11,8 14,5 Q17,2 20,5' stroke='%23333' stroke-width='1' fill='none' opacity='0.6'/%3E%3C/svg%3E"),
      /* 太阳 */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cdefs%3E%3CradialGradient id='sun'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700'/%3E%3Cstop offset='100%25' style='stop-color:%23FFA500'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='30' cy='30' r='15' fill='url(%23sun)' opacity='0.8'/%3E%3Cg stroke='%23FFD700' stroke-width='2' opacity='0.6'%3E%3Cline x1='30' y1='5' x2='30' y2='10'/%3E%3Cline x1='30' y1='50' x2='30' y2='55'/%3E%3Cline x1='5' y1='30' x2='10' y2='30'/%3E%3Cline x1='50' y1='30' x2='55' y2='30'/%3E%3Cline x1='11.7' y1='11.7' x2='15.5' y2='15.5'/%3E%3Cline x1='44.5' y1='44.5' x2='48.3' y2='48.3'/%3E%3Cline x1='11.7' y1='48.3' x2='15.5' y2='44.5'/%3E%3Cline x1='44.5' y1='15.5' x2='48.3' y2='11.7'/%3E%3C/g%3E%3C/svg%3E"),
      /* 草地 */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cg fill='%234CAF50' opacity='0.6'%3E%3Cpath d='M5,20 Q7,10 9,20'/%3E%3Cpath d='M15,20 Q17,8 19,20'/%3E%3Cpath d='M25,20 Q27,12 29,20'/%3E%3Cpath d='M35,20 Q37,7 39,20'/%3E%3Cpath d='M45,20 Q47,11 49,20'/%3E%3Cpath d='M55,20 Q57,9 59,20'/%3E%3Cpath d='M65,20 Q67,13 69,20'/%3E%3Cpath d='M75,20 Q77,6 79,20'/%3E%3Cpath d='M85,20 Q87,10 89,20'/%3E%3Cpath d='M95,20 Q97,8 99,20'/%3E%3C/g%3E%3C/svg%3E")
    `,
    backgroundSize: '300px 150px, 200px 100px, 60px 30px, 120px 120px, 100% 40px',
    backgroundPosition: '20% 20%, 80% 15%, 60% 25%, 85% 10%, bottom',
    backgroundRepeat: 'no-repeat, no-repeat, repeat-x, no-repeat, repeat-x',
    animation: 'cloudDrift 15s ease-in-out infinite',
    zIndex: 2,
    pointerEvents: 'none',
  },
  '& > *': {
    position: 'relative',
    zIndex: 3,
  },
};
