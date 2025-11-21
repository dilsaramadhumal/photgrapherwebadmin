export interface Photo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  likes: number;
  reviews: number;
  rating: number; // out of 5
  size: string; // e.g., "2.5 MB"
  resolution: string; // e.g., "1920x1080"
  category: PhotoCategory;
  description?: string;
  photographerId: string;
  photographerName: string;
  uploadedAt: Date;
}

export type PhotoCategory = 
  | 'event'
  | 'wedding'
  | 'street'
  | 'portrait'
  | 'landscape'
  | 'nature'
  | 'fashion'
  | 'commercial';

export type SortOption = 'name' | 'size' | 'likes' | 'reviews' | 'rating';
export type ViewMode = 'grid' | 'list';
export type TabType = 'all' | 'ownership' | 'categorized';