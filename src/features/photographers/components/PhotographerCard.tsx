import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Photographer } from '@/shared/types';

interface PhotographerCardProps {
  photographer: Photographer;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({
  photographer,
  isSelected = false,
  onClick
}) => {
  const fullName = `${photographer.photographer_first_name ?? ""} ${photographer.photographer_last_name ?? ""}`.trim() || "—";
  
  const generateAvatar = (name: string) => {
    const initials = name.split(" ").map(s => s[0]).join("").toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='white' font-family='Arial'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'var(--accent-color, #FFC964)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
      style={{
        ...styles.card,
        background: isSelected ? 'linear-gradient(135deg, #000000 0%, #333333 100%)' : 'var(--bg-primary)',
        color: isSelected ? '#ffffff' : 'var(--text-primary)',
        border: isSelected ? 'none' : '1px solid var(--border-color)',
        transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isSelected 
          ? '0 8px 25px -5px rgba(0, 0, 0, 0.25)' 
          : '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <img
        src={photographer.profile_image ?? generateAvatar(fullName)}
        alt={fullName}
        style={styles.avatar}
      />
      <div style={styles.content}>
        <h3 style={{
          ...styles.name,
          color: isSelected ? '#ffffff' : 'var(--text-primary)',
        }}>
          {fullName}
        </h3>
        <div style={styles.details}>
          <div style={styles.detail}>
            <Mail size={14} color={isSelected ? '#e0e7ff' : '#6b7280'} />
            <span style={{ color: isSelected ? '#e0e7ff' : '#6b7280' }}>
              {photographer.photographer_email ?? "—"}
            </span>
          </div>
          <div style={styles.detail}>
            <Phone size={14} color={isSelected ? '#e0e7ff' : '#6b7280'} />
            <span style={{ color: isSelected ? '#e0e7ff' : '#6b7280' }}>
              {photographer.photographer_whatsapp_no ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: '20px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
  },
};