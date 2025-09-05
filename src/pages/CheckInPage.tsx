import {
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckIcon,
  Comment as CommentIcon,
  Construction as ConstructionIcon,
  ExpandMore as ExpandMoreIcon,
  FileDownload as ExportIcon,
  FlashOn as FlashIcon,
  Help as HelpIcon,
  Notifications as NotificationIcon,
  CloudOff as OfflineIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import PageLayout from '../components/PageLayout';

export default function CheckInPage() {
  const upcomingFeatures = [
    {
      icon: <StarIcon color="warning" />,
      title: "任务状态增强",
      description: "扩展任务状态管理，支持更多细分状态如：待审核、已暂停、重新分配等，让任务流程更加精细化管理。用户可以更准确地跟踪任务的每个阶段。",
      status: "即将支持"
    },
    {
      icon: <StarIcon color="error" />,
      title: "任务优先级",
      description: "为任务设置高、中、低优先级标识，帮助团队成员识别紧急任务和重要任务。支持优先级排序和筛选，确保重要任务优先处理。",
      status: "即将支持"
    },
    {
      icon: <CommentIcon color="primary" />,
      title: "任务评论功能",
      description: "在任务详情中添加评论系统，团队成员可以就具体任务进行讨论、提问和反馈。支持@提及功能，促进团队协作交流。",
      status: "即将支持"
    },
    {
      icon: <UploadIcon color="info" />,
      title: "文件上传",
      description: "支持在任务中上传相关文件、图片、文档等附件。方便团队共享工作资料，如设计稿、需求文档、截图等，提高工作效率。",
      status: "即将支持"
    },
    {
      icon: <TimeIcon color="success" />,
      title: "工作时间记录",
      description: "自动记录或手动输入任务工作时长，生成时间统计报表。帮助团队了解任务实际耗时，优化时间分配和项目预估。",
      status: "即将支持"
    },
    {
      icon: <FlashIcon color="secondary" />,
      title: "快速操作",
      description: "提供批量操作功能，如批量分配任务、批量修改状态、快速创建模板任务等。减少重复操作，提升管理效率。",
      status: "即将支持"
    },
    {
      icon: <NotificationIcon color="warning" />,
      title: "简单提醒功能",
      description: "基于任务截止时间的智能提醒系统，支持邮件、系统通知等多种提醒方式。确保重要任务不会被遗忘，提高执行效率。",
      status: "即将支持"
    },
    {
      icon: <CalendarIcon color="primary" />,
      title: "团队日历视图",
      description: "以日历形式展示团队所有任务的时间安排，直观查看任务分布和冲突。支持月视图、周视图，便于团队协调和资源安排。",
      status: "即将支持"
    },
    {
      icon: <ExportIcon color="info" />,
      title: "数据导出",
      description: "支持将任务数据、统计报表导出为Excel、PDF等格式。方便生成工作报告、绩效分析和项目总结文档。",
      status: "即将支持"
    },
    {
      icon: <OfflineIcon color="action" />,
      title: "离线模式",
      description: "在无网络环境下也能查看已缓存的任务信息，并支持离线打卡。网络恢复后自动同步数据，确保工作不受网络影响。",
      status: "即将支持"
    }
  ];

  return (
    <PageLayout maxWidth="sm">
      {/* 页面标题 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}>
          📋 任务打卡
        </Typography>
        <Typography variant="body2" color="text.secondary">
          记录工作进度，跟踪任务完成情况
        </Typography>
      </Box>

      {/* 当前状态卡片 */}
      <Paper sx={{ p: 3, mb: 3, textAlign: 'center', borderRadius: 2 }}>
        <ConstructionIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, color: 'warning.main' }}>
          功能开发中
        </Typography>
        <Typography variant="body2" color="text.secondary">
          打卡功能正在紧锣密鼓地开发中，敬请期待！
        </Typography>
      </Paper>

      {/* 即将支持的功能 */}
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            🚀 即将支持的功能
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          以下功能正在开发中，将陆续上线，敬请期待！
        </Typography>

        {upcomingFeatures.map((feature, index) => (
          <Accordion key={index} sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary
              expandIcon={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HelpIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <ExpandMoreIcon />
                </Box>
              }
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2,
                }
              }}
            >
              {feature.icon}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {feature.title}
                </Typography>
              </Box>
              <Chip
                label={feature.status}
                size="small"
                color="primary"
                variant="outlined"
              />
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {feature.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            💡 这些功能将让任务管理更加智能和高效
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            点击功能名称右侧的 ❓ 查看详细说明
          </Typography>
        </Box>
      </Paper>

      {/* 底部导航 */}
    </PageLayout>
  );
}
