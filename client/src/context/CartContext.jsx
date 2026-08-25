import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { initialMockData } from '../services/mockDataStore';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const toast = useToast();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('kiaan_cart_items');
    return saved ? JSON.parse(saved) : [
      {
        id: 'prd_001',
        name: 'Embroidered Anarkali Kurta Set',
        price: 2499,
        originalPrice: 4999,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
        size: 'M',
        color: 'Ruby Red',
        quantity: 1,
      },
      {
        id: 'prd_004',
        name: 'Zenith Pro Chronograph Watch',
        price: 4499,
        originalPrice: 7999,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
        size: 'Free Size',
        color: 'Rose Gold',
        quantity: 1,
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('kiaan_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize = 'M', selectedColor = 'Default', qty = 1) => {
    const productId = product._id || product.id;
    const itemSize = product.size || selectedSize || 'M';
    const itemColor = product.color || selectedColor || 'Default';
    const itemQty = product.quantity || qty || 1;
    const itemPrice = Number(product.price) || 0;
    const itemOriginalPrice = Number(product.originalPrice || product.compareAtPrice) || Math.round(itemPrice * 1.5);
    const itemImage = product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80';

    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => ((item.id === productId || item._id === productId) && item.size === itemSize)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += itemQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: productId,
            _id: productId,
            name: product.name,
            price: itemPrice,
            originalPrice: itemOriginalPrice,
            image: itemImage,
            size: itemSize,
            color: itemColor,
            quantity: itemQty,
          }
        ];
      }
    });

    toast.success(`Added "${product.name}" (${itemSize}) to Shopping Bag! 🛍️`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !((item.id === id || item._id === id) && item.size === size)));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if ((item.id === id || item._id === id) && item.size === size) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) {
            toast.info(`Removed "${item.name}" from cart`);
            return null;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const applyCouponCode = (code) => {
    const cleanCode = (code || '').toUpperCase().trim();
    if (!cleanCode) return false;

    if (cleanCode === 'WELCOME10' || cleanCode === 'KIAAN10') {
      const discount = Math.round(subtotal * 0.10);
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      setDiscountAmount(discount);
      toast.success(`🎉 Coupon "${cleanCode}" applied! You saved ₹${discount}`);
      return true;
    } else if (cleanCode === 'FESTIVE20' || cleanCode === 'SUPER20') {
      const discount = Math.round(subtotal * 0.20);
      setAppliedCoupon({ code: cleanCode, discountPercent: 20 });
      setDiscountAmount(discount);
      toast.success(`🎉 Mega Coupon "${cleanCode}" applied! You saved ₹${discount}`);
      return true;
    } else if (cleanCode === 'FLAT500') {
      const discount = 500;
      setAppliedCoupon({ code: cleanCode, discountAmount: discount });
      setDiscountAmount(discount);
      toast.success(`🎉 Flat ₹500 OFF applied!`);
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: cleanCode, isFreeDelivery: true });
      toast.success(`🎉 FREE BlueDart Express Shipping unlocked!`);
      return true;
    } else {
      toast.error('Invalid coupon code. Try "FESTIVE20", "FLAT500" or "WELCOME10"');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    toast.info('Coupon removed');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const productDiscount = totalMrp - subtotal;
  const isFreeDeliveryCoupon = appliedCoupon?.isFreeDelivery;
  const deliveryFee = (subtotal >= 999 || subtotal === 0 || isFreeDeliveryCoupon) ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        totalMrp,
        productDiscount,
        discountAmount,
        deliveryFee,
        finalTotal,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCouponCode,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
