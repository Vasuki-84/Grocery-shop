import { ShoppingCart, Menu, ArrowLeft, ShieldCheck, LogOut, User } from 'lucide-react';
import { ScreenType, UserRecord } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  cartCount: number;
  currentUser: UserRecord | null;
  onLogout: () => void;
}

export default function Header({ currentScreen, setScreen, cartCount, currentUser, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 py-4">
        {/* Logo and Menu Trigger */}
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' ? (
            <button
              onClick={() => setScreen('home')}
              className="p-1 px-2 text-primary hover:bg-primary-container/20 hover:text-on-primary-container transition-all duration-200 rounded-full active:scale-95"
              title="Go back to Home"
              id="back-home-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setScreen('shop')}
              className="p-2 text-primary hover:bg-primary-container/10 transition-colors rounded-full active:scale-95"
              id="sys-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <span 
            onClick={() => setScreen('home')} 
            className="text-2xl font-bold font-display tracking-tight text-primary cursor-pointer select-none"
            id="grocify-logo"
          >
            Grocify
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => setScreen('home')}
            className={`font-sans text-sm font-semibold tracking-wide transition-all ${
              currentScreen === 'home' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-home"
          >
            Home
          </button>
          <button
            onClick={() => setScreen('shop')}
            className={`font-sans text-sm font-semibold tracking-wide transition-all ${
              currentScreen === 'shop' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-shop"
          >
            Shop
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setScreen('admin')}
              className={`flex items-center gap-1 font-sans text-sm font-semibold tracking-wide transition-all ${
                currentScreen === 'admin' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              id="nav-admin"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              Admin
            </button>
          )}
          {currentUser && (
            <button
              onClick={() => setScreen('profile')}
              className={`font-sans text-sm font-semibold tracking-wide transition-all ${
                currentScreen === 'profile' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              id="nav-profile"
            >
              My Profile
            </button>
          )}
        </nav>

        {/* User controls and Cart count */}
        <div className="flex items-center gap-3">
          {/* Active Logged In Status or Login CTA */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
              <div 
                onClick={() => setScreen('profile')}
                className={`w-7 h-7 cursor-pointer ${currentUser.role === 'admin' ? 'bg-primary' : 'bg-secondary-container'} text-white text-xs font-bold font-display flex items-center justify-center rounded-full shadow-sm hover:scale-105 transition-transform`}
                title="View Profile & Order History"
                id="user-avatar"
              >
                {currentUser.avatarInitials}
              </div>
              <span 
                onClick={() => setScreen('profile')}
                className="hidden sm:inline font-sans text-xs text-on-surface font-medium truncate max-w-[100px] cursor-pointer hover:text-primary transition-colors"
                title="View Profile & Order History"
              >
                {currentUser.name}
              </span>
              <button 
                onClick={onLogout} 
                className="text-on-surface-variant hover:text-error hover:bg-error-container/20 p-1 rounded-full transition-colors active:scale-95"
                title="Logout"
                id="logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setScreen('login')}
              className="hidden md:flex items-center gap-1.5 bg-primary text-white border border-transparent px-5 py-1.5 rounded-full text-xs font-semibold hover:shadow-md hover:brightness-105 transition-all active:scale-95 duration-200"
              id="login-redirect-btn"
            >
              <User className="w-3.5 h-3.5" />
              Login
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => setScreen('cart')}
            className="p-2 relative bg-surface-container hover:bg-primary-container/20 hover:text-primary transition-all rounded-full active:scale-95 group"
            title="View Cart"
            id="view-cart-btn"
          >
            <ShoppingCart className="w-5 h-5 text-on-surface group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span 
                className="absolute -top-1.5 -right-1.5 bg-secondary-container text-on-secondary-container text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md border-2 border-white animate-bounce-slow"
                id="header-cart-badge"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
