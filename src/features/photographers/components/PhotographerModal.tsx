import React, { useState } from 'react';
import { Edit2, Trash2, Mail, Phone, Save } from 'lucide-react';
import { Photographer, PhotographerFormData } from '@/shared/types';
import { Modal, ConfirmDialog } from '@/shared/components/Modal';

interface PhotographerModalProps {
  photographer: Photographer | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, data: Partial<Photographer>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

export const PhotographerModal: React.FC<PhotographerModalProps> = ({
  photographer,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState<PhotographerFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    image: null,
  });

  React.useEffect(() => {
    if (photographer) {
      setFormData({
        firstName: photographer.photographer_first_name ?? '',
        lastName: photographer.photographer_last_name ?? '',
        phone: photographer.photographer_whatsapp_no ?? '',
        email: photographer.photographer_email ?? '',
        image: photographer.profile_image ?? null,
      });
    }
  }, [photographer]);

  const handleSave = async () => {
    if (!photographer) return;
    
    const success = await onUpdate(photographer.id, {
      photographer_first_name: formData.firstName,
      photographer_last_name: formData.lastName,
      photographer_whatsapp_no: formData.phone,
      photographer_email: formData.email,
      profile_image: formData.image,
    });
    
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!photographer) return;
    
    const success = await onDelete(photographer.id);
    if (success) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  if (!photographer) return null;

  const fullName = `${photographer.photographer_first_name ?? ""} ${photographer.photographer_last_name ?? ""}`.trim();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsEditing(false);
        }}
        title={isEditing ? 'Edit Photographer' : 'Photographer Details'}
        width="500px"
      >
        {!isEditing ? (
          <div style={styles.viewContainer}>
            <div style={styles.profileSection}>
              <img
                src={photographer.profile_image ?? generateAvatar(fullName)}
                alt={fullName}
                style={styles.avatar}
              />
              <h3 style={styles.name}>{fullName}</h3>
              <span style={styles.id}>ID: {photographer.id}</span>
            </div>

            <div style={styles.infoSection}>
              <div style={styles.infoItem}>
                <Phone size={16} />
                <span>WhatsApp: {photographer.photographer_whatsapp_no ?? "—"}</span>
              </div>
              <div style={styles.infoItem}>
                <Mail size={16} />
                <span>Email: {photographer.photographer_email ?? "—"}</span>
              </div>
            </div>

            <div style={styles.actions}>
              <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                <Edit2 size={18} />
                Edit
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} style={styles.deleteBtn}>
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.formContainer}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                style={styles.input}
              />
            </div>

            <div style={styles.actions}>
              <button onClick={handleSave} style={styles.saveBtn}>
                <Save size={18} />
                Save
              </button>
              <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Photographer"
        message="Are you sure you want to delete this photographer? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmText="Delete"
      />
    </>
  );
};

const generateAvatar = (name: string) => {
  const initials = name.split(" ").map(s => s[0]).join("").toUpperCase();
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='100%25' height='100%25' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='Arial'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '16px',
    objectFit: 'cover',
  },
  name: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: 0,
  },
  id: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  editBtn: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  deleteBtn: {
    flex: 1,
    padding: '12px',
    background: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  input: {
    padding: '10px 12px',
    border: '2px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
  },
  saveBtn: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    border: '2px solid var(--border-color)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};