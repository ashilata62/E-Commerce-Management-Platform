import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Password reset successfully! You can now log in.');
      navigate('/login');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-coral-500 text-white shadow-soft-md mb-2">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slateText-main">Set New Password</h1>
          <p className="text-xs text-slateText-muted">
            Create a secure password for your store operator profile
          </p>
        </div>

        <div className="commerce-card p-6 sm:p-8 bg-white border border-surface-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slateText-muted absolute left-3.5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slateText-muted absolute left-3.5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Update Password & Login
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-surface-border text-center">
            <Link to="/login" className="text-xs font-bold text-brand-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
