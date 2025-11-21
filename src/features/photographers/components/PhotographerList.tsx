import React, { useState } from 'react';
import { Search, Users, ArrowUpDown } from 'lucide-react';
import { Photographer } from '@/shared/types';
import { PhotographerCard } from './PhotographerCard';

interface PhotographerListProps {
  photographers: Photographer[];
  loading?: boolean;
  onSelectPhotographer?: (photographer: Photographer) => void;
  selectedId?: number;
}

export const PhotographerList: React.FC<PhotographerListProps> = ({
  photographers,
  loading = false,
  onSelectPhotographer,
  selectedId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date-latest' | 'date-oldest' | 'name-ascending' | 'name-descending'>('date-latest');

  const filteredAndSortedPhotographers = photographers
    .filter(p => {
      const fullName = `${p.photographer_first_name ?? ""} ${p.photographer_last_name ?? ""}`.toLowerCase();
      const email = (p.photographer_email ?? "").toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-latest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'date-oldest':
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        case 'name-ascending':
          const nameA = `${a.photographer_first_name ?? ""} ${a.photographer_last_name ?? ""}`;
          const nameB = `${b.photographer_first_name ?? ""} ${b.photographer_last_name ?? ""}`;
          return nameA.localeCompare(nameB);
        case 'name-descending':
          const nameA2 = `${a.photographer_first_name ?? ""} ${a.photographer_last_name ?? ""}`;
          const nameB2 = `${b.photographer_first_name ?? ""} ${b.photographer_last_name ?? ""}`;
          return nameB2.localeCompare(nameA2);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading photographers...</p>
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
            placeholder="Search by name or email..."
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
            <optgroup label="Date Modified">
              <option value="date-latest">Latest</option>
              <option value="date-oldest">Oldest</option>
            </optgroup>
            <optgroup label="Name">
              <option value="name-ascending">Ascending</option>
              <option value="name-descending">Descending</option>
            </optgroup>
          </select>
        </div>
      </div>

      {filteredAndSortedPhotographers.length === 0 ? (
        <div style={styles.empty}>
          <Users size={48} color="#d1d5db" />
          <p>No photographers found</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredAndSortedPhotographers.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              photographer={photographer}
              isSelected={selectedId === photographer.id}
              onClick={() => onSelectPhotographer?.(photographer)}
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
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