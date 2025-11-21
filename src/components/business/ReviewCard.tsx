import React from 'react';
import { Star, User, Calendar, Trash2, Image as ImageIcon } from 'lucide-react';
import { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  onDelete?: (id: number) => void;
  onClick?: (review: Review) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onDelete,
  onClick
}) => {


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#fbbf24' : 'none'}
        color={i < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <div 
      style={styles.card}
      onClick={() => onClick?.(review)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'var(--accent-color, #3b82f6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      <div style={styles.header}>
        <div style={styles.customerInfo}>
          <div style={styles.avatar}>
            <User size={20} color="#6b7280" />
          </div>
          <div>
            <h3 style={styles.customerName}>{review.customer_name}</h3>
            <p style={styles.customerEmail}>{review.customer_email}</p>
          </div>
        </div>

      </div>

      <div style={styles.photoInfo}>
        <span style={styles.photoName}>{review.photo_name}</span>
        <span style={styles.photographerName}>by {review.photographer_name}</span>
      </div>

      <div style={styles.rating}>
        {renderStars(review.rating)}
        <span style={styles.ratingText}>({review.rating}/5)</span>
      </div>

      <div style={styles.commentContainer}>
        <p style={{
          ...styles.comment,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {review.comment}
        </p>
        <div style={styles.commentFadeOverlay}></div>
      </div>

      <div style={styles.footer}>
        <div style={styles.date}>
          <Calendar size={14} color="#6b7280" />
          <span>{new Date(review.date).toLocaleDateString()}</span>
        </div>

        <div style={styles.actions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(review.id);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fee2e2';
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderColor = '#fca5a5';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            style={styles.deleteBtn}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div style={styles.cardFadeOverlay}></div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    position: 'relative',
  },
  cardFadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30px',
    background: 'linear-gradient(to top, var(--bg-primary), transparent)',
    borderRadius: '0 0 12px 12px',
    pointerEvents: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  customerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  customerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  customerEmail: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  status: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  photoInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  photoName: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  photographerName: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  ratingText: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  commentContainer: {
    position: 'relative',
    height: '42px', // Fixed height for 2 lines
  },
  commentFadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '21px', // Height of one line to fade the second line
    background: 'linear-gradient(to top, var(--bg-primary), transparent)',
    pointerEvents: 'none',
  },
  comment: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    lineHeight: '1.5',
    margin: 0,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },

  deleteBtn: {
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
};