import { apiGet, apiPost } from '@/config/api';

/**
 * 后端返回的跟踪事件数据结构
 */
export interface TrackingEventDto {
  eventName: string;
  eventTime: string; // ISO 8601 format
  page: string;
  target: string;
  userId: number | null;
  properties: Record<string, any> | null;
}

/**
 * 前端使用的分析事件数据结构
 */
export interface AnalyticsEvent {
  id: string;
  eventName: 'Page Viewed' | 'Page Left' | 'Button Clicked' | string;
  properties: {
    timestamp: string;
    url: string;
    page?: string;
    path?: string;
    buttonText?: string;
    buttonId?: string;
    userId: string;
    component?: string;
    target?: string;
  };
}

/**
 * 发送跟踪事件到后端
 */
export interface TrackingEventPayload {
  eventName: string;
  eventTime: string;
  page: string;
  target: string;
  userId?: number;
  properties?: Record<string, any>;
}

/**
 * Analytics API 服务
 */
export const analyticsApi = {
  /**
   * 获取最新的跟踪事件
   * @param count 获取数量，默认50
   */
  async getTrackingEvents(count: number = 50): Promise<AnalyticsEvent[]> {
    try {
      const response = await apiGet('/api/v1/metrics/tracking-events', { count });
      
      // 转换后端数据格式为前端格式
      return (response as TrackingEventDto[]).map((dto, index) => ({
        id: `event-${Date.now()}-${index}`,
        eventName: dto.eventName,
        properties: {
          timestamp: dto.eventTime,
          url: dto.properties?.url || `${window.location.origin}/${dto.page}`,
          page: dto.page,
          path: dto.properties?.path || `/${dto.page.toLowerCase()}`,
          buttonText: dto.properties?.buttonText,
          buttonId: dto.properties?.buttonId,
          userId: dto.userId?.toString() || 'anonymous',
          component: dto.properties?.component,
          target: dto.target,
          ...dto.properties
        }
      }));
    } catch (error) {
      console.error('Failed to fetch tracking events:', error);
      throw new Error('获取分析数据失败');
    }
  },

  /**
   * 发送跟踪事件到后端
   * @param event 跟踪事件数据
   */
  async sendTrackingEvent(event: TrackingEventPayload): Promise<void> {
    try {
      await apiPost('/api/v1/track', event);
    } catch (error) {
      console.error('Failed to send tracking event:', error);
      throw new Error('发送跟踪事件失败');
    }
  },

  /**
   * 便捷方法：发送页面浏览事件
   */
  async trackPageView(page: string, userId?: number, additionalProps?: Record<string, any>): Promise<void> {
    const event: TrackingEventPayload = {
      eventName: 'Page Viewed',
      eventTime: new Date().toISOString(),
      page,
      target: page,
      userId,
      properties: {
        url: window.location.href,
        path: window.location.pathname,
        ...additionalProps
      }
    };
    
    return this.sendTrackingEvent(event);
  },

  /**
   * 便捷方法：发送按钮点击事件
   */
  async trackButtonClick(
    buttonText: string, 
    buttonId: string, 
    page: string, 
    userId?: number, 
    additionalProps?: Record<string, any>
  ): Promise<void> {
    const event: TrackingEventPayload = {
      eventName: 'Button Clicked',
      eventTime: new Date().toISOString(),
      page,
      target: buttonId,
      userId,
      properties: {
        buttonText,
        buttonId,
        url: window.location.href,
        path: window.location.pathname,
        component: page,
        ...additionalProps
      }
    };
    
    return this.sendTrackingEvent(event);
  },

  /**
   * 便捷方法：发送页面离开事件
   */
  async trackPageLeave(page: string, userId?: number, additionalProps?: Record<string, any>): Promise<void> {
    const event: TrackingEventPayload = {
      eventName: 'Page Left',
      eventTime: new Date().toISOString(),
      page,
      target: page,
      userId,
      properties: {
        url: window.location.href,
        path: window.location.pathname,
        ...additionalProps
      }
    };
    
    return this.sendTrackingEvent(event);
  }
};