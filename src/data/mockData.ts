// All mock data in one file for simplicity

// Photographers
export const mockPhotographers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    whatsappNo: "+1234567890",
    bio: "Professional wedding and portrait photographer with 8+ years of experience.",
    spotlightDescription: "Award-winning photographer known for stunning wedding photography",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.8,
    totalReviews: 156,
    totalPhotos: 342,
    joinedDate: "2020-03-15",
    isActive: true,
    specialties: ["Wedding", "Portrait", "Event"],
    location: "New York, NY"
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    whatsappNo: "+1234567891",
    bio: "Creative street and fashion photographer passionate about urban culture.",
    spotlightDescription: "Street photography expert with unique artistic vision",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    rating: 4.6,
    totalReviews: 89,
    totalPhotos: 278,
    joinedDate: "2021-07-22",
    isActive: true,
    specialties: ["Street", "Fashion", "Urban"],
    location: "Los Angeles, CA"
  }
];

// Reviews
export const mockReviews = [
  {
    id: 1,
    photographerId: 1,
    photographerName: "John Smith",
    clientName: "Jennifer Martinez",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
    rating: 5,
    comment: "Absolutely amazing work! John captured our wedding day perfectly.",
    date: "2024-01-15",
    photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300",
    isVerified: true,
    helpfulCount: 23
  },
  {
    id: 2,
    photographerId: 2,
    photographerName: "Sarah Johnson",
    clientName: "David Chen",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 4,
    comment: "Great street photography session. Sarah has a unique eye for urban aesthetics.",
    date: "2024-01-20",
    photoUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
    isVerified: true,
    helpfulCount: 15
  }
];

// Dashboard Stats
export const mockDashboardStats = {
  totalPhotographers: 156,
  activePhotographers: 142,
  totalPhotos: 12847,
  totalReviews: 3456,
  averageRating: 4.6,
  monthlyGrowth: 12.5,
  revenueThisMonth: 45670,
  newRegistrations: 23
};

// Notifications
export const mockNotifications = [
  {
    id: '1',
    title: 'New Photographer Registration',
    message: 'John Smith has registered as a new photographer',
    type: 'info' as const,
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    photographerId: 'ph1',
    photographerName: 'John Smith'
  },
  {
    id: '2',
    title: 'Review Submitted',
    message: 'A new review has been submitted for Sarah Johnson',
    type: 'success' as const,
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    photographerId: 'ph2',
    photographerName: 'Sarah Johnson'
  }
];

// Images
export const mockImages = {
  avatars: {
    male: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    female: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
  },
  photos: {
    wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    landscape: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  }
};