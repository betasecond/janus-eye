import type {
  NotificationVO,
  CreateNotificationDto,
  NotificationSummaryVO,
  NotificationStatsVO,
  MessageVO
} from '@/types'
import {
  apiDelete, apiGet, apiPost, apiPut,
} from '@/config/api'

/**
 * 发送通知
 */
export const createNotification = (data: CreateNotificationDto): Promise<NotificationVO> => {
  return apiPost(`/api/notifications`, data)
}

/**
 * 广播通知
 */
export const broadcastNotification = (data: {
  title: string
  content: string
  role: string
  type: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
  senderId?: string
}): Promise<NotificationVO[]> => {
  return apiPost(`/api/notifications/broadcast`, data)
}

/**
 * 获取用户通知
 */
export const getUserNotifications = (userId: string, params?: {
  unreadOnly?: boolean
  type?: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
}): Promise<NotificationVO[]> => {
  return apiGet(`/api/notifications/user/${userId}`, params)
}

/**
 * 获取用户通知摘要
 */
export const getUserNotificationSummary = (userId: string): Promise<NotificationSummaryVO> => {
  return apiGet(`/api/notifications/user/${userId}/summary`)
}

/**
 * 标记为已读
 */
export const markNotificationAsRead = (notificationId: string, userId: string): Promise<NotificationVO> => {
  return apiPut(`/api/notifications/${notificationId}/read`, { userId })
}

/**
 * 全部标记为已读
 */
export const markAllNotificationsAsRead = (userId: string): Promise<MessageVO> => {
  return apiPut(`/api/notifications/user/${userId}/read-all`, {})
}

/**
 * 删除通知
 */
export const deleteNotification = (notificationId: string, userId: string): Promise<void> => {
  return apiDelete(`/api/notifications/${notificationId}`, { userId })
}

/**
 * 获取通知类型
 */
export const getNotificationTypes = (): Promise<string[]> => {
  return apiGet(`/api/notifications/types`)
}

/**
 * 清理旧通知
 */
export const cleanupOldNotifications = (daysOld?: number): Promise<MessageVO> => {
  return apiDelete(`/api/notifications/cleanup`, { daysOld })
}

/**
 * 获取通知统计
 */
export const getNotificationStats = (): Promise<NotificationStatsVO> => {
  return apiGet(`/api/notifications/stats`)
}

// 兼容性方法
export const getNotifications = getUserNotifications
