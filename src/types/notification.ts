export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  photographerId?: string;
  photographerName?: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}