import { store } from '../services/dataStore.js';

// @desc Get store settings
// @route GET /api/settings
export const getSettings = async (req, res) => {
  res.json({ success: true, data: store.storeSettings });
};

// @desc Update store settings
// @route PUT /api/settings
export const updateSettings = async (req, res) => {
  store.storeSettings = {
    ...store.storeSettings,
    ...req.body,
  };
  res.json({ success: true, message: 'Settings saved successfully', data: store.storeSettings });
};

// @desc Get team users & roles
// @route GET /api/settings/users
export const getUsersAndRoles = async (req, res) => {
  res.json({ success: true, data: store.users });
};

// @desc Add new team user
// @route POST /api/settings/users
export const addUser = async (req, res) => {
  const newUser = {
    _id: 'usr_' + Date.now(),
    name: req.body.name || 'New Staff Member',
    email: req.body.email,
    role: req.body.role || 'Staff',
    avatar: req.body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: req.body.phone || '+91 98000 00000',
    status: 'Active',
    permissions: req.body.permissions || ['orders'],
  };
  store.users.push(newUser);
  res.status(201).json({ success: true, message: 'Team member added', data: newUser });
};

// @desc Remove team user
// @route DELETE /api/settings/users/:id
export const deleteUser = async (req, res) => {
  const index = store.users.findIndex(u => u._id === req.params.id);
  if (index !== -1) {
    store.users.splice(index, 1);
  }
  res.json({ success: true, message: 'User removed from store team' });
};
