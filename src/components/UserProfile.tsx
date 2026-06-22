import React from 'react';
import { ShoppingBag, MapPin, Receipt, Clock, ArrowLeft, Heart, User, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import { Order, ScreenType, UserRecord } from '../types';

interface UserProfileProps {
  currentUser: UserRecord | null;
  orders: Order[];
  favoritesCount: number;
  cartCount: number;
  setScreen: (screen: ScreenType) => void;
  setActiveCategory: (cat: string) => void;
}

export default function UserProfile({ 
  currentUser, 
  orders, 
  favoritesCount, 
  cartCount, 
  setScreen, 
  setActiveCategory 
}: UserProfileProps) {
  
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Not Logged In</h2>
        <p className="text-on-surface-variant text-sm">Please log in to view your profile and order history.</p>
        <button
          onClick={() => setScreen('login')}
          className="w-full py-3 bg-primary text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          Login Now
        </button>
      </div>
    );
  }

  // Filter orders placed by the current logged-in user
  const userOrders = orders.filter(o => o.userEmail.toLowerCase() === currentUser.email.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 animate-fade-in">
      {/* Back to store navigation header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setScreen('shop')}
          className="p-2 bg-surface-container hover:bg-surface-container-high text-primary hover:text-primary-container rounded-full transition-all active:scale-95"
          title="Back to Shop"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold font-display text-on-surface tracking-tight">My Profile</h1>
          <p className="text-xs text-on-surface-variant font-sans">Manage your transactions, preferences and order deliveries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column - ID Card & Stats stats */}
        <div className="md:col-span-4 space-y-6">
          {/* Main User Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-outline-variant/30 rounded-[24px] p-6 text-center shadow-sm">
            <div className="w-20 h-20 bg-primary text-white text-3xl font-extrabold font-display flex items-center justify-center rounded-full shadow-lg mx-auto mb-4 border-2 border-white">
              {currentUser.avatarInitials}
            </div>
            <h2 className="text-lg font-bold text-on-surface truncate">{currentUser.name}</h2>
            <p className="text-xs text-on-surface-variant mb-4 truncate">{currentUser.email}</p>
            
            <div className="inline-flex items-center gap-1 bg-white/80 border border-outline-variant/20 px-3 py-1 rounded-full text-[11px] font-bold text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              {currentUser.role === 'admin' ? 'Store Administrator' : 'Standard Account'}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-surface-container p-5 rounded-[24px] border border-outline-variant/20 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Quick Activity</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div 
                onClick={() => setScreen('shop')}
                className="bg-white/60 hover:bg-white border border-outline-variant/10 rounded-2xl p-3 text-center cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <ShoppingBag className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="block text-lg font-black text-on-surface">{userOrders.length}</span>
                <span className="text-[9px] text-on-surface-variant font-medium">Orders</span>
              </div>

              <div 
                onClick={() => setScreen('cart')}
                className="bg-white/60 hover:bg-white border border-outline-variant/10 rounded-2xl p-3 text-center cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <ShoppingCart className="w-5 h-5 text-secondary mx-auto mb-1" />
                <span className="block text-lg font-black text-on-surface">{cartCount}</span>
                <span className="text-[9px] text-on-surface-variant font-medium">In Cart</span>
              </div>

              <div 
                onClick={() => {
                  setActiveCategory('All');
                  setScreen('shop');
                }}
                className="bg-white/60 hover:bg-white border border-outline-variant/10 rounded-2xl p-3 text-center cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <Heart className="w-5 h-5 text-error mx-auto mb-1" />
                <span className="block text-lg font-black text-on-surface">{favoritesCount}</span>
                <span className="text-[9px] text-on-surface-variant font-medium">Liked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Full orders history listings */}
        <div className="md:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-on-surface font-display flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Order History
            </h3>
            <span className="text-xs font-semibold text-primary bg-primary-container/25 px-2.5 py-1 rounded-full">{userOrders.length} Completed</span>
          </div>

          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-surface-container/30 border border-dashed border-outline-variant/40 rounded-[28px] p-6">
                <Clock className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
                <h4 className="font-bold text-on-surface text-base mb-1">No Orders Found</h4>
                <p className="text-on-surface-variant text-xs max-w-sm mx-auto mb-6">
                  You haven't purchased anything yet. Load your basket with premium groceries and checkout today!
                </p>
                <button
                  onClick={() => setScreen('shop')}
                  className="bg-primary hover:brightness-105 text-white text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Explore Catalog
                </button>
              </div>
            ) : (
              // Order cards list
              userOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white border border-outline-variant/40 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  {/* Order card heading banner info */}
                  <div className="bg-surface-container/40 p-4 border-b border-outline-variant/20 flex flex-wrap gap-4 justify-between items-center text-xs">
                    <div className="space-y-1">
                      <p className="font-mono text-on-surface-variant font-medium">
                        Order <span className="font-bold text-primary">{order.id}</span>
                      </p>
                      <p className="text-[11px] text-on-surface-variant/80">{order.date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Payment method */}
                      <span className="bg-surface-container text-on-surface font-semibold text-[10px] px-2 py-1 rounded border border-outline-variant/30">
                        {order.paymentMethod}
                      </span>
                      {/* Status indicator badge */}
                      {order.status === 'Paid' ? (
                        <span className="inline-flex items-center gap-1 bg-success-container/10 border border-success/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-secondary">
                          <CheckCircle className="w-3 h-3 text-secondary" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-warning-container/10 border border-warning/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-warning">
                          <AlertCircle className="w-3 h-3 text-warning" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order items lists thumbnail summary rows */}
                  <div className="p-5 space-y-4">
                    <div className="divide-y divide-outline-variant/20 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={item.id + idx} className="flex gap-4 items-center pt-3 first:pt-0">
                          <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/10">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h5 className="text-xs font-bold text-on-surface truncate">{item.name}</h5>
                            <p className="text-[10px] text-on-surface-variant">Qty: {item.quantity} • ₹{item.price.toFixed(2)} each</p>
                          </div>
                          <span className="text-xs font-bold text-on-surface font-mono">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Destination and Address */}
                    <div className="pt-4 border-t border-outline-variant/10 text-[11px] text-on-surface-variant flex items-start gap-2 leading-relaxed bg-surface-container-low/30 p-3 rounded-xl">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-semibold text-on-surface block mb-0.5">Delivery Address</span>
                        <p className="truncate text-on-surface-variant/80">{order.deliveryAddress}</p>
                      </div>
                    </div>

                    {/* Math totals summary rows footer in card */}
                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20 text-xs">
                      <span className="text-on-surface-variant/80">Subtotal: ₹{order.subtotal?.toFixed(2) || (order.total * 0.95).toFixed(2)}</span>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Total Paid</span>
                        <span className="text-base font-extrabold text-primary font-mono">₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
