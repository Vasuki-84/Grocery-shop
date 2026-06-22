import React, { useState, FormEvent } from 'react';
import { Users, ShoppingBag, Grid, DollarSign, Plus, Trash2, Edit2, Search, Filter, ShieldAlert, ArrowUpRight, Check, X } from 'lucide-react';
import { UserRecord } from '../types';

interface AdminDashboardProps {
  users: UserRecord[];
  onToggleStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onAddUser: (username: string, email: string, amount: number, status: 'Paid' | 'Pending') => void;
}

export default function AdminDashboard({ users, onToggleStatus, onDeleteUser, onAddUser }: AdminDashboardProps) {
  // Category quick management lists
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'Organic Produce', icon: '🌽', color: 'text-primary bg-primary/10' },
    { id: 'cat2', name: 'Bakery & Deli', icon: '🍞', color: 'text-secondary bg-secondary-container/20' },
    { id: 'cat3', name: 'Frozen Goods', icon: '🍦', color: 'text-tertiary bg-tertiary-container/10' },
    { id: 'cat4', name: 'Premium Beverages', icon: '🥤', color: 'text-blue-600 bg-blue-50' }
  ]);
  const [newCatName, setNewCatName] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // User details modal state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAmount, setNewUserAmount] = useState('25.00');
  const [newUserStatus, setNewUserStatus] = useState<'Paid' | 'Pending'>('Paid');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' ? true : user.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const icons = ['🌿', '🍒', '🧇', '🧴', '🥚', '🥫'];
    const selectedIcon = icons[Math.floor(Math.random() * icons.length)];
    setCategories([
      ...categories,
      {
        id: `cat-${Date.now()}`,
        name: newCatName.trim(),
        icon: selectedIcon,
        color: 'text-primary bg-primary/5'
      }
    ]);
    setNewCatName('');
    setIsAddingCat(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleCreateUser = (e: FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Must populate Username and Email fields.');
      return;
    }
    const finalAmount = parseFloat(newUserAmount) || 0;
    onAddUser(newUserName.trim(), newUserEmail.trim(), finalAmount, newUserStatus);
    
    // Clear and close
    setNewUserName('');
    setNewUserEmail('');
    setNewUserAmount('25.00');
    setNewUserStatus('Paid');
    setIsAddUserOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 space-y-8 pb-20">
      
      {/* Overview stats cards (Bento Style) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Users */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white/70 border border-outline-variant/20 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-primary text-xs font-bold flex items-center gap-0.5 bg-primary/5 rounded-full px-2 py-0.5">
              +12% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
              Total Users
            </h3>
            <p className="font-display font-extrabold text-3xl text-on-surface mt-1">
              12,845
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white/70 border border-outline-variant/20 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container/20 text-secondary rounded-2xl group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-primary text-xs font-bold flex items-center gap-0.5 bg-primary/5 rounded-full px-2 py-0.5">
              +8.4% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
              Total Orders
            </h3>
            <p className="font-display font-extrabold text-3xl text-on-surface mt-1">
              45,102
            </p>
          </div>
        </div>

        {/* Active Categories */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white/70 border border-outline-variant/20 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-2xl group-hover:scale-110 transition-transform">
              <Grid className="w-5 h-5 text-tertiary" />
            </div>
            <span className="text-on-surface-variant text-[11px] font-bold bg-neutral-100 rounded-full px-2.5 py-0.5">
              Constant
            </span>
          </div>
          <div>
            <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
              Active Categories
            </h3>
            <p className="font-display font-extrabold text-3xl text-on-surface mt-1">
              {categories.length + 20}
            </p>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="p-6 rounded-3xl bg-primary text-white flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/15 rounded-2xl">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-primary-fixed text-xs font-bold flex items-center gap-0.5 bg-white/10 rounded-full px-2 py-0.5">
              +18% <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-white/70 font-semibold text-xs tracking-wide uppercase font-sans">
              Monthly Income
            </h3>
            <p className="font-display font-extrabold text-3xl text-white mt-1">
              $142,890
            </p>
          </div>
        </div>

      </section>

      {/* Visual Analytics & Categories Management */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales performance custom rendered chart */}
        <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-[28px] shadow-sm bg-white/70 border border-outline-variant/20 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold font-display text-on-surface">Sales Performance</h3>
              <p className="text-xs text-on-surface-variant mt-1">Revenue vs Targets in 2026</p>
            </div>
            <div className="flex gap-1.5 bg-surface-container/40 p-1 rounded-full border border-outline-variant/30 text-xs">
              <button className="px-3 py-1 font-bold rounded-full bg-primary text-white shadow-sm">6 Months</button>
              <button onClick={() => alert("Yearly sales visualization requires full SQL logs.")} className="px-3 py-1 font-medium rounded-full text-on-surface-variant hover:text-primary">Year</button>
            </div>
          </div>

          {/* Pure HTML-SVG custom scalable diagram */}
          <div className="h-64 flex items-end justify-between gap-4 px-2 pt-4 relative">
            <div className="absolute inset-0 top-10 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
              <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
              <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
            </div>

            {/* Sales Bar Graphs */}
            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary/10 rounded-t-xl h-[55%] relative group-hover:bg-primary/20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[85%] group-hover:h-[95%] transition-all duration-500"></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Jan</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary/10 rounded-t-xl h-[68%] relative group-hover:bg-primary/20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[78%] group-hover:h-[90%] transition-all duration-500"></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Feb</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary/10 rounded-t-xl h-[48%] relative group-hover:bg-primary/20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[82%] group-hover:h-[88%] transition-all duration-500"></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Mar</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary/10 rounded-t-xl h-[78%] relative group-hover:bg-primary/20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[92%] group-hover:h-full transition-all duration-500"></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Apr</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary/10 rounded-t-xl h-[64%] relative group-hover:bg-primary/20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[70%] group-hover:h-[82%] transition-all duration-500"></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">May</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
              <div className="w-full bg-primary text-primary-container/20 rounded-t-xl h-[85%] relative transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 bg-primary-container rounded-t-xl h-full font-sans text-white text-[9px] uppercase tracking-wider font-extrabold flex items-center justify-center writing-mode-vertical py-2">
                  Live
                </div>
              </div>
              <span className="text-[10px] uppercase font-extrabold text-primary font-sans">Jun</span>
            </div>

          </div>
        </div>

        {/* Categories Quick Manage Panel */}
        <div className="glass-card p-6 md:p-8 rounded-[28px] shadow-sm bg-white/70 border border-outline-variant/20 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-display text-on-surface">Live Categories</h3>
            <button
              onClick={() => setIsAddingCat(!isAddingCat)}
              className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              title="Add temporary Category"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add category text field */}
          {isAddingCat && (
            <form onSubmit={handleAddCategorySubmit} className="flex gap-2 animate-fade-in font-sans">
              <input
                type="text"
                required
                placeholder="e.g. Frozen Foods"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-grow p-2 text-xs border border-outline-variant focus:ring-1 focus:ring-primary rounded-lg"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-container text-white hover:text-on-primary-container px-3 rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </form>
          )}

          {/* Categories lists mapped */}
          <div className="space-y-3 custom-scrollbar overflow-y-auto max-h-[220px]">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-white text-base rounded-lg shadow-sm">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-bold text-on-surface font-sans">
                    {cat.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-error/40 hover:text-error hover:bg-error-container/20 p-2 rounded-xl transition-all"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* User Transaction & Management Panels */}
      <section className="glass-card rounded-[28px] bg-white/70 border border-outline-variant/20 shadow-sm overflow-hidden">
        
        {/* Header toolbar */}
        <div className="p-6 border-b border-outline-variant/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-display text-on-surface">Manage Signups & Transactions</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Toggle payment indexes, filter rows, or add users to local registry.</p>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center gap-1.5 px-5 py-2 bg-primary text-white border border-transparent rounded-full text-xs font-bold hover:shadow-md active:scale-95 transition-all shadow-sm"
              id="admin-add-user-btn"
            >
              <Plus className="w-4 h-4" />
              Add User Row
            </button>

            {/* Filter buttons */}
            <div className="flex bg-surface-container-low border border-outline-variant/40 p-1 rounded-full text-xs font-medium">
              <button 
                onClick={() => setStatusFilter('All')} 
                className={`px-3 py-1 rounded-full transition-all ${statusFilter === 'All' ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant'}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter('Paid')} 
                className={`px-3 py-1 rounded-full transition-all ${statusFilter === 'Paid' ? 'bg-primary text-white font-bold shadow-sm' : 'text-on-surface-variant'}`}
              >
                Paid
              </button>
              <button 
                onClick={() => setStatusFilter('Pending')} 
                className={`px-3 py-1 rounded-full transition-all ${statusFilter === 'Pending' ? 'bg-[#fea619] text-white font-bold shadow-sm' : 'text-on-surface-variant'}`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Search controls inside table footer/header */}
        <div className="p-4 bg-surface-container-low/40 border-b border-outline-variant/10 flex items-center justify-between gap-4">
          <div className="relative flex-grow max-w-sm">
            <Search className="w-4 h-4 text-on-surface-variant/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user email or credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-outline-variant/40 rounded-full focus:ring-1 focus:ring-primary"
            />
          </div>
          <span className="text-[10px] text-on-surface-variant font-bold font-sans uppercase">
            Showing {filteredUsers.length} of {users.length} registered entries
          </span>
        </div>

        {/* Live Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead className="bg-surface-container-low/20 border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">User Description</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Order Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Transaction Amt</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Payment Status (Interactive Toggle)</th>
                <th className="px-6 py-4 text-xs font-bold text-right uppercase tracking-wider text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 font-bold text-on-surface-variant text-sm">
                    No registry rows match your input constraints.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-primary/5 transition-all">
                    
                    {/* User profile with initial avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                          {user.avatarInitials}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{user.name}</p>
                          <p className="text-on-surface-variant text-[11px] font-sans truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Order Date */}
                    <td className="px-6 py-4 text-on-surface-variant">
                      {user.orderDate || 'No purchases logged'}
                    </td>

                    {/* Transaction Amount */}
                    <td className="px-6 py-4 font-bold text-on-surface text-sm">
                      ${(user.amount ?? 0).toFixed(2)}
                    </td>

                    {/* Interactive payments status switch live badge modification */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold shadow-sm ${
                          user.status === 'Paid' 
                            ? 'bg-primary-container text-on-primary-container' 
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}>
                          {user.status || 'Pending'}
                        </span>

                        {/* Interactive toggle custom checkbox slider */}
                        <button
                          onClick={() => onToggleStatus(user.id)}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors relative flex items-center ${
                            user.status === 'Paid' ? 'bg-primary' : 'bg-outline-variant'
                          }`}
                          title={`Click to set status to ${user.status === 'Paid' ? 'Pending' : 'Paid'}`}
                          id={`toggle-${user.id}`}
                        >
                          <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                            user.status === 'Paid' ? 'translate-x-[18px]' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </td>

                    {/* Row operations delete/remove */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="text-error/50 hover:text-error hover:bg-error-container/20 p-2 rounded-xl transition-all"
                        title="Remove transaction permanently"
                        id={`delete-user-${user.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </section>

      {/* Add User Row Dialog Modals popup (Bypass Relational queries) */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 animate-fade-in shadow-2xl border border-outline-variant/35 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
              <h3 className="text-sm font-extrabold font-display text-primary">Add Row to Sandbox</h3>
              <button 
                onClick={() => setIsAddUserOpen(false)} 
                className="p-1 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Customer Display Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Miller"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah.m@gmail.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="25.00"
                    value={newUserAmount}
                    onChange={(e) => setNewUserAmount(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Payment Status
                  </label>
                  <select
                    value={newUserStatus}
                    onChange={(e) => setNewUserStatus(e.target.value as 'Paid' | 'Pending')}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#fea619] hover:brightness-105 transition-all text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-secondary/15"
              >
                <Check className="w-4 h-4" />
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
