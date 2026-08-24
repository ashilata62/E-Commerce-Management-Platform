import { localStore } from './mockDataStore';

export const authService = {
  login: async ({ email, password }) => {
    const user = localStore.data.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || localStore.data.user;
    return {
      success: true,
      token: 'demo_jwt_token_' + Date.now(),
      user,
    };
  },

  getCurrentUser: async () => {
    return { success: true, user: localStore.data.user };
  },

  forgotPassword: async () => {
    return { success: true, message: 'Password recovery sent' };
  },

  resetPassword: async () => {
    return { success: true, message: 'Password updated' };
  },
};
