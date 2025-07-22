import type { 
  NotificationVO, 
  CreateNotificationDto, 
  NotificationSummaryVO,
  NotificationStatsVO,
  MessageVO
} from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 发送通知
 */
export const createNotification = async (data: CreateNotificationDto): Promise<NotificationVO> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create notification')
  }
  return response.json()
}

/**
 * 广播通知
 */
export const broadcastNotification = async (data: {
  title: string
  content: string
  role: string
  type: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
  senderId?: string
}): Promise<NotificationVO[]> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/broadcast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to broadcast notification')
  }
  return response.json()
}

/**
 * 获取用户通知
 */
export const getUserNotifications = async (userId: string, params?: {
  unreadOnly?: boolean
  type?: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
}): Promise<NotificationVO[]> => {
  const url = new URL(`${API_BASE_URL}/api/notifications/user/${userId}`)
  if (params?.unreadOnly) url.searchParams.append('unreadOnly', params.unreadOnly.toString())
  if (params?.type) url.searchParams.append('type', params.type)
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Failed to fetch user notifications')
  }
  return response.json()
}

/**
 * 获取用户通知摘要
 */
export const getUserNotificationSummary = async (userId: string): Promise<NotificationSummaryVO> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/user/${userId}/summary`)
  if (!response.ok) {
    throw new Error('Failed to fetch notification summary')
  }
  return response.json()
}

/**
 * 标记为已读
 */
export const markNotificationAsRead = async (notificationId: string, userId: string): Promise<NotificationVO> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read?userId=${userId}`, {
    method: 'PUT',
  })
  if (!response.ok) {
    throw new Error('Failed to mark notification as read')
  }
  return response.json()
}

/**
 * 全部标记为已读
 */
export const markAllNotificationsAsRead = async (userId: string): Promise<MessageVO> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/user/${userId}/read-all`, {
    method: 'PUT',
  })
  if (!response.ok) {
    throw new Error('Failed to mark all notifications as read')
  }
  return response.json()
}

// /**
//  * 批量标记为已读
//  */
// export const markNotificationsAsRead = async (data: {
//   notificationIds: string[]
//   userId: string
// }): Promise<MessageVO> => {
//   const response = await fetch(`${API_BASE_URL}/api/notifications/mark-read`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   if (!response.ok) {
//     throw new Error('Failed to mark notifications as read')
//   }
//   return response.json()
// }

/**
 * 删除通知
 */
export const deleteNotification = async (notificationId: string, userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}?userId=${userId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete notification')
  }
}

/**
 * 获取通知类型
 */
export const getNotificationTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/types`)
  if (!response.ok) {
    throw new Error('Failed to fetch notification types')
  }
  return response.json()
}

/**
 * 清理旧通知
 */
export const cleanupOldNotifications = async (daysOld?: number): Promise<MessageVO> => {
  const url = new URL(`${API_BASE_URL}/api/notifications/cleanup`)
  if (daysOld) url.searchParams.append('daysOld', daysOld.toString())
  
  const response = await fetch(url.toString(), {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to cleanup old notifications')
  }
  return response.json()
}

/**
 * 获取通知统计
 */
export const getNotificationStats = async (): Promise<NotificationStatsVO> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/stats`)
  if (!response.ok) {
    throw new Error('Failed to fetch notification stats')
  }
  return response.json()
}

// 兼容性方法
export const getNotifications = getUserNotifications 