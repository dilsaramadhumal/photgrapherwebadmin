import { useState, useEffect } from 'react';
import { Photographer } from '@/shared/types';

export const usePhotographers = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotographers();
  }, []);

  const fetchPhotographers = async () => {
    try {
      setLoading(true);
      // Simulate API call with dummy data
      const dummyData: Photographer[] = [
        {
          id: 1,
          photographer_first_name: "Samadhi",
          photographer_last_name: "Jayasinghe",
          profile_image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
          photographer_whatsapp_no: "+94 77 123 4567",
          photographer_email: "samadhi.j@example.com",
        },
        {
          id: 2,
          photographer_first_name: "Sama",
          photographer_last_name: "Jayyy",
          profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
          photographer_whatsapp_no: "+94 77 987 6543",
          photographer_email: "sama.j@example.com",
        },
        {
          id: 3,
          photographer_first_name: "Mahesh",
          photographer_last_name: "De Silva",
          profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          photographer_whatsapp_no: "+94 71 555 4321",
          photographer_email: "mahesh.d@example.com",
        },
      ];

      setTimeout(() => {
        setPhotographers(dummyData);
        setLoading(false);
      }, 400);
    } catch (err) {
      setError('Failed to fetch photographers');
      setLoading(false);
    }
  };

  const updatePhotographer = async (id: number, updates: Partial<Photographer>) => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPhotographers(prev => 
        prev.map(p => p.id === id ? { ...p, ...updates } : p)
      );
      return true;
    } catch (err) {
      setError('Failed to update photographer');
      return false;
    }
  };

  const deletePhotographer = async (id: number) => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPhotographers(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete photographer');
      return false;
    }
  };

  return {
    photographers,
    loading,
    error,
    updatePhotographer,
    deletePhotographer,
    refetch: fetchPhotographers,
  };
};