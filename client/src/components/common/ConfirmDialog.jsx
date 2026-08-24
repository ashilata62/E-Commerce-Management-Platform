import React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'primary' | 'warning'
  loading = false,
}) => {
  const iconConfig = {
    danger: { icon: AlertTriangle, color: 'text-roseDanger-500', bg: 'bg-roseDanger-50', btnVariant: 'danger' },
    warning: { icon: AlertTriangle, color: 'text-warm-600', bg: 'bg-warm-50', btnVariant: 'warm' },
    primary: { icon: Info, color: 'text-brand-500', bg: 'bg-brand-50', btnVariant: 'primary' },
  };

  const current = iconConfig[type] || iconConfig.danger;
  const Icon = current.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" showClose={!loading}>
      <div className="text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${current.bg} ${current.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slateText-main">{title}</h4>
          <p className="text-sm text-slateText-muted mt-1 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-surface-border">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={current.btnVariant}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
