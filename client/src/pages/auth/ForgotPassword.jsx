import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Password recovery instructions sent to your email!');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-coral-500 text-white shadow-soft-md mb-2">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slateText-main">Reset Password</h1>
          <p className="text-xs text-slateText-muted">
            Enter your registered store account email to receive a recovery link
          </p>
        </div>

        <div className="commerce-card p-6 sm:p-8 bg-white border border-surface-border">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emeraldGreen-50 text-emeraldGreen-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slateText-main">Check Your Inbox</h3>
              <p className="text-xs text-slateText-muted leading-relaxed">
                We've dispatched a secure one-time password reset link to <strong className="text-slateText-main">{email}</strong>.
              </p>
              <div className="pt-2">
                <Link to="/reset-password?token=demo_reset_123">
                  <Button variant="primary" className="w-full">
                    Proceed to Reset Screen
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Account Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slateText-muted absolute left-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kiaan.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                icon={Send}
              >
                Send Reset Instructions
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-surface-border text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
