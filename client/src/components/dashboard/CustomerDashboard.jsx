import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Heart,
  CreditCard,
  Ticket,
  ChevronRight,
  Sparkles,
  MapPin,
  Download,
  RotateCcw,
  ShieldCheck,
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  User,
  Phone,
  Mail,
  Home,
  Briefcase,
  Copy,
  Check,
  Wallet,
  QrCode,
  Camera,
  Calendar,
  ChevronLeft,
  Lock,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

// Default mock saved addresses (Amazon/Flipkart style)
const INITIAL_ADDRESSES = [
  {
    id: 'addr_1',
    name: 'Rohan Deshmukh',
    phone: '+91 98234 56789',
    type: 'Home',
    isDefault: true,
    house: 'Flat 402, Sunshine Heights',
    street: 'Lokhandwala Complex, Link Road',
    landmark: 'Near Infinity Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
  },
  {
    id: 'addr_2',
    name: 'Rohan Deshmukh (Work)',
    phone: '+91 98234 56789',
    type: 'Work',
    isDefault: false,
    house: 'Level 7, Mindspace Tech Park',
    street: 'Building 4, Goregaon East',
    landmark: 'Opposite Western Express Highway',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400063',
  },
  {
    id: 'addr_3',
    name: 'Deshmukh Family (Pune Home)',
    phone: '+91 98900 12345',
    type: 'Other',
    isDefault: false,
    house: 'Bungalow No. 12, Silver Oaks',
    street: 'Koregaon Park Road',
    landmark: 'Near Lane 7 German Bakery',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
  },
];

// Default Saved Payment Methods
const INITIAL_PAYMENTS = [
  {
    id: 'pay_upi_1',
    type: 'UPI',
    provider: 'Google Pay / Axis Bank',
    handle: 'rohan.deshmukh@okaxis',
    isDefault: true,
  },
  {
    id: 'pay_upi_2',
    type: 'UPI',
    provider: 'Paytm Payments Bank',
    handle: '9823456789@paytm',
    isDefault: false,
  },
  {
    id: 'pay_card_1',
    type: 'Card',
    bank: 'HDFC Bank Millennia',
    cardNumber: '•••• •••• •••• 4892',
    network: 'Visa',
    expiry: '08/28',
    isDefault: false,
  },
  {
    id: 'pay_card_2',
    type: 'Card',
    bank: 'ICICI Amazon Pay Credit Card',
    cardNumber: '•••• •••• •••• 7120',
    network: 'Mastercard',
    expiry: '11/27',
    isDefault: false,
  },
];

// Customer Available Coupons
const CUSTOMER_COUPONS = [
  {
    code: 'FESTIVE20',
    discount: '20% FLAT OFF',
    desc: 'Valid on all Ethnic & Western Collection above ₹1,999',
    expires: 'Expires in 5 days',
    minOrder: 1999,
  },
  {
    code: 'FLAT500',
    discount: '₹500 INSTANT OFF',
    desc: 'Applicable on orders above ₹2,999 on Prepaid UPI',
    expires: 'Expires in 8 days',
    minOrder: 2999,
  },
  {
    code: 'FREESHIP',
    discount: 'FREE BLUE DART SHIPPING',
    desc: 'Free express courier delivery on any shopping bag value',
    expires: 'Lifetime Gold Member',
    minOrder: 0,
  },
];

export const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const toast = useToast();

  // Active Screen / Tab: 'hub', 'addresses', 'profile', 'payments', 'coupons'
  const [activeTab, setActiveTab] = useState('hub');

  // Saved Addresses State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('kiaan_customer_addresses');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  // Saved Payments State
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('kiaan_customer_payments');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  // Profile Edit State
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Rohan Deshmukh',
    email: user?.email || 'rohan.shopper@gmail.com',
    phone: user?.phone || '+91 98234 56789',
    gender: 'Male',
    birthday: '1995-10-18',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    walletBalance: 450,
    rewardPoints: 1280,
  });

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    type: 'Home',
    house: '',
    street: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    isDefault: false,
  });

  // Payments Modals
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [newUpiHandle, setNewUpiHandle] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    bank: 'HDFC / SBI / ICICI Bank',
    cardNumber: '',
    expiry: '12/28',
    network: 'Visa',
  });

  const [copiedCode, setCopiedCode] = useState('');

  // Sync addresses to localStorage
  const saveAddresses = (newAddrs) => {
    setAddresses(newAddrs);
    localStorage.setItem('kiaan_customer_addresses', JSON.stringify(newAddrs));
  };

  // Sync payments to localStorage
  const savePayments = (newPays) => {
    setPayments(newPays);
    localStorage.setItem('kiaan_customer_payments', JSON.stringify(newPays));
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied! Paste at checkout.`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleDownloadInvoice = () => {
    toast.success('Downloading Official GST Tax Invoice (PDF)...');
  };

  // Address Handlers
  const handleOpenAddressModal = (addr = null) => {
    if (addr) {
      setEditingAddressId(addr.id);
      setAddressForm({ ...addr });
    } else {
      setEditingAddressId(null);
      setAddressForm({
        name: profileData.name,
        phone: profileData.phone,
        type: 'Home',
        house: '',
        street: '',
        landmark: '',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400053',
        isDefault: addresses.length === 0,
      });
    }
    setShowAddressModal(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.house.trim() || !addressForm.street.trim()) {
      toast.error('Please enter complete street and building details');
      return;
    }

    let updated = [...addresses];
    if (addressForm.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    if (editingAddressId) {
      updated = updated.map((a) =>
        a.id === editingAddressId ? { ...addressForm, id: editingAddressId } : a
      );
      toast.success('Address updated successfully!');
    } else {
      const newAddr = {
        ...addressForm,
        id: 'addr_' + Date.now(),
      };
      updated.push(newAddr);
      toast.success('New delivery address saved to address book!');
    }

    saveAddresses(updated);
    setShowAddressModal(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    saveAddresses(updated);
    toast.success('Address removed');
  };

  const handleSetDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveAddresses(updated);
    toast.success('Default delivery address changed!');
  };

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      avatar: profileData.avatar,
    };
    localStorage.setItem('kiaan_user_info', JSON.stringify(updatedUser));
    toast.success('Profile details updated successfully! ✨');
  };

  // Payment Handlers
  const handleAddUpi = (e) => {
    e.preventDefault();
    if (!newUpiHandle.includes('@')) {
      toast.error('Please enter a valid UPI ID (e.g. mobile@upi)');
      return;
    }
    const newUPI = {
      id: 'pay_upi_' + Date.now(),
      type: 'UPI',
      provider: 'Verified UPI ID',
      handle: newUpiHandle.trim(),
      isDefault: false,
    };
    savePayments([...payments, newUPI]);
    setNewUpiHandle('');
    setShowUpiModal(false);
    toast.success('UPI ID linked for 1-click Express Checkout!');
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCardForm.cardNumber.length < 12) {
      toast.error('Please enter a valid card number');
      return;
    }
    const masked = '•••• •••• •••• ' + newCardForm.cardNumber.slice(-4);
    const newCard = {
      id: 'pay_card_' + Date.now(),
      type: 'Card',
      bank: newCardForm.bank,
      cardNumber: masked,
      network: newCardForm.network,
      expiry: newCardForm.expiry,
      isDefault: false,
    };
    savePayments([...payments, newCard]);
    setShowCardModal(false);
    toast.success('Card securely tokenized & saved for checkout (RBI Compliant)!');
  };

  // Active Shipment
  const activeShipment = {
    orderId: 'ORD-89240',
    itemCount: 2,
    total: 3899,
    items: [
      {
        name: 'Embroidered Anarkali Kurta Set',
        size: 'L',
        qty: 1,
        price: 2499,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
      },
    ],
    status: 'In Transit',
    courier: 'BlueDart Express',
    trackingNumber: 'BLUEDART-IN-8934291',
    estDelivery: 'Tomorrow by 4:00 PM',
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-24 lg:pb-12">
      {/* 1. Profile Header Card (Flipkart/Amazon Style) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6C4DF6] via-[#7F5DF7] to-[#A082F9] text-white p-5 sm:p-7 shadow-soft-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-white shadow-md"
              />
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-xs cursor-pointer"
                title="Edit Photo"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-white">{profileData.name}</h1>
                <span className="text-[10px] font-black px-2 py-0.2 bg-amber-400 text-amber-950 rounded-full">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium">{profileData.phone}</p>
              <p className="text-[11px] text-white/75 truncate max-w-[220px]">{profileData.email}</p>
            </div>
          </div>

          {/* Wallet Coins Box */}
          <div
            onClick={() => setActiveTab('payments')}
            className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all self-stretch sm:self-auto justify-between sm:justify-start"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-white/80 font-bold uppercase">Kiaan Wallet</p>
                <h4 className="text-base font-black text-white">₹{profileData.walletBalance} Coins</h4>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/80" />
          </div>
        </div>
      </div>

      {/* 2. Sub-Tab Header on Mobile with "Back to Account" */}
      {activeTab !== 'hub' && (
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-surface-border shadow-soft-xs">
          <button
            type="button"
            onClick={() => setActiveTab('hub')}
            className="flex items-center gap-1.5 text-xs font-black text-brand-600 hover:text-brand-700 cursor-pointer px-2 py-1 rounded-lg hover:bg-brand-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>← Back to Account Hub</span>
          </button>
          <span className="text-xs font-extrabold text-slateText-muted uppercase tracking-wider pr-2">
            {activeTab === 'addresses'
              ? 'Address Book'
              : activeTab === 'profile'
              ? 'Edit Profile'
              : activeTab === 'payments'
              ? 'Saved Payments'
              : 'My Coupons'}
          </span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 1: MAIN ACCOUNT DASHBOARD (PURE ACCOUNT FEATURES)  */}
      {/* ======================================================== */}
      {activeTab === 'hub' && (
        <div className="space-y-5 animate-fade-in">
          {/* FLIPKART STYLE 4-BUTTON TOP APP SHORTCUTS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/orders"
              className="p-4 rounded-2xl bg-white border border-surface-border shadow-soft-xs hover:border-brand-300 active:scale-95 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center shrink-0 border border-purple-100">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slateText-main truncate">Your Orders</p>
                <p className="text-[10px] text-emeraldGreen-600 font-bold truncate">1 In Transit</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setActiveTab('coupons')}
              className="p-4 rounded-2xl bg-white border border-surface-border shadow-soft-xs hover:border-brand-300 active:scale-95 transition-all flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center shrink-0 border border-fuchsia-100">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slateText-main truncate">Coupons</p>
                <p className="text-[10px] text-fuchsia-600 font-bold truncate">3 Active</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('addresses')}
              className="p-4 rounded-2xl bg-white border border-surface-border shadow-soft-xs hover:border-brand-300 active:scale-95 transition-all flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slateText-main truncate">Addresses</p>
                <p className="text-[10px] text-emerald-600 font-bold truncate">{addresses.length} Saved</p>
              </div>
            </button>

            <Link
              to="/returns"
              className="p-4 rounded-2xl bg-white border border-surface-border shadow-soft-xs hover:border-brand-300 active:scale-95 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slateText-main truncate">Returns / RMA</p>
                <p className="text-[10px] text-slateText-muted truncate">7-Day Window</p>
              </div>
            </Link>
          </div>

          {/* ACTIVE ORDER SUMMARY TILE */}
          <div className="bg-white rounded-3xl border border-surface-border p-4 sm:p-5 shadow-soft-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={activeShipment.items[0].image}
                alt="Active Order"
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-surface-border shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-200">
                    ● {activeShipment.status}
                  </span>
                  <span className="text-xs font-bold text-slateText-main">Order #{activeShipment.orderId}</span>
                </div>
                <p className="text-[11px] text-slateText-muted mt-0.5">
                  Courier: <strong className="text-slateText-main">{activeShipment.courier}</strong> (Arriving Tomorrow)
                </p>
              </div>
            </div>

            <Link
              to="/orders"
              className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shrink-0 shadow-soft-xs"
            >
              Track Order
            </Link>
          </div>

          {/* FLIPKART / AMAZON ACCOUNT SETTINGS LIST GROUP */}
          <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-soft-xs">
            <div className="p-4 border-b border-surface-border bg-surface-muted/30">
              <h3 className="text-xs font-extrabold uppercase text-slateText-muted tracking-wider">
                Account Settings & Preferences
              </h3>
            </div>

            <div className="divide-y divide-surface-border text-xs font-bold text-slateText-main">
              {/* 1. Saved Addresses (The core item requested!) */}
              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className="w-full p-4 flex items-center justify-between hover:bg-surface-muted/60 active:bg-brand-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slateText-main group-hover:text-brand-600 transition-colors">
                      Saved Delivery Addresses
                    </p>
                    <p className="text-[11px] text-slateText-muted font-normal">
                      Manage {addresses.length} delivery addresses (Home, Work, Family)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                    {addresses.length} Places
                  </span>
                  <ChevronRight className="w-4 h-4 text-slateText-muted group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* 2. Saved UPI & Cards */}
              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className="w-full p-4 flex items-center justify-between hover:bg-surface-muted/60 active:bg-brand-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slateText-main group-hover:text-brand-600 transition-colors">
                      Saved Payments & UPI
                    </p>
                    <p className="text-[11px] text-slateText-muted font-normal">
                      Google Pay, Paytm, Tokenized Debit/Credit Cards
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                    {payments.length} Methods
                  </span>
                  <ChevronRight className="w-4 h-4 text-slateText-muted group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* 3. Edit Personal Info */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="w-full p-4 flex items-center justify-between hover:bg-surface-muted/60 active:bg-brand-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slateText-main group-hover:text-brand-600 transition-colors">
                      Personal Information / Edit Profile
                    </p>
                    <p className="text-[11px] text-slateText-muted font-normal">
                      Name, mobile number, email & birthday
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slateText-muted group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 4. Instant WhatsApp & Customer Care */}
              <button
                type="button"
                onClick={() => toast.info('Connecting to 24/7 Priority Support on WhatsApp...')}
                className="w-full p-4 flex items-center justify-between hover:bg-surface-muted/60 active:bg-brand-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slateText-main group-hover:text-brand-600 transition-colors">
                      24/7 Customer Help Center
                    </p>
                    <p className="text-[11px] text-slateText-muted font-normal">
                      Instant chat support & return queries
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slateText-muted group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2: SAVED DELIVERY ADDRESS BOOK                    */}
      {/* ======================================================== */}
      {activeTab === 'addresses' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-surface-border shadow-soft-xs">
            <div>
              <h2 className="text-base font-black text-slateText-main flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" /> Saved Delivery Addresses ({addresses.length})
              </h2>
              <p className="text-xs text-slateText-muted">
                Fast 1-click address selection for checkout
              </p>
            </div>

            <Button
              variant="primary"
              icon={Plus}
              size="sm"
              onClick={() => handleOpenAddressModal()}
            >
              Add Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 rounded-3xl border transition-all relative flex flex-col justify-between bg-white ${
                  addr.isDefault
                    ? 'border-brand-500 ring-2 ring-brand-500/10 shadow-soft-sm'
                    : 'border-surface-border hover:border-brand-200 shadow-soft-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-surface-muted text-slateText-main border border-surface-border">
                      {addr.type === 'Home' ? (
                        <Home className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Briefcase className="w-3 h-3 text-blue-600" />
                      )}
                      {addr.type}
                    </span>

                    {addr.isDefault ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                        ✓ Default Delivery
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[11px] font-bold text-brand-600 hover:underline cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slateText-main">{addr.name}</h4>
                    <p className="text-xs text-slateText-muted mt-0.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slateText-muted/70" />
                      {addr.phone}
                    </p>
                  </div>

                  <p className="text-xs text-slateText-main leading-relaxed bg-surface-muted/50 p-3 rounded-2xl border border-surface-border">
                    {addr.house}, {addr.street}
                    {addr.landmark ? `, Near ${addr.landmark}` : ''}
                    <br />
                    <strong className="text-slateText-main">
                      {addr.city}, {addr.state} — {addr.pincode}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border mt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenAddressModal(addr)}
                    className="p-2 rounded-xl text-slateText-muted hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                    title="Edit Address"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-2 rounded-xl text-slateText-muted hover:text-roseDanger-600 hover:bg-roseDanger-50 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                    title="Delete Address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 3: EDIT PROFILE & PERSONAL INFO                   */}
      {/* ======================================================== */}
      {activeTab === 'profile' && (
        <div className="commerce-card p-5 sm:p-7 max-w-2xl mx-auto space-y-5 animate-fade-in">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slateText-main flex items-center gap-2">
              <User className="w-5 h-5 text-brand-600" /> Edit Personal Information
            </h2>
            <p className="text-xs text-slateText-muted mt-0.5">
              Update your name, mobile number for delivery updates, and birthday perks
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-muted/40 border border-surface-border">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500 shadow-md"
              />
              <div className="space-y-1 flex-1">
                <label className="block text-xs font-bold text-slateText-main">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={profileData.avatar}
                  onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1">
                  Mobile Number (for SMS & WhatsApp Tracking) *
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1">
                  Date of Birth (Birthday Special Deals 🎁)
                </label>
                <input
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) => setProfileData({ ...profileData, birthday: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-surface-border flex justify-end">
              <Button variant="primary" type="submit">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 4: SAVED PAYMENTS & WALLET                        */}
      {/* ======================================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-surface-border shadow-soft-xs">
            <div>
              <h2 className="text-base font-black text-slateText-main flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-600" /> Saved UPI & Cards ({payments.length})
              </h2>
              <p className="text-xs text-slateText-muted">
                1-Click Express Checkout with RBI Tokenized Cards and UPI
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={QrCode}
                onClick={() => setShowUpiModal(true)}
              >
                + Link UPI
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setShowCardModal(true)}
              >
                + Add Card
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  Kiaan Cashback Wallet
                </span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h4 className="text-2xl font-black">₹{profileData.walletBalance}</h4>
                <p className="text-xs text-white/90 mt-0.5">Available Coins (1 Coin = ₹1 INR Discount)</p>
              </div>
            </div>

            {/* Saved Payment Methods List */}
            <div className="space-y-2.5">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-surface-border bg-white shadow-soft-xs flex items-center justify-between gap-3 hover:border-brand-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center text-slateText-main shrink-0 border border-surface-border">
                      {p.type === 'UPI' ? <QrCode className="w-4 h-4 text-emerald-600" /> : <CreditCard className="w-4 h-4 text-brand-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slateText-main">
                        {p.type === 'UPI' ? p.handle : `${p.bank} (${p.network})`}
                      </p>
                      <p className="text-[10px] text-slateText-muted">
                        {p.type === 'UPI' ? p.provider : `${p.cardNumber} • Exp: ${p.expiry}`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = payments.filter((item) => item.id !== p.id);
                      savePayments(updated);
                      toast.success('Payment method removed');
                    }}
                    className="p-1.5 text-slateText-muted hover:text-roseDanger-600 transition-colors cursor-pointer"
                    title="Remove Payment Method"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 5: MY COUPONS                                     */}
      {/* ======================================================== */}
      {activeTab === 'coupons' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-soft-xs">
            <h2 className="text-base font-black text-slateText-main flex items-center gap-2">
              <Ticket className="w-5 h-5 text-brand-600" /> Available Shopping Coupons ({CUSTOMER_COUPONS.length})
            </h2>
            <p className="text-xs text-slateText-muted">
              Copy promo codes to apply extra savings and instant discounts on checkout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CUSTOMER_COUPONS.map((cpn, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-surface-border bg-white shadow-soft-xs hover:shadow-soft-sm transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {cpn.discount}
                    </span>
                    <span className="text-[10px] font-semibold text-slateText-muted">{cpn.expires}</span>
                  </div>

                  <div className="p-2.5 bg-surface-muted rounded-2xl border border-dashed border-brand-300 flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-brand-700 tracking-wider">
                      {cpn.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCoupon(cpn.code)}
                      className="px-2.5 py-1 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === cpn.code ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode === cpn.code ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slateText-muted leading-relaxed">
                    {cpn.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-border text-[10px] text-slateText-muted flex items-center justify-between">
                  <span>Min Order: ₹{cpn.minOrder}</span>
                  <span className="text-emeraldGreen-600 font-bold">100% Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT ADDRESS                                */}
      {/* ======================================================== */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title={editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
      >
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Full Name *</label>
              <input
                type="text"
                value={addressForm.name}
                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                placeholder="Recipient name"
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">10-Digit Mobile Phone *</label>
              <input
                type="tel"
                value={addressForm.phone}
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                placeholder="+91 98000 00000"
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Flat / House No. / Building / Apartment *
            </label>
            <input
              type="text"
              value={addressForm.house}
              onChange={(e) => setAddressForm({ ...addressForm, house: e.target.value })}
              placeholder="e.g. Flat 402, Sunshine Heights"
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Area / Street / Sector / Village *
            </label>
            <input
              type="text"
              value={addressForm.street}
              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
              placeholder="e.g. Lokhandwala Complex, Link Road"
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Landmark (Optional)</label>
              <input
                type="text"
                value={addressForm.landmark}
                onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                placeholder="e.g. Near Mall"
                className="w-full px-3 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">City / Town *</label>
              <input
                type="text"
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                placeholder="Mumbai"
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Pincode *</label>
              <input
                type="text"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                placeholder="400053"
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-bold"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slateText-main">Address Type:</label>
              {['Home', 'Work', 'Other'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAddressForm({ ...addressForm, type: t })}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    addressForm.type === t
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slateText-main border-surface-border hover:bg-surface-muted'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slateText-main cursor-pointer">
              <input
                type="checkbox"
                checked={addressForm.isDefault}
                onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                className="w-4 h-4 rounded text-brand-600 accent-brand-600"
              />
              <span>Set as Default</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: LINK UPI ID */}
      <Modal isOpen={showUpiModal} onClose={() => setShowUpiModal(false)} title="Link New UPI ID">
        <form onSubmit={handleAddUpi} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Enter Virtual Payment Address (VPA)</label>
            <input
              type="text"
              value={newUpiHandle}
              onChange={(e) => setNewUpiHandle(e.target.value)}
              placeholder="e.g. mobile@upi or username@okhdfcbank"
              required
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-surface-border outline-none focus:border-brand-500 font-bold font-mono"
            />
            <p className="text-[11px] text-slateText-muted mt-1">
              Supports Google Pay, PhonePe, Paytm, BHIM and all major UPI apps.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowUpiModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Verify & Save UPI
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD CARD */}
      <Modal isOpen={showCardModal} onClose={() => setShowCardModal(false)} title="Save Card (RBI Tokenized)">
        <form onSubmit={handleAddCard} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Bank Name</label>
            <input
              type="text"
              value={newCardForm.bank}
              onChange={(e) => setNewCardForm({ ...newCardForm, bank: e.target.value })}
              placeholder="e.g. HDFC Bank"
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">16-Digit Card Number</label>
            <input
              type="text"
              value={newCardForm.cardNumber}
              onChange={(e) => setNewCardForm({ ...newCardForm, cardNumber: e.target.value })}
              placeholder="4375 0000 0000 4892"
              maxLength={19}
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none font-mono font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Expiry (MM/YY)</label>
              <input
                type="text"
                value={newCardForm.expiry}
                onChange={(e) => setNewCardForm({ ...newCardForm, expiry: e.target.value })}
                placeholder="12/28"
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Network</label>
              <select
                value={newCardForm.network}
                onChange={(e) => setNewCardForm({ ...newCardForm, network: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-surface-border outline-none font-bold bg-white"
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="RuPay">RuPay</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowCardModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Card
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
