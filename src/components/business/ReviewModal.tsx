import React from 'react';
import { Star, User, Calendar, Check, X, Trash2, Mail } from 'lucide-react';
import { Review } from '@/types/review';
import { Modal } from '@/components/ui/Modal';

interface ReviewModalProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: number) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  review,
  isOpen,
  onClose,
  onDelete
}) => {
  if (!review) return null;



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < rating ? '#fbbf24' : 'none'}
        color={i < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Details"
      width="600px"
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.customerSection}>
            <div style={styles.avatar}>
              <User size={24} color="#6b7280" />
            </div>
            <div>
              <h3 style={styles.customerName}>{review.customer_name}</h3>
              <div style={styles.customerEmail}>
                <Mail size={14} />
                <span>{review.customer_email}</span>
              </div>
            </div>
          </div>

        </div>

        <div style={styles.photoSection}>
          <label style={styles.label}>Photo:</label>
          <div style={styles.photoPreview}>
            <img 
              src={review.photo_url} 
              alt={review.photo_name}
              style={styles.photoImage}
            />
            <div style={styles.photoInfo}>
              <h4 style={styles.photoTitle}>{review.photo_name}</h4>
              <p style={styles.photographerCredit}>by {review.photographer_name}</p>
            </div>
          </div>
        </div>

        <div style={styles.ratingSection}>
          <label style={styles.label}>Rating:</label>
          <div style={styles.rating}>
            {renderStars(review.rating)}
            <span style={styles.ratingText}>({review.rating}/5)</span>
          </div>
        </div>

        <div style={styles.commentSection}>
          <label style={styles.label}>Review Comment:</label>
          <div style={styles.commentBox}>
            <p style={styles.comment}>{review.comment}</p>
          </div>
        </div>

        <div style={styles.dateSection}>
          <Calendar size={16} color="#6b7280" />
          <span style={styles.date}>
            Submitted on {new Date(review.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => {
              onDelete?.(review.id);
              onClose();
            }}
            style={styles.deleteBtn}
          >
            <Trash2 size={18} />
            Delete Review
          </button>
        </div>
      </div>
    </Modal>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  customerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'var(--bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerName: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0 0 8px',
  },
  customerEmail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  status: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  photoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  photoPreview: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
  },
  photoImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  photoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
  },
  photoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  photographerCredit: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  ratingSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  ratingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  commentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  commentBox: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '16px',
  },
  comment: {
    fontSize: '15px',
    color: 'var(--text-primary)',
    lineHeight: '1.6',
    margin: 0,
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
  },
  date: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },

  deleteBtn: {
    padding: '12px 20px',
    background: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    minWidth: '140px',
  },
};