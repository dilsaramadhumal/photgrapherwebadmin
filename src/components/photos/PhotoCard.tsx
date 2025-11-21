import React from 'react';
import { Heart, Star, User } from 'lucide-react';
import { Photo, ViewMode } from '@/types/photo';

interface PhotoCardProps {
  photo: Photo;
  viewMode: ViewMode;
  onClick: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, viewMode, onClick }) => {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-75 border"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)'
        }}
      >
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {photo.title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            by {photo.photographerName}
          </p>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1">
              <Star size={12} style={{ color: '#FFC964' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {photo.rating}
              </span>
            </div>
            <span 
              className="px-2 py-1 rounded text-xs capitalize"
              style={{ 
                backgroundColor: 'var(--accent-color)', 
                color: '#000' 
              }}
            >
              {photo.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} style={{ color: '#EF4444' }} />
          <span style={{ color: 'var(--text-primary)' }}>{photo.likes}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer hover:scale-105 transition-transform duration-75"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70">
          <Heart size={12} style={{ color: '#EF4444' }} />
          <span className="text-white text-xs">{photo.likes}</span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      </div>
      <div className="mt-2">
        <h3 className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {photo.title}
        </h3>
        <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
          by {photo.photographerName}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Star size={12} style={{ color: '#FFC964' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {photo.rating}
            </span>
          </div>
          <span 
            className="px-2 py-1 rounded text-xs capitalize"
            style={{ 
              backgroundColor: 'var(--accent-color)', 
              color: '#000' 
            }}
          >
            {photo.category}
          </span>
        </div>
      </div>
    </div>
  );
};