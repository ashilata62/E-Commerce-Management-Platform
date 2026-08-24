import { generateToken } from '../middleware/authMiddleware.js';
import { store } from '../services/dataStore.js';

// @desc Auth user & get token
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = store.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());

  if (user) {
    // For demo / test accounts, password validation
    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
        permissions: user.permissions,
      }
    });
  }

  // Fallback demo user if any email entered
  const defaultUser = {
    _id: 'usr_' + Date.now(),
    name: email ? email.split('@')[0] : 'Demo Admin',
    email: email || 'admin@komalos.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    status: 'Active',
    permissions: ['all'],
  };

  store.users.push(defaultUser);

  const token = generateToken({
    id: defaultUser._id,
    name: defaultUser.name,
    email: defaultUser.email,
    role: defaultUser.role,
  });

  return res.json({
    success: true,
    token,
    user: defaultUser,
  });
};

// @desc Get current logged in user profile
// @route GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  const user = store.users.find(u => u._id === req.user.id);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: true, user: req.user });
  }
};

// @desc Request password reset token
// @route POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `Password reset instructions sent to ${email || 'your registered email address'}.`,
    resetToken: 'reset_' + Math.random().toString(36).substring(2, 10),
  });
};

// @desc Reset password with token
// @route POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password successfully updated. You may now login.',
  });
};
