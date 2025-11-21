import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '600px',
  maxWidth = '90vw',
  maxHeight = '90vh'
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div style={styles.overlay}>
      <div style={{
        ...styles.modal,
        width,
        maxWidth,
        maxHeight
      }}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h2 style={styles.title}>{title}</h2>
            <button onClick={onClose} style={styles.closeBtn}>
              <X size={20} />
            </button>
          </div>
          <div style={styles.body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  const dialogContent = (
    <div style={confirmStyles.overlay}>
      <div style={confirmStyles.dialog}>
        <div style={confirmStyles.header}>
          <h3 style={confirmStyles.title}>{title}</h3>
        </div>
        <div style={confirmStyles.content}>
          <p style={confirmStyles.message}>{message}</p>
        </div>
        <div style={confirmStyles.actions}>
          <button onClick={onCancel} style={confirmStyles.cancelBtn}>
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            style={{
              ...confirmStyles.confirmBtn,
              ...(variant === 'danger' && confirmStyles.dangerBtn)
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    padding: '20px',
    margin: 0,
  },
  modal: {
    background: 'var(--bg-primary)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
    borderBottom: '2px solid var(--border-color)',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    transition: 'all 0.2s',
  },
  body: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
  },
};

const confirmStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
    padding: '20px',
  },
  dialog: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    width: '400px',
    maxWidth: '90vw',
  },
  header: {
    padding: '20px 24px 16px',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  content: {
    padding: '20px 24px',
  },
  message: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    padding: '16px 24px 20px',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: '8px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  confirmBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dangerBtn: {
    background: '#ef4444',
    color: '#ffffff',
  },
};