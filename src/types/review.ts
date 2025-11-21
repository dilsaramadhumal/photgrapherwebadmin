export interface Review {
  id: number;
  customer_name: string;
  customer_email?: string;
  photographer_name?: string;
  photo_name: string;
  photo_url: string;
  rating: number;
  comment: string;
  date: string;
  photo_id: number;
}

export interface ReviewFormData {
  customerName: string;
  customerEmail: string;
  photographerName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
}