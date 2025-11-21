import { useState, useEffect } from 'react';
import { Photographer } from '@/types/photographer';

export const usePhotographers = () => {
  const [data, setData] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        // Dummy data - replace with actual API call
        const dummy: Photographer[] = [
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
          {
            id: 4,
            photographer_first_name: "Nimal",
            photographer_last_name: "Fernando",
            profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            photographer_whatsapp_no: "+94 76 999 0001",
            photographer_email: "nimal.f@example.com",
          },
        ];

        setTimeout(() => {
          setData(dummy);
          setLoading(false);
        }, 400);
      } catch (err) {
        setError('Failed to fetch photographers');
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  const updatePhotographer = async (id: number, updates: Partial<Photographer>) => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
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
      
      setData(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete photographer');
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    updatePhotographer,
    deletePhotographer,
    setError
  };
};