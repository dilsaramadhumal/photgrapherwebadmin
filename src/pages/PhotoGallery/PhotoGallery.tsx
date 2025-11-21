import React, { useState } from 'react';
import { Search, Grid, List, ChevronDown } from 'lucide-react';
import { usePhotos } from '@/hooks/usePhotos';
import { PhotoCard } from '@/components/photos/PhotoCard';
import { PhotoDetailModal } from '@/components/photos/PhotoDetailModal';
import { Photo, ViewMode, TabType, SortOption } from '@/types/photo';

const PhotoGallery: React.FC = () => {
  const { 
    photos, 
    photosByPhotographer, 
    photosByCategory, 
    searchTerm, 
    setSearchTerm, 
    sortBy, 
    setSortBy 
  } = usePhotos();
  
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'likes', label: 'Likes' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'rating', label: 'Rating' }
  ];

  const renderPhotos = (photosToRender: Photo[]) => (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'}>
      {photosToRender.map(photo => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          viewMode={viewMode}
          onClick={() => setSelectedPhoto(photo)}
        />
      ))}
    </div>
  );

  const renderGroupedPhotos = (groupedPhotos: { [key: string]: Photo[] }, groupType: 'photographer' | 'category') => (
    <div className="space-y-6">
      {Object.entries(groupedPhotos).map(([groupName, groupPhotos]) => (
        <div key={groupName}>
          <h3 className="text-lg font-semibold mb-3 capitalize" style={{ color: 'var(--text-primary)' }}>
            {groupType === 'photographer' ? `Photos by ${groupName}` : `${groupName} Photography`} ({groupPhotos.length})
          </h3>
          {renderPhotos(groupPhotos)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Photo Gallery
        </h1>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-4">
          {[
            { key: 'all', label: 'All Images' },
            { key: 'ownership', label: 'Ownership' },
            { key: 'categorized', label: 'Categorized' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.key 
                  ? 'text-black' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === tab.key ? 'var(--accent-color)' : 'transparent',
                color: activeTab === tab.key ? '#000' : 'var(--text-primary)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort (only for All Images tab) */}
            {activeTab === 'all' && (
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2 pr-8 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      Sort by {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-secondary)' }} />
              </div>
            )}

            {/* View Mode */}
            <div className="flex rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'text-black' : ''}`}
                style={{
                  backgroundColor: viewMode === 'grid' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                  color: viewMode === 'grid' ? '#000' : 'var(--text-secondary)'
                }}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'text-black' : ''}`}
                style={{
                  backgroundColor: viewMode === 'list' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                  color: viewMode === 'list' ? '#000' : 'var(--text-secondary)'
                }}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'all' && renderPhotos(photos)}
        {activeTab === 'ownership' && renderGroupedPhotos(photosByPhotographer, 'photographer')}
        {activeTab === 'categorized' && renderGroupedPhotos(photosByCategory, 'category')}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default PhotoGallery;