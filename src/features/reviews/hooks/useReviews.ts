import { useState, useEffect } from 'react';
import { Review } from '@/types/review';

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Simulate API call with dummy data
      const dummyData: Review[] = [
        {
          id: 1,
          customer_name: "Sarah Johnson",
          customer_email: "sarah.j@email.com",
          photographer_name: "Samadhi Jayasinghe",
          photo_name: "Wedding Ceremony Moments",
          photo_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
          rating: 5,
          comment: "Amazing photography! Captured our wedding perfectly. Highly recommended!",
          date: "2024-01-15",
          photo_id: 101,
        },
        {
          id: 2,
          customer_name: "Mike Chen",
          customer_email: "mike.chen@email.com",
          photographer_name: "Mahesh De Silva",
          photo_name: "Family Portrait Session",
          photo_url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
          rating: 4,
          comment: "Great work on our family portraits. Professional and friendly service.",
          date: "2024-01-10",
          photo_id: 102,
        },
        {
          id: 3,
          customer_name: "Emma Wilson",
          customer_email: "emma.w@email.com",
          photographer_name: "Sama Jayyy",
          photo_name: "Corporate Event Coverage",
          photo_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
          rating: 5,
          comment: "Exceptional quality photos for our corporate event. Will definitely hire again!",
          date: "2024-01-08",
          photo_id: 103,
        },
        {
          id: 4,
          customer_name: "David Brown",
          customer_email: "david.b@email.com",
          photographer_name: "Nimal Fernando",
          photo_name: "Birthday Party Shots",
          photo_url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
          rating: 3,
          comment: "Good photos but delivery was a bit delayed. Overall satisfied.",
          date: "2024-01-05",
          photo_id: 104,
        },
        {
          id: 5,
          customer_name: "Jessica Martinez",
          customer_email: "jessica.m@email.com",
          photographer_name: "Samadhi Jayasinghe",
          photo_name: "Sunset Beach Engagement",
          photo_url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
          rating: 5,
          comment: "Absolutely stunning work! The photographer captured the most magical moments of our engagement session. The lighting was perfect, the poses felt natural, and every single shot tells a beautiful story. We couldn't be happier with the results. The attention to detail and creative composition exceeded all our expectations. Highly recommend for any special occasion photography!",
          date: "2024-01-12",
          photo_id: 105,
        },
        {
          id: 6,
          customer_name: "Robert Thompson",
          customer_email: "robert.t@email.com",
          photographer_name: "Mahesh De Silva",
          photo_name: "Corporate Headshots Collection",
          photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          rating: 4,
          comment: "Professional service from start to finish. The photographer was punctual, well-prepared, and made the entire team feel comfortable during the shoot. The final headshots look polished and professional, perfect for our company website and LinkedIn profiles. The only minor issue was that some of the lighting could have been slightly better in a few shots, but overall we're very satisfied with the quality and professionalism displayed throughout the entire process.",
          date: "2024-01-09",
          photo_id: 106,
        },
        {
          id: 7,
          customer_name: "Lisa Wang",
          customer_email: "lisa.w@email.com",
          photographer_name: "Sama Jayyy",
          photo_name: "Newborn Baby Photography",
          photo_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
          rating: 5,
          comment: "This was our first experience with newborn photography and we were a bit nervous about how our 2-week-old would handle the session. The photographer was incredibly patient, gentle, and skilled at working with babies. She created such a calm and comfortable environment that our little one slept peacefully through most of the shoot. The photos are absolutely precious and capture this fleeting moment in our lives perfectly. We will treasure these images forever and definitely book again for future milestones!",
          date: "2024-01-07",
          photo_id: 107,
        },
      ];

      setTimeout(() => {
        setReviews(dummyData);
        setLoading(false);
      }, 400);
    } catch (err) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setReviews(prev => 
        prev.map(r => r.id === id ? { ...r, status } : r)
      );
      return true;
    } catch (err) {
      setError('Failed to update review status');
      return false;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setReviews(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete review');
      return false;
    }
  };

  return {
    reviews,
    loading,
    error,
    updateReviewStatus,
    deleteReview,
    refetch: fetchReviews,
  };
};