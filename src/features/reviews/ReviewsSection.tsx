import React, { useState } from 'react';
import { Review } from '@/types/review';
import { useReviews } from './hooks/useReviews';
import { ReviewList } from '@/components/business/ReviewList';
import { ReviewModal } from '@/components/business/ReviewModal';
import { ConfirmDialog } from '@/components/ui/Modal';

export const ReviewsSection: React.FC = () => {
  const { reviews, loading, error, deleteReview } = useReviews();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleDeleteClick = (id: number) => {
    setReviewToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (reviewToDelete) {
      const success = await deleteReview(reviewToDelete);
      if (success) {
        setShowDeleteConfirm(false);
        setReviewToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setReviewToDelete(null);
  };

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedReview(null);
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
      <ReviewList
        reviews={reviews}
        loading={loading}
        onDelete={handleDeleteClick}
        onReviewClick={handleReviewClick}
      />

      <ReviewModal
        review={selectedReview}
        isOpen={showReviewModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
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