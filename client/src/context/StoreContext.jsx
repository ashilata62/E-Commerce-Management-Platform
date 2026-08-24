import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [storeStatus, setStoreStatus] = useState('Online'); // Online, Maintenance, Offline
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [unreadNotifications, setUnreadNotifications] = useState(4);
  const [unreadMessages, setUnreadMessages] = useState(22);
  const [notifications, setNotifications] = useState([
    {
      id: 'nt_1',
      title: 'New High-Value Order #ORD-82945',
      message: '₹1,887.9 order received from Sneha Kapadia (Navi Mumbai)',
      time: '5 mins ago',
      read: false,
      type: 'order',
    },
    {
      id: 'nt_2',
      title: 'Low Stock Alert',
      message: 'Classic Chronograph Watch has only 12 units remaining in warehouse.',
      time: '25 mins ago',
      read: false,
      type: 'stock',
    },
    {
      id: 'nt_3',
      title: 'Campaign Milestone Reached 🎉',
      message: 'Mega Summer Sale crossed ₹1,20,000 in gross merchandise value!',
      time: '2 hours ago',
      read: false,
      type: 'campaign',
    },
    {
      id: 'nt_4',
      title: '5-Star Review Received',
      message: 'Meera Rajput reviewed "Embroidered Anarkali Kurta Set"',
      time: '4 hours ago',
      read: false,
      type: 'review',
    },
  ]);

  const toggleStoreStatus = () => {
    setStoreStatus(prev => prev === 'Online' ? 'Maintenance' : 'Online');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadNotifications(0);
  };

  return (
    <StoreContext.Provider value={{
      storeStatus,
      setStoreStatus,
      toggleStoreStatus,
      currency,
      currencySymbol,
      setCurrency,
      unreadNotifications,
      unreadMessages,
      notifications,
      markAllAsRead,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
