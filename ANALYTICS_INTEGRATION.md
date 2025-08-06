# Analytics Integration Guide

## 概述

本指南介绍了如何测试和使用 AnalyticsDashboard.vue 与后端的完整数据流集成。

## 架构概览

```
前端 Vue App → Analytics API → 后端 Spring Boot → Redis Stream → 分析仪表盘
```

### 组件说明

1. **前端 Analytics API** (`src/api/analytics.ts`): 负责与后端通信
2. **全局跟踪服务** (`src/services/globalTracking.ts`): 自动跟踪用户行为
3. **后端控制器**:
   - `TrackingController`: 接收跟踪事件
   - `MetricsController`: 提供分析数据
4. **数据存储**: Redis Stream 存储跟踪事件

## 数据流过程

### 1. 事件发送流程

```
用户交互 → globalTracking → analyticsApi → POST /api/v1/track → Redis Stream
```

### 2. 数据获取流程

```
AnalyticsDashboard → analyticsApi → GET /api/v1/metrics/tracking-events → Redis Stream → 图表渲染
```

## 测试步骤

### 1. 启动服务

```bash
# 启动后端服务 (确保 Redis 正在运行)
cd janus
./gradlew bootRun

# 启动前端服务
cd janus-eye
npm run dev
```

### 2. 基础接口测试

打开 `test-analytics-flow.html` 页面进行后端接口测试:

```bash
# 在浏览器中打开
http://localhost:5173/test-analytics-flow.html
```

点击测试按钮验证:
- ✅ 跟踪事件能够成功发送到后端
- ✅ 能够从后端获取跟踪事件数据

### 3. 前端集成测试

#### 3.1 跟踪测试页面

访问跟踪测试页面验证自动跟踪功能:

```
http://localhost:5173/test/tracking
```

在此页面可以:
- 手动发送各种类型的跟踪事件
- 测试自动跟踪指令 `v-track-click`
- 查看事件发送状态

#### 3.2 分析仪表盘

访问分析仪表盘查看数据可视化:

```
http://localhost:5173/admin/analytics
```

分析仪表盘包含:
- 📊 页面浏览量趋势图
- 🏆 热门页面排行
- 🕐 用户活跃时段热力图
- 🔘 热门点击按钮统计
- 📈 事件类型分布图

## 自动跟踪功能

### 页面浏览跟踪

每次路由切换时自动发送页面浏览和离开事件:

```typescript
// 在 main.ts 中配置
router.beforeEach((to, _from, next) => {
  const pageName = to.name as string || to.path
  globalTracking.setCurrentPage(pageName)
  next()
})
```

### 按钮点击跟踪

使用 `v-track-click` 指令自动跟踪按钮点击:

```vue
<template>
  <button v-track-click="{ text: '登录按钮', id: 'login-btn' }">
    登录
  </button>
</template>
```

### 手动跟踪

在组件中手动发送跟踪事件:

```typescript
import { useTracking } from '@/services/globalTracking'

const { trackCustomEvent } = useTracking()

// 发送自定义事件
await trackCustomEvent('Form Submitted', 'contact-form', {
  formType: 'contact',
  fields: ['name', 'email']
})
```

## 数据结构

### 前端发送的事件格式

```typescript
interface TrackingEventPayload {
  eventName: string         // 事件名称 (如 'Page Viewed')
  eventTime: string         // ISO 8601 时间戳
  page: string             // 页面名称
  target: string           // 目标元素 ID
  userId?: number          // 用户 ID (可选)
  properties?: Record<string, any>  // 额外属性
}
```

### 后端返回的数据格式

```typescript
interface TrackingEventDto {
  eventName: string
  eventTime: string
  page: string
  target: string
  userId: number | null
  properties: Record<string, any> | null
}
```

## 错误处理

### 前端错误处理

- 网络错误时自动回退到模拟数据
- 显示用户友好的错误提示
- 控制台输出详细错误信息

### 后端错误处理

- Redis 连接失败时返回空数组
- 异常情况记录到日志
- 保证 API 接口稳定性

## 配置选项

### 禁用跟踪

```typescript
import { globalTracking } from '@/services/globalTracking'

// 禁用所有跟踪
globalTracking.setEnabled(false)
```

### 设置用户 ID

```typescript
// 用户登录后设置用户 ID
globalTracking.setUserId(user.id)

// 用户登出后清除用户 ID
globalTracking.setUserId(null)
```

## 性能优化

1. **异步发送**: 所有跟踪事件异步发送，不阻塞用户交互
2. **错误容忍**: 发送失败不影响应用正常功能
3. **批量处理**: 可以扩展支持事件批量发送
4. **缓存机制**: 分析数据支持缓存以提高性能

## 扩展建议

1. **事件过滤**: 添加事件过滤和去重机制
2. **批量发送**: 实现事件批量上传以减少网络请求
3. **离线支持**: 支持离线时存储事件，在线时批量发送
4. **实时更新**: 使用 WebSocket 实现实时数据更新
5. **更多图表**: 添加更多分析维度和图表类型

## 故障排除

### 常见问题

1. **后端接口返回 404**
   - 检查后端服务是否启动
   - 确认 API 路径正确

2. **Redis 连接失败**
   - 确保 Redis 服务正在运行
   - 检查 Redis 配置

3. **前端显示模拟数据**
   - 检查网络连接
   - 查看浏览器控制台错误
   - 确认后端 API 正常工作

4. **事件发送失败**
   - 检查 CORS 配置
   - 确认请求格式正确
   - 查看后端日志

### 调试技巧

1. 打开浏览器开发者工具查看网络请求
2. 检查控制台是否有错误信息
3. 使用测试页面验证各个功能
4. 查看后端日志了解服务器端情况

## 总结

完整的分析数据流已经实现，包括:

✅ 前端自动跟踪用户行为  
✅ 后端接收和存储跟踪事件  
✅ 分析仪表盘实时显示数据  
✅ 错误处理和回退机制  
✅ 完整的测试工具和文档  

现在你可以在应用程序中获得完整的用户行为分析数据！