import React, { useState } from 'react';
import { Edit2, Trash2, Mail, Phone, Save, Image, X } from 'lucide-react';
import { Photographer, PhotographerFormData, UploadMethod } from '@/types/photographer';
import { ConfirmationDialog } from './Modal';

interface PhotographerCardProps {
  photographer: Photographer;
  isSelected: boolean;
  onClick: () => void;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({
  photographer,
  isSelected,
  onClick
}) => {
  const fullName = `${photographer.photographer_first_name ?? ""} ${photographer.photographer_last_name ?? ""}`.trim() || "—";
  
  const fallbackAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((s) => (s ? s[0] : ""))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1'/%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial,sans-serif' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
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
        ...cardStyles.card,
        background: isSelected ? 'linear-gradient(135deg, #000000 0%, #333333 100%)' : 'var(--bg-primary)',
        color: isSelected ? '#ffffff' : 'var(--text-primary)',
        border: isSelected ? 'none' : '1px solid var(--border-color)',
        transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isSelected 
          ? '0 8px 25px -5px rgba(0, 0, 0, 0.25), 0 4px 10px -3px rgba(0, 0, 0, 0.1)' 
          : '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <img
        src={photographer.profile_image ?? fallbackAvatar(fullName)}
        alt={fullName}
        style={cardStyles.avatar}
      />
      <div style={cardStyles.content}>
        <h3 style={{
          ...cardStyles.name,
          color: isSelected ? '#ffffff' : 'var(--text-primary)',
        }}>
          {fullName}
        </h3>
        <div style={cardStyles.details}>
          <div style={cardStyles.detail}>
            <Mail size={14} color={isSelected ? '#e0e7ff' : '#6b7280'} />
            <span style={{ color: isSelected ? '#e0e7ff' : '#6b7280' }}>
              {photographer.photographer_email ?? "—"}
            </span>
          </div>
          <div style={cardStyles.detail}>
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

interface PhotographerDetailsViewProps {
  photographer: Photographer;
  onEdit: () => void;
  onDelete: () => void;
}

export const PhotographerDetailsView: React.FC<PhotographerDetailsViewProps> = ({
  photographer,
  onEdit,
  onDelete
}) => {
  const fullName = `${photographer.photographer_first_name ?? ""} ${photographer.photographer_last_name ?? ""}`.trim();
  
  const fallbackAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((s) => (s ? s[0] : ""))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1'/%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial,sans-serif' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div style={detailStyles.container}>
      <div style={detailStyles.profileSection}>
        <img
          src={photographer.profile_image ?? fallbackAvatar(fullName)}
          alt="profile"
          style={detailStyles.bigAvatar}
        />
        <div style={detailStyles.profileInfo}>
          <h3 style={detailStyles.profileName}>
            {fullName}
          </h3>
          <span style={detailStyles.profileId}>ID: {photographer.id}</span>
        </div>
      </div>

      <div style={detailStyles.detailsContent}>
        <div style={detailStyles.infoItem}>
          <div style={detailStyles.infoLabel}>
            <Phone size={16} />
            WhatsApp
          </div>
          <div style={detailStyles.infoValue}>{photographer.photographer_whatsapp_no ?? "—"}</div>
        </div>
        <div style={detailStyles.infoItem}>
          <div style={detailStyles.infoLabel}>
            <Mail size={16} />
            Email
          </div>
          <div style={detailStyles.infoValue}>{photographer.photographer_email ?? "—"}</div>
        </div>
      </div>

      <div style={detailStyles.actionButtons}>
        <button onClick={onEdit} style={detailStyles.btnEdit}>
          <Edit2 size={18} />
          Edit Profile
        </button>
        <button onClick={onDelete} style={detailStyles.btnDelete}>
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};

interface PhotographerFormProps {
  initialData: PhotographerFormData;
  onSave: (data: PhotographerFormData) => Promise<void>;
  onCancel: () => void;
  isMobile?: boolean;
}

export const PhotographerForm: React.FC<PhotographerFormProps> = ({
  initialData,
  onSave,
  onCancel,
  isMobile = false
}) => {
  const [formData, setFormData] = useState<PhotographerFormData>(initialData);
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fallbackAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((s) => (s ? s[0] : ""))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1'/%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial,sans-serif' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  const handleSave = async () => {
    await onSave(formData);
  };

  const handleImageDelete = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setSelectedFile(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          style={formStyles.input}
        />
      </div>

      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          style={formStyles.input}
        />
      </div>

      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>WhatsApp Number</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          style={formStyles.input}
        />
      </div>

      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          style={formStyles.input}
        />
      </div>

      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Profile Image</label>
        
        <div style={formStyles.imageContainer}>
          <img
            src={formData.image ?? fallbackAvatar(formData.firstName + " " + formData.lastName)}
            alt="preview"
            style={formStyles.previewImg}
          />
          {formData.image && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              style={formStyles.deletePhotoBtn}
              title="Delete Photo"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div style={formStyles.uploadToggle}>
          <button
            type="button"
            onClick={() => setUploadMethod('url')}
            style={{
              ...formStyles.toggleBtn,
              background: uploadMethod === 'url' ? 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)' : 'var(--bg-secondary)',
              color: uploadMethod === 'url' ? '#000000' : 'var(--text-secondary)'
            }}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod('upload')}
            style={{
              ...formStyles.toggleBtn,
              background: uploadMethod === 'upload' ? 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)' : 'var(--bg-secondary)',
              color: uploadMethod === 'upload' ? '#000000' : 'var(--text-secondary)'
            }}
          >
            Upload
          </button>
        </div>

        {uploadMethod === 'url' && (
          <input
            type="text"
            value={formData.image ?? ""}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, image: e.target.value || null }));
              setSelectedFile(null);
            }}
            style={formStyles.input}
            placeholder="https://example.com/image.jpg"
          />
        )}

        {uploadMethod === 'upload' && (
          <div style={formStyles.fileUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  const previewUrl = URL.createObjectURL(file);
                  setFormData(prev => ({ ...prev, image: previewUrl }));
                }
              }}
              style={formStyles.fileInput}
              id="photo-upload"
            />
            <label htmlFor="photo-upload" style={formStyles.fileLabel}>
              <Image size={20} />
              {selectedFile ? selectedFile.name : 'Choose Photo'}
            </label>
          </div>
        )}
      </div>

      <div style={formStyles.actionButtons}>
        <button onClick={handleSave} style={formStyles.btnSave}>
          <Save size={18} />
          Save Changes
        </button>
        <button onClick={onCancel} style={formStyles.btnCancel}>
          Cancel
        </button>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        title="Delete Photo"
        message="Are you sure you want to delete this photo? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleImageDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

const cardStyles: { [key: string]: React.CSSProperties } = {
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

const detailStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  bigAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '16px',
    objectFit: 'cover',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  profileInfo: {
    textAlign: 'center',
  },
  profileName: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0 0 4px',
  },
  profileId: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoItem: {
    background: 'var(--bg-secondary)',
    padding: '14px',
    borderRadius: '10px',
  },
  infoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 'auto',
  },
  btnEdit: {
    background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
    color: '#000000',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  btnDelete: {
    background: '#000000',
    color: '#ffffff',
    border: '2px solid #000000',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
};

const formStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  input: {
    padding: '10px 14px',
    border: '2px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  imageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '12px',
  },
  previewImg: {
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  deletePhotoBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s',
  },
  uploadToggle: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  toggleBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  fileUploadContainer: {
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    border: '2px dashed var(--border-color)',
    borderRadius: '8px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '14px',
    fontWeight: '500',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 'auto',
  },
  btnSave: {
    background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
    color: '#000000',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  btnCancel: {
    background: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    border: '2px solid var(--border-color)',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};