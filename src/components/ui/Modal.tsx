import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '500px'
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width }}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div style={confirmStyles.overlay}>
      <div style={confirmStyles.dialog}>
        <h3 style={confirmStyles.title}>{title}</h3>
        <p style={confirmStyles.message}>{message}</p>
        <div style={confirmStyles.actions}>
          <button onClick={onCancel} style={confirmStyles.cancelBtn}>Cancel</button>
          <button onClick={onConfirm} style={confirmStyles.confirmBtn}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    padding: '20px',
  },
  modal: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxHeight: '90vh',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
  },
  body: {
    padding: '24px',
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 80px)',
  },
};

const confirmStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
    padding: '20px',
  },
  dialog: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    padding: '24px',
    width: '400px',
    maxWidth: '90vw',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0 0 12px',
  },
  message: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: '0 0 20px',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: '8px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  confirmBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    background: '#ef4444',
    color: '#ffffff',
    cursor: 'pointer',
  },
};