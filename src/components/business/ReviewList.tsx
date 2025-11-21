import React, { useState } from 'react';
import { Search, MessageSquare, Filter, ArrowUpDown } from 'lucide-react';
import { Review } from '@/types/review';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  onDelete?: (id: number) => void;
  onReviewClick?: (review: Review) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  loading = false,
  onDelete,
  onReviewClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [sortBy, setSortBy] = useState<'date-latest' | 'date-oldest' | 'rating-positive' | 'rating-negative'>('date-latest');

  const filteredAndSortedReviews = reviews
    .filter(review => {
      const matchesSearch = 
        review.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.photographer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.photo_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rating-positive':
          return b.rating - a.rating;
        case 'rating-negative':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        <div style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div 
          style={styles.sortContainer}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowUpDown size={16} color="#6b7280" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={styles.sortSelect}
          >
            <optgroup label="Date Modified" style={styles.optgroup}>
              <option value="date-latest" style={styles.option}>Latest</option>
              <option value="date-oldest" style={styles.option}>Oldest</option>
            </optgroup>
            <optgroup label="Star Rating" style={styles.optgroup}>
              <option value="rating-positive" style={styles.option}>Positive</option>
              <option value="rating-negative" style={styles.option}>Negative</option>
            </optgroup>
          </select>
        </div>
      </div>

      {filteredAndSortedReviews.length === 0 ? (
        <div style={styles.empty}>
          <MessageSquare size={48} color="#d1d5db" />
          <p>No reviews found</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredAndSortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={onDelete}
              onClick={onReviewClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
  },
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 44px',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  statusFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
  },
  select: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    border: 'none',
    borderRadius: '12px',
    minWidth: '180px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  sortSelect: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: '500',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: '32px',
  },
  optgroup: {
    background: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    fontSize: '12px',
    padding: '8px 12px 4px 12px',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  option: {
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    padding: '10px 16px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    margin: '2px 4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px',
  },
  loading: {
    padding: '60px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  empty: {
    padding: '60px 20px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
};