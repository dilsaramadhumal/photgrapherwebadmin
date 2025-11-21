import { photographerAPI } from '@/apis/api';
import { mockPhotographers, mockReviews, mockDashboardStats, mockNotifications } from '@/data/mockData';

// Single toggle for all data sources
const USE_MOCK_DATA = true;

// Unified data service
export const dataService = {
  // Photographers
  photographers: {
    getAll: async () => USE_MOCK_DATA ? { data: mockPhotographers } : await photographerAPI.list(),
    getById: async (id: number | string) => USE_MOCK_DATA ? { data: mockPhotographers.find(p => p.id === Number(id)) } : await photographerAPI.getById(id),
    create: async (data: any) => USE_MOCK_DATA ? { data: { id: Date.now(), ...data } } : await photographerAPI.create(data),
    update: async (id: number | string, data: any) => USE_MOCK_DATA ? { data: { id, ...data } } : await photographerAPI.update(id, data),
    delete: async (id: number | string) => USE_MOCK_DATA ? { data: { success: true } } : await photographerAPI.remove(id)
  },

  // Reviews
  reviews: {
    getAll: async () => ({ data: mockReviews }),
    getByPhotographerId: async (photographerId: number | string) => ({ 
      data: mockReviews.filter(r => r.photographerId === Number(photographerId)) 
    }),
    create: async (data: any) => ({ data: { id: Date.now(), ...data } }),
    delete: async (id: number | string) => ({ data: { success: true } })
  },

  // Dashboard
  dashboard: {
    getStats: async () => ({ data: mockDashboardStats }),
    getMonthlyData: async () => ({ data: [] }), // Add if needed
    getCategoryStats: async () => ({ data: [] }) // Add if needed
  },

  // Notifications
  notifications: {
    getAll: async () => ({ data: mockNotifications }),
    markAsRead: async (id: string) => ({ data: { success: true } }),
    markAllAsRead: async () => ({ data: { success: true } }),
    delete: async (id: string) => ({ data: { success: true } })
  }
};