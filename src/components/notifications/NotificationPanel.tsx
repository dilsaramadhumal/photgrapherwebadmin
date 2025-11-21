import React from 'react';
import { X, Check, CheckCheck, Trash2 } from 'lucide-react';
import { Notification } from '@/types/notification';

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete
}) => {
  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return 'var(--accent-color, #FFC964)';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4"
      onClick={onClose}
    >
      <div 
        className="w-96 max-h-96 overflow-hidden rounded-lg shadow-xl border"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Notifications ({notifications.filter(n => !n.isRead).length})
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Mark all as read"
            >
              <CheckCheck size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center" style={{ color: 'var(--text-secondary)' }}>
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getTypeColor(notification.type) }}
                      />
                      <h4 
                        className="font-medium text-sm"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {formatTime(notification.createdAt)}
                      </span>
                      <div className="flex items-center gap-1">
                        {!notification.isRead && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Mark as read"
                          >
                            <Check size={12} style={{ color: 'var(--text-secondary)' }} />
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(notification.id)}
                          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30"
                          title="Delete"
                        >
                          <Trash2 size={12} style={{ color: '#EF4444' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};