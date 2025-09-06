# 乡村硅谷任务打卡应用

一个专为小型集体组织设计的多人员任务管理和打卡系统，采用现代化专业设计，提供完整的任务创建、分配、跟踪和统计功能。

## 🚀 项目特色

- **移动端优先设计** - 响应式界面，完美适配各种设备
- **现代化专业界面** - 使用Material Design设计语言，蓝色主题
- **完整用户管理** - 多用户角色系统，智能身份选择
- **全面任务管理** - 任务创建、分配、打卡、进度跟踪
- **详细数据统计** - 用户绩效排行、任务分布、活动趋势分析
- **实时更新** - 基于React Context的状态管理，数据实时同步

## 🌐 部署状态

- **当前状态**: ✅ 已成功部署
- **访问地址**: [http://116.62.56.214](http://116.62.56.214)
- **部署方式**: 手动部署（详细步骤见 `MANUAL-DEPLOY.md`）

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Material-UI (MUI)
- **图标系统**: Material Design Icons
- **状态管理**: React Context API
- **自动部署**: GitHub Actions + 阿里云 (待修复)
- **路由管理**: React Router v6
- **样式方案**: CSS-in-JS + 响应式设计

## 📦 安装和运行

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

## 🏗️ 项目结构

```text
src/
├── components/          # 通用组件
│   ├── AnimatedForestBackground.tsx  # 动画背景
│   ├── BottomNav.tsx               # 底部导航
│   ├── TaskBottomNav.tsx           # 任务导航
│   └── TaskCard.tsx                # 任务卡片
├── context/            # 全局状态管理
│   └── AppContext.tsx             # 应用上下文
├── hooks/              # 自定义Hooks
│   └── index.ts                   # Hook集合
├── pages/              # 页面组件
│   ├── CreateTaskPage.tsx         # 任务创建页
│   ├── HomePage.tsx               # 首页
│   ├── NewUserSelectionPage.tsx   # 新用户选择
│   ├── ProfilePage.tsx            # 个人资料页
│   ├── StatisticsPage.tsx         # 数据统计页
│   └── UserSelectionPage.tsx      # 用户选择页
├── types/              # TypeScript类型定义
│   └── index.ts                   # 类型集合
├── utils/              # 工具函数
│   └── mockData.ts                # 模拟数据
└── theme.ts            # 主题配置
```

## ✨ 核心功能

### 用户管理

- 多用户角色系统（管理员/普通成员）
- 智能用户选择界面
- 个人资料展示和管理
- 本地存储用户状态

### 任务管理

- 直观的任务创建界面
- 任务分配和截止时间设置
- 任务状态跟踪（待完成/已完成）
- 实时任务列表更新

### 数据统计

- 用户绩效排行榜
- 任务完成率统计
- 任务分布饼图
- 7天活动趋势图

### 界面特性

- 响应式设计，完美适配移动端
- Material Design现代化界面
- 专业蓝色主题配色
- 流畅的动画效果

## 🔧 开发说明

### 代码规范

- 使用TypeScript严格模式
- 遵循React Hooks最佳实践
- 组件采用函数式编程风格
- CSS-in-JS样式管理

### 状态管理

使用React Context API进行全局状态管理，主要包括：

- 用户信息状态
- 任务列表状态  
- 统计数据状态

### 路由配置

使用React Router v6，支持：

- 路由保护（未登录跳转）
- 动态路由参数
- 嵌套路由结构

## � 使用指南

1. **首次使用**: 访问应用后选择您的身份角色
2. **创建任务**: 在任务中心创建新任务并分配给团队成员
3. **任务打卡**: 完成任务后进行打卡确认
4. **查看统计**: 在统计分析页面查看详细数据报告

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📄 许可证

本项目采用MIT许可证，详见 LICENSE 文件。
