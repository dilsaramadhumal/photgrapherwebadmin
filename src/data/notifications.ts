import { Notification } from '@/types/notification';

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Photographer Registration',
    message: 'John Smith has registered as a new photographer',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    photographerId: 'ph1',
    photographerName: 'John Smith'
  },
  {
    id: '2',
    title: 'Review Submitted',
    message: 'A new review has been submitted for Sarah Johnson',
    type: 'success',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    photographerId: 'ph2',
    photographerName: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Profile Update Required',
    message: 'Mike Davis needs to complete profile verification',
    type: 'warning',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    photographerId: 'ph3',
    photographerName: 'Mike Davis'
  },
  {
    id: '4',
    title: 'Payment Issue',
    message: 'Payment failed for Emma Wilson subscription',
    type: 'error',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    photographerId: 'ph4',
    photographerName: 'Emma Wilson'
  },
  {
    id: '5',
    title: 'New Photo Upload',
    message: 'Alex Brown uploaded 15 new photos to portfolio',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    photographerId: 'ph5',
    photographerName: 'Alex Brown'
  }
];