import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('kiaan_user_info');
    return savedUser ? JSON.parse(savedUser) : {
      _id: 'usr_001',
      name: 'Kiaan Sharma',
      email: 'admin@kiaan.com',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98765 43210',
      status: 'Active',
      permissions: ['all'],
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('kiaan_auth_token') || 'demo_token_admin_2026');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('kiaan_auth_token', token);
    } else {
      localStorage.removeItem('kiaan_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kiaan_user_info', JSON.stringify(user));
    } else {
      localStorage.removeItem('kiaan_user_info');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (err) {
      // Fallback demo user login if API call fails
      const fallbackUser = {
        _id: 'usr_001',
        name: email ? email.split('@')[0] : 'Kiaan Sharma',
        email: email || 'admin@kiaan.com',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98765 43210',
        status: 'Active',
        permissions: ['all'],
      };
      setUser(fallbackUser);
      setToken('demo_token_fallback');
      return { success: true, user: fallbackUser };
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = (role) => {
    const demoToken = `demo_token_${role.toLowerCase()}_2026`;
    setToken(demoToken);
    localStorage.setItem('kiaan_auth_token', demoToken);

    if (role === 'Manager') {
      const managerUser = {
        _id: 'usr_002',
        name: 'Aarav Patel',
        email: 'manager@kiaan.com',
        role: 'Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98123 45678',
        status: 'Active',
        permissions: ['products', 'orders', 'customers', 'marketing'],
      };
      setUser(managerUser);
    } else if (role === 'Staff') {
      const staffUser = {
        _id: 'usr_003',
        name: 'Priya Verma',
        email: 'staff@kiaan.com',
        role: 'Staff',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98345 67890',
        status: 'Active',
        permissions: ['orders'],
      };
      setUser(staffUser);
    } else if (role === 'Customer') {
      const customerUser = {
        _id: 'usr_004',
        name: 'Rohan Deshmukh',
        email: 'rohan.shopper@gmail.com',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98234 56789',
        status: 'Active',
        walletBalance: 450,
        rewardPoints: 1280,
        activeOrders: 2,
        wishlistCount: 6,
        permissions: ['customer_portal'],
      };
      setUser(customerUser);
    } else {
      const adminUser = {
        _id: 'usr_001',
        name: 'Kiaan Sharma',
        email: 'admin@kiaan.com',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98765 43210',
        status: 'Active',
        permissions: ['all'],
      };
      setUser(adminUser);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kiaan_auth_token');
    localStorage.removeItem('kiaan_user_info');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, switchDemoRole, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
