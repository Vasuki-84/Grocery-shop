import { useState, FormEvent } from 'react';
import { ShoppingBasket, Mail, Lock, Info, ArrowRight, User } from 'lucide-react';
import { UserRecord } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: UserRecord) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg(' Please enter both email and password.');
      return;
    }

    if (activeTab === 'register' && (!firstName || !lastName)) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }

    // Determine role (mock authentication bypass)
    if (email.toLowerCase() === 'admin@grocify.com' && password === 'admin123') {
      onLoginSuccess({
        id: 'admin-usr',
        name: 'Admin User',
        email: 'admin@grocify.com',
        role: 'admin',
        avatarInitials: 'AU'
      });
    } else {
      // Treat other matching accounts or custom signups as general registers
      const displayTitle = activeTab === 'register' ? `${firstName} ${lastName}` : email.split('@')[0];
      const initials = displayTitle.slice(0, 2).toUpperCase();
      onLoginSuccess({
        id: `user-${Date.now()}`,
        name: activeTab === 'register' ? `${firstName} ${lastName}` : 'Regular Tester',
        email: email,
        role: email.toLowerCase() === 'admin@grocify.com' ? 'admin' : 'user',
        avatarInitials: initials
      });
    }
  };

  const autofill = (role: 'admin' | 'user') => {
    setErrorMsg('');
    if (role === 'admin') {
      setEmail('admin@grocify.com');
      setPassword('admin123');
      setActiveTab('login');
    } else {
      setEmail('tester@test.com');
      setPassword('user123');
      setActiveTab('login');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <ShoppingBasket className="w-8 h-8 text-white animate-spin-slow" />
        </div>
        <h1 className="text-3xl font-extrabold font-display text-primary">Grocify</h1>
        <p className="text-sm text-on-surface-variant max-w-[280px] mt-1.5 font-sans leading-relaxed">
          Premium organic lifestyle products delivered straight to your door.
        </p>
      </div>

      {/* Auth Card container element */}
      <div className="glass-card border border-outline-variant/30 rounded-3xl shadow-xl overflow-hidden bg-white/70">
        
        {/* Toggle tabs */}
        <div className="flex bg-surface-container-low/50 border-b border-outline-variant/20 p-2">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-sm font-bold font-display rounded-2xl transition-all duration-300 ${
              activeTab === 'login'
                ? 'bg-primary text-white shadow-md'
                : 'text-on-surface-variant hover:bg-white/40'
            }`}
            id="tab-login"
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-sm font-bold font-display rounded-2xl transition-all duration-300 ${
              activeTab === 'register'
                ? 'bg-primary text-white shadow-md'
                : 'text-on-surface-variant hover:bg-white/40'
            }`}
            id="tab-register"
          >
            Register
          </button>
        </div>

        {/* Input Details Form */}
        <form onSubmit={handleAuth} className="p-6 space-y-4">
          
          {/* Custom error handling feedback bar */}
          {errorMsg && (
            <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-xs font-semibold leading-normal">
              {errorMsg}
            </div>
          )}

          {activeTab === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 font-sans">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-surface-bright border border-outline-variant/40 focus:border-primary/50 focus:ring-1 focus:ring-primary rounded-xl text-xs font-medium"
                    id="input-firstname"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 font-sans">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-surface-bright border border-outline-variant/40 focus:border-primary/50 focus:ring-1 focus:ring-primary rounded-xl text-xs font-medium"
                    id="input-lastname"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 font-sans">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
              <input
                type="email"
                required
                placeholder="admin@grocify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-surface-bright border border-outline-variant/40 focus:border-primary/50 focus:ring-1 focus:ring-primary rounded-xl text-xs font-medium"
                id="input-email"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-on-surface-variant font-sans">
                Password
              </label>
              {activeTab === 'login' && (
                <button
                  type="button"
                  onClick={() => alert("Simulated reset link sent! Check your inbox.")}
                  className="text-[10px] text-primary hover:underline font-bold"
                  id="forgot-pwd-btn"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-surface-bright border border-outline-variant/40 focus:border-primary/50 focus:ring-1 focus:ring-primary rounded-xl text-xs font-medium"
                id="input-password"
              />
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center gap-2 pt-1 font-sans">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="rounded-md border-outline-variant/60 text-primary focus:ring-primary w-4 h-4"
            />
            <label htmlFor="remember" className="text-xs text-on-surface-variant select-none cursor-pointer">
              Remember me (local session persistence)
            </label>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#fea619] hover:brightness-105 transition-all text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-display shadow-lg shadow-secondary/10 mt-6 active:scale-98"
            id="auth-submit-btn"
          >
            {activeTab === 'login' ? 'Login to Grocify' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Third-party divider */}
        <div className="px-6 pb-6">
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-outline-variant/20"></div>
            <span className="flex-shrink mx-4 text-[10px] text-on-surface-variant/50 font-bold tracking-wider uppercase font-sans">
              Or Connect With
            </span>
            <div className="flex-grow border-t border-outline-variant/20"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-sans">
            <button
              onClick={() => autofill('user')}
              className="flex justify-center items-center gap-2 py-2 px-4 rounded-xl border border-outline-variant/30 bg-neutral-50/50 hover:bg-neutral-100 transition-all text-[11px] font-bold text-on-surface active:scale-95 shadow-sm"
              type="button"
              id="login-google-shortcut"
            >
              <span className="text-xs">Google</span>
            </button>
            <button
              onClick={() => autofill('admin')}
              className="flex justify-center items-center gap-2 py-2 px-4 rounded-xl border border-outline-variant/30 bg-neutral-50/50 hover:bg-neutral-100 transition-all text-[11px] font-bold text-on-surface active:scale-95 shadow-sm"
              type="button"
              id="login-apple-shortcut"
            >
              <span className="text-xs font-display font-semibold">Apple</span>
            </button>
          </div>
        </div>

        {/* Demo credentials helper panel */}
        <div className="bg-surface-container-low/40 p-4 border-t border-outline-variant/25">
          <div className="flex gap-2 items-start text-on-surface-variant/80">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-[10px] font-sans leading-relaxed">
              <p className="font-extrabold text-on-surface text-[11px] mb-1">Interactive Sandbox Shortcuts</p>
              <p className="mb-2">Click any login profile to automatically pre-fill the sandbox fields:</p>
              
              <div className="space-y-1.5 pt-1.5 border-t border-dashed border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => autofill('admin')}
                  className="w-full text-left bg-primary/5 hover:bg-primary/10 border border-primary/20 p-2 rounded-lg transition-colors flex justify-between items-center group font-medium"
                >
                  <span className="text-primary font-bold">🛠️ Admin Account</span>
                  <span className="text-on-surface-variant font-mono">admin@grocify.com (admin123)</span>
                </button>
                <button
                  type="button"
                  onClick={() => autofill('user')}
                  className="w-full text-left bg-secondary-container/10 hover:bg-secondary-container/20 border border-secondary/20 p-2 rounded-lg transition-colors flex justify-between items-center group font-medium"
                >
                  <span className="text-secondary font-bold">🛒 General Shopper</span>
                  <span className="text-on-surface-variant font-mono">tester@test.com (user123)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
