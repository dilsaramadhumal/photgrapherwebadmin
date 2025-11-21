import { useState, useMemo } from 'react';
import { Photo, SortOption } from '@/types/photo';
import { dummyPhotos } from '@/data/photos';

export const usePhotos = () => {
  const [photos] = useState<Photo[]>(dummyPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const filteredAndSortedPhotos = useMemo(() => {
    let filtered = photos;

    // Filter by search term
    if (searchTerm) {
      filtered = photos.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.photographerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort photos
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'size':
          return parseFloat(a.size) - parseFloat(b.size);
        case 'likes':
          return b.likes - a.likes;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [photos, searchTerm, sortBy]);

  const photosByPhotographer = useMemo(() => {
    const grouped: { [key: string]: Photo[] } = {};
    filteredAndSortedPhotos.forEach(photo => {
      if (!grouped[photo.photographerName]) {
        grouped[photo.photographerName] = [];
      }
      grouped[photo.photographerName].push(photo);
    });
    return grouped;
  }, [filteredAndSortedPhotos]);

  const photosByCategory = useMemo(() => {
    const grouped: { [key: string]: Photo[] } = {};
    filteredAndSortedPhotos.forEach(photo => {
      if (!grouped[photo.category]) {
        grouped[photo.category] = [];
      }
      grouped[photo.category].push(photo);
    });
    return grouped;
  }, [filteredAndSortedPhotos]);

  return {
    photos: filteredAndSortedPhotos,
    photosByPhotographer,
    photosByCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy
  };
};