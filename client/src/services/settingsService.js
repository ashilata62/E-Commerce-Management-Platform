import { localStore } from './mockDataStore';

export const settingsService = {
  getSettings: async () => {
    return { success: true, data: localStore.data.storeSettings };
  },

  updateSettings: async (newData) => {
    localStore.data.storeSettings = { ...localStore.data.storeSettings, ...newData };
    return { success: true, data: localStore.data.storeSettings };
  },

  getUsers: async () => {
    return { success: true, data: localStore.data.users };
  },

  addUser: async (userData) => {
    const newUser = {
      _id: 'usr_' + Date.now(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      ...userData,
    };
    localStore.data.users.push(newUser);
    return { success: true, data: newUser };
  },

  deleteUser: async (id) => {
    const idx = localStore.data.users.findIndex(u => u._id === id);
    if (idx !== -1) localStore.data.users.splice(idx, 1);
    return { success: true };
  },
};
