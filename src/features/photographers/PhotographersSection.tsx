import React, { useState } from 'react';
import { Photographer } from '@/shared/types';
import { usePhotographers } from './hooks/usePhotographers';
import { PhotographerList, PhotographerModal } from './components';

export const PhotographersSection: React.FC = () => {
  const { photographers, loading, error, updatePhotographer, deletePhotographer } = usePhotographers();
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPhotographer = (photographer: Photographer) => {
    setSelectedPhotographer(photographer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhotographer(null);
  };

  const handleUpdatePhotographer = async (id: number, updates: Partial<Photographer>) => {
    const success = await updatePhotographer(id, updates);
    if (success && selectedPhotographer) {
      // Update the selected photographer with new data
      setSelectedPhotographer({ ...selectedPhotographer, ...updates });
    }
    return success;
  };

  const handleDeletePhotographer = async (id: number) => {
    const success = await deletePhotographer(id);
    if (success) {
      handleCloseModal();
    }
    return success;
  };

  if (error) {
    return (
      <div style={styles.error}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <PhotographerList
        photographers={photographers}
        loading={loading}
        onSelectPhotographer={handleSelectPhotographer}
        selectedId={selectedPhotographer?.id}
      />

      <PhotographerModal
        photographer={selectedPhotographer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdatePhotographer}
        onDelete={handleDeletePhotographer}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    padding: '24px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  error: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#ef4444',
  },
};