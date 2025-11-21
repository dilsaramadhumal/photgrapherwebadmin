import React from 'react';
import { X, Heart, Star, User, Image as ImageIcon } from 'lucide-react';
import { Photo } from '@/types/photo';

interface PhotoDetailModalProps {
  photo: Photo;
  onClose: () => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ photo, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
        style={{ backgroundColor: 'var(--bg-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {photo.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-2/3 p-4">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Details */}
          <div className="lg:w-1/3 p-4 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Heart size={16} style={{ color: '#EF4444' }} />
                <span style={{ color: 'var(--text-primary)' }}>{photo.likes} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: '#FFC964' }} />
                <span style={{ color: 'var(--text-primary)' }}>{photo.rating}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-primary)' }}>{photo.reviews} reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={16} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-primary)' }}>{photo.size}</span>
              </div>
            </div>

            {/* Photographer */}
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Photographer
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>{photo.photographerName}</p>
            </div>

            {/* Technical Details */}
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Technical Details
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Resolution:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{photo.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Size:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{photo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Category:</span>
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
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Uploaded:</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {photo.uploadedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {photo.description && (
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Description
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {photo.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};