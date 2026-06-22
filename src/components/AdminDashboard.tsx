import React, { useState, FormEvent } from 'react';
import { 
  Users, 
  ShoppingBag, 
  Grid, 
  Plus, 
  Trash2, 
  Edit2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Check, 
  X, 
  Layers, 
  Package, 
  Info, 
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { UserRecord, Product } from '../types';

interface AdminDashboardProps {
  users: UserRecord[];
  onToggleStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onAddUser: (username: string, email: string, amount: number, status: 'Paid' | 'Pending') => void;
  
  // Products state and CRUD props passed from App.tsx
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Product) => void;
  onDeleteProduct: (id: string) => void;

  // Categories state and CRUD props passed from App.tsx
  categories: { id: string; name: string; label: string; icon: string }[];
  onAddCategory: (category: { id: string; name: string; label: string; icon: string }) => void;
  onUpdateCategory: (id: string, category: { name: string; label: string; icon: string }) => void;
  onDeleteCategory: (id: string) => void;
}

export default function AdminDashboard({ 
  users, 
  onToggleStatus, 
  onDeleteUser, 
  onAddUser,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: AdminDashboardProps) {

  // Current subpanel active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'users'>('overview');

  // --- Search & filters for products manager ---
  const [prodSearch, setProdSearch] = useState('');
  const [prodCatFilter, setProdCatFilter] = useState('All');

  // --- Search & filters for users table ---
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  // --- Category Quick Edit/Add states ---
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCatId, setNewCatId] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('storefront');

  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; label: string; icon: string } | null>(null);

  // --- Product Modals/Form States ---
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields for product (Add/Edit)
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodSubtext, setProdSubtext] = useState('');
  const [prodPrice, setProdPrice] = useState('2.99');
  const [prodBadge, setProdBadge] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodRating, setProdRating] = useState('4.8');
  const [prodReviews, setProdReviews] = useState('80');
  const [prodDesc, setProdDesc] = useState('');
  const [prodIsOrganic, setProdIsOrganic] = useState(true);

  // --- User Row Addition States ---
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAmount, setNewUserAmount] = useState('25.00');
  const [newUserStatus, setNewUserStatus] = useState<'Paid' | 'Pending'>('Paid');

  // --- Calculations for metrics ---
  const totalUserAmount = users.reduce((sum, u) => sum + (u.amount ?? 0), 0);
  const calculatedIncome = 142890 + totalUserAmount; // Base plus logged items

  // --- Handlers for User Creation ---
  const handleCreateUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Username and Email fields are required.');
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

  // --- Handlers for Category CRUD ---
  const handleAddCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCatId.trim() || !newCatName.trim()) {
      alert('Please fill out unique Category ID and Name!');
      return;
    }
    onAddCategory({
      id: newCatId.trim(),
      name: newCatName.trim(),
      label: newCatLabel.trim() || `${newCatName.trim()} Items`,
      icon: newCatIcon.trim() || 'storefront'
    });
    setNewCatId('');
    setNewCatName('');
    setNewCatLabel('');
    setNewCatIcon('storefront');
    setIsAddingCat(false);
  };

  const handleUpdateCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    onUpdateCategory(editingCategory.id, {
      name: editingCategory.name,
      label: editingCategory.label,
      icon: editingCategory.icon
    });
    setEditingCategory(null);
  };

  // --- Handlers for Product CRUD ---
  const openProductAddModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory(categories[0]?.id || 'Grocery');
    setProdSubtext('');
    setProdPrice('4.50');
    setProdBadge('Organic');
    setProdImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBsGEIvfRXWxS0SRdNTizLa4uoWdgyua4ft21VcSFXkf2k19mk_pDWy3Sou05iCPE2W9zy1AZtz42DHGvHFHfSZxmP6mXIQLm4Us04NiNAZBQfm5pV4jvy-ny-HHbRHJWNFRYkWDRI6X1bNtLHvYEcwVIXsJRyKTLaq7rntrMg9Pevledp4nCyOi_8zrdnt_uL3vCfZjZS3MRKYxmzkvzVBghWKXmhhDkDjsi4GME2-6f3K59zSLD0aBfTUgtXq037B0RhBCtJZ-Fo');
    setProdRating('4.9');
    setProdReviews('120');
    setProdDesc('Farm-fresh pure quality ingredients, harvested daily for premium nutrition values.');
    setProdIsOrganic(true);
    setIsProductModalOpen(true);
  };

  const openProductEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdSubtext(p.subtext);
    setProdPrice(p.price.toString());
    setProdBadge(p.badge || '');
    setProdImage(p.image);
    setProdRating((p.rating ?? 4.8).toString());
    setProdReviews((p.reviewsCount ?? 75).toString());
    setProdDesc(p.description || '');
    setProdIsOrganic(p.isOrganic ?? false);
    setIsProductModalOpen(true);
  };

  const handleSaveProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodImage.trim()) {
      alert('Product Name and valid Image URL are required!');
      return;
    }

    const payload = {
      category: prodCategory,
      name: prodName.trim(),
      subtext: prodSubtext.trim() || 'Premium Quality Product',
      price: parseFloat(prodPrice) || 0.99,
      badge: prodBadge.trim() || undefined,
      image: prodImage.trim(),
      rating: parseFloat(prodRating) || 4.5,
      reviewsCount: parseInt(prodReviews) || 20,
      description: prodDesc.trim() || undefined,
      isOrganic: prodIsOrganic
    };

    if (editingProduct) {
      // Modify existing
      onUpdateProduct(editingProduct.id, {
        ...payload,
        id: editingProduct.id
      });
    } else {
      // Add new
      onAddProduct(payload);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // --- Filter and Search computations ---
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(prodSearch.toLowerCase()) || 
                          p.subtext.toLowerCase().includes(prodSearch.toLowerCase());
    const matchesCat = prodCatFilter === 'All' ? true : p.category === prodCatFilter;
    return matchesSearch && matchesCat;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesFilter = userStatusFilter === 'All' ? true : user.status === userStatusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 space-y-8 pb-32 animate-fade-in text-on-surface">
      
      {/* Top Admin Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low p-6 rounded-[28px] border border-outline-variant/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-black font-display text-primary flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#fea619] animate-spin-slow" />
            Control Center
          </h1>
          <p className="text-xs text-on-surface-variant font-sans mt-0.5">
            Admin secure session. Manage categories, catalog products, and client logs dynamically.
          </p>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex flex-wrap gap-1 bg-surface-container p-1 rounded-full text-xs font-semibold">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'categories' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Categories ({categories.length})
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Users & Orders
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: OVERVIEW & ANALYTICS ==================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Metrics Bento Row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white/70 border border-outline-variant/20 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-primary text-[10px] font-bold flex items-center gap-0.5 bg-primary/10 rounded-full px-2 py-0.5 shrink-0">
                  +12% <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
                  Total Customers
                </h3>
                <p className="font-display font-extrabold text-3xl text-on-surface mt-1">1,284</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white/70 border border-outline-variant/20 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary-container/20 text-secondary rounded-2xl group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-primary text-[10px] font-bold flex items-center gap-0.5 bg-primary/10 rounded-full px-2 py-0.5 shrink-0">
                  +8.4% <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
                  Completed Shipments
                </h3>
                <p className="font-display font-extrabold text-3xl text-on-surface mt-1">452</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white/70 border border-outline-variant/20 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-2xl group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5 text-tertiary" />
                </div>
                <span className="text-on-surface-variant text-[10px] font-bold bg-neutral-100 rounded-full px-2.5 py-0.5 shrink-0">
                  Interactive
                </span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-semibold text-xs tracking-wide uppercase font-sans">
                  Inventory Items
                </h3>
                <p className="font-display font-extrabold text-3xl text-on-surface mt-1">{products.length} Products</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-primary text-white flex flex-col justify-between shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <span className="text-base font-extrabold">₹</span>
                </div>
                <span className="text-white text-[10px] font-bold flex items-center gap-0.5 bg-white/10 rounded-full px-2 py-0.5 shrink-0">
                  +18% <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-white/80 font-semibold text-xs tracking-wide uppercase font-sans">
                  Monthly Revenue
                </h3>
                <p className="font-display font-extrabold text-3xl text-white mt-1">
                  ₹{calculatedIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          {/* Visual Sales Performance Custom Graph Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-[28px] shadow-sm bg-white/70 border border-outline-variant/20 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold font-display text-on-surface">Store Sales Performance</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Simulated revenue indicators in current quarter (₹ INR)</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-bold">
                  HMR Disabled
                </span>
              </div>

              {/* Pure HTML-SVG custom scalable diagram */}
              <div className="h-64 flex items-end justify-between gap-4 px-2 pt-4 relative border-b border-outline-variant/20">
                <div className="absolute inset-0 top-10 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
                  <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
                  <div className="border-t border-dashed border-outline-variant/10 w-full h-0"></div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary/15 rounded-t-xl h-[45%] relative group-hover:bg-primary/25 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[85%] group-hover:h-[95%] transition-all duration-500"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Jan</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary/15 rounded-t-xl h-[68%] relative group-hover:bg-primary/25 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[75%] group-hover:h-[90%] transition-all duration-500"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Feb</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary/15 rounded-t-xl h-[55%] relative group-hover:bg-primary/25 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[88%] group-hover:h-[95%] transition-all duration-500"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Mar</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary/15 rounded-t-xl h-[85%] relative group-hover:bg-primary/25 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-[#fea619] rounded-t-xl h-[90%] group-hover:h-full transition-all duration-500"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">Apr</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary/15 rounded-t-xl h-[72%] relative group-hover:bg-primary/25 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl h-[65%] group-hover:h-[80%] transition-all duration-500"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant font-sans">May</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative z-10">
                  <div className="w-full bg-primary text-primary-container/20 rounded-t-xl h-[92%] relative transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary-container rounded-t-xl h-full font-sans text-white text-[9px] uppercase tracking-wider font-extrabold flex items-center justify-center writing-mode-vertical py-2">
                      Active
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-primary font-sans">Jun</span>
                </div>
              </div>
            </div>

            {/* Quick tips & sandbox details */}
            <div className="glass-card p-6 md:p-8 rounded-[28px] shadow-sm bg-gradient-to-br from-[#fea619]/5 to-primary/5 border border-outline-variant/30 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fea619]/10 text-secondary border border-[#fea619]/20 rounded-full text-[10px] font-bold">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  Quick Sandbox Tips
                </span>
                <h4 className="text-base font-extrabold font-display">Dynamic State Store</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Products and categories are connected statefully. Any changes made under <strong>Products</strong> or <strong>Categories</strong> tabs will immediately update the shop page and local cart state without loss of data!
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Persistent local storage ensures that even when you refresh the browser page, your new items are preserved!
                </p>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex gap-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 bg-primary hover:brightness-105 transition-all text-white font-bold rounded-xl text-xs flex-1 text-center"
                >
                  Manage Products
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="px-4 py-2 bg-white hover:bg-neutral-50 text-on-surface font-bold rounded-xl text-xs flex-1 text-center border border-outline-variant/40"
                >
                  Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: PRODUCTS CRUD ==================== */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header toolbar for products list panel */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold font-display text-on-surface">Comprehensive Catalog Manager</h2>
              <p className="text-xs text-on-surface-variant">Update item details, pricing, badges, and organic indicators perfectly.</p>
            </div>

            <button
              onClick={openProductAddModal}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#fea619] hover:brightness-105 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Product Item
            </button>
          </div>

          {/* Filtering row */}
          <div className="flex flex-col sm:flex-row gap-3 bg-surface-container/30 p-3 rounded-2xl border border-outline-variant/20">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog by name, details or category..."
                value={prodSearch}
                onChange={(e) => setProdSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white text-xs border border-outline-variant/35 rounded-xl focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-on-surface-variant" />
              <select
                value={prodCatFilter}
                onChange={(e) => setProdCatFilter(e.target.value)}
                className="p-2 py-1.5 bg-white border border-outline-variant/30 rounded-xl text-xs font-bold text-on-surface-variant outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Cards Table/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-surface-container/20 border border-dashed border-outline-variant/30 rounded-[28px] p-6">
                <p className="text-on-surface-variant text-sm font-semibold">No catalog products matched search selection.</p>
                <button onClick={() => { setProdSearch(''); setProdCatFilter('All'); }} className="text-primary font-bold hover:underline text-xs mt-2">Clear Filter</button>
              </div>
            ) : (
              filteredProducts.map(prod => (
                <div key={prod.id} className="bg-white border border-outline-variant/20 rounded-[22px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <div className="relative h-40 bg-surface-container overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-primary/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {prod.category}
                      </span>
                      {prod.badge && (
                        <span className="bg-[#fea619] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-on-surface text-xs truncate leading-snug">{prod.name}</h4>
                      <p className="text-[10px] text-on-surface-variant line-clamp-2 h-7 leading-relaxed mt-0.5">{prod.subtext}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                      <span className="text-primary font-extrabold text-sm font-mono">
                        ₹{prod.price.toFixed(2)}
                      </span>
                      
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => openProductEditModal(prod)}
                          className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-on-surface rounded-lg transition-colors"
                          title="Edit details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${prod.name} from catalog?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 bg-error-container/15 hover:bg-error-container/30 text-error rounded-lg transition-colors"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: CATEGORIES CRUD ==================== */}
      {activeTab === 'categories' && (
        <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
          <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
            <div>
              <h3 className="text-base font-bold font-display text-on-surface">Categories Register</h3>
              <p className="text-[11px] text-on-surface-variant">Configure navigation categories and visual themes.</p>
            </div>
            <button
              onClick={() => {
                setEditingCategory(null);
                setIsAddingCat(!isAddingCat);
              }}
              className="px-3.5 py-1.5 bg-[#fea619] hover:brightness-105 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              New Category
            </button>
          </div>

          {/* Form to Add Dynamic Category */}
          {isAddingCat && !editingCategory && (
            <form onSubmit={handleAddCategorySubmit} className="bg-surface-container p-5 rounded-[24px] border border-outline-variant/30 space-y-4 animate-fade-in text-xs font-sans">
              <h4 className="font-bold text-xs text-primary uppercase tracking-wide">Register New Category</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Unique ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Snacks"
                    value={newCatId}
                    onChange={(e) => setNewCatId(e.target.value)}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Snacks & Chips"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Shop Subtext / Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Tasty gourmet bites"
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Material Symbol Name</label>
                  <input
                    type="text"
                    placeholder="e.g. local_cafe / spa / bakery"
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value)}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCat(false)}
                  className="px-3.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-on-surface rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-white rounded-xl font-bold"
                >
                  Create Category
                </button>
              </div>
            </form>
          )}

          {/* Form to Edit Dynamic Category */}
          {editingCategory && (
            <form onSubmit={handleUpdateCategorySubmit} className="bg-surface-container p-5 rounded-[24px] border border-[#fea619]/40 space-y-4 animate-fade-in text-xs font-sans">
              <h4 className="font-bold text-xs text-primary uppercase tracking-wide">Edit Category: {editingCategory.id}</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Category Label</label>
                  <input
                    type="text"
                    required
                    value={editingCategory.label}
                    onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })}
                    className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Material Symbol Name</label>
                <input
                  type="text"
                  required
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  className="w-full p-2 bg-white border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-3.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-on-surface rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#fea619] text-white rounded-xl font-bold"
                >
                  Update Category
                </button>
              </div>
            </form>
          )}

          {/* Table display list */}
          <div className="space-y-3">
            {categories.map(cat => (
              <div 
                key={cat.id} 
                className="flex items-center justify-between p-4 bg-white border border-outline-variant/20 rounded-2xl shadow-sm hover:border-primary/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <span className="material-symbols-outlined text-[20px] text-primary p-2 bg-primary/10 rounded-xl">
                    {cat.icon || 'storefront'}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-on-surface leading-tight">{cat.name}</h5>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">{cat.label} (ID: {cat.id})</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setIsAddingCat(false);
                    }}
                    className="p-1.5 text-on-surface hover:text-[#fea619] hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-outline-variant/30"
                    title="Edit fields"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`This will delete active Category: ${cat.name}. Continue?`)) {
                        onDeleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 text-error/50 hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==================== TAB 4: USERS & SANDBOX TRANSACTIONS ==================== */}
      {activeTab === 'users' && (
        <section className="glass-card rounded-[28px] bg-white border border-outline-variant/20 shadow-sm overflow-hidden animate-fade-in text-xs">
          {/* Header toolbar */}
          <div className="p-6 border-b border-outline-variant/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold font-display text-on-surface">Manage Client Signups & Logs</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Filter local registry database details or insert transactions manually.</p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#fea619] hover:brightness-105 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add Client Row
              </button>

              {/* Status filter buttons */}
              <div className="flex bg-surface-container/60 border border-outline-variant/30 p-1 rounded-full font-semibold">
                <button 
                  onClick={() => setUserStatusFilter('All')} 
                  className={`px-3 py-1 rounded-full transition-all ${userStatusFilter === 'All' ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setUserStatusFilter('Paid')} 
                  className={`px-3 py-1 rounded-full transition-all ${userStatusFilter === 'Paid' ? 'bg-primary text-white font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Paid
                </button>
                <button 
                  onClick={() => setUserStatusFilter('Pending')} 
                  className={`px-3 py-1 rounded-full transition-all ${userStatusFilter === 'Pending' ? 'bg-secondary text-white font-bold shadow-sm' : 'text-on-surface-variant'}`}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          {/* Search block */}
          <div className="p-4 bg-surface-container-low/40 border-b border-outline-variant/10 flex items-center justify-between gap-4">
            <div className="relative flex-grow max-w-sm">
              <Search className="w-4 h-4 text-on-surface-variant/70 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Client Email or Names..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-outline-variant/40 rounded-full focus:ring-1 focus:ring-primary"
              />
            </div>
            <span className="text-[10px] text-on-surface-variant font-bold font-sans uppercase shrink-0">
              Showing {filteredUsers.length} of {users.length} Database Rows
            </span>
          </div>

          {/* Tables layout logs */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead className="bg-surface-container/20 border-b border-outline-variant/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Client Details</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Last Transaction</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Paid Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Compliance Check (Toggle)</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant">Operations</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 font-bold text-on-surface-variant text-xs">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-primary/5 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                            {user.avatarInitials}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface text-sm">{user.name}</p>
                            <p className="text-on-surface-variant text-[11px] truncate max-w-[200px]">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-on-surface-variant">
                        {user.orderDate || 'No transaction logged'}
                      </td>

                      <td className="px-6 py-4 font-bold text-on-surface text-sm font-mono">
                        ₹{(user.amount ?? 0).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black shadow-sm ${
                            user.status === 'Paid' 
                              ? 'bg-primary-container text-on-primary-container' 
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}>
                            {user.status || 'Pending'}
                          </span>

                          <button
                            onClick={() => onToggleStatus(user.id)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors relative flex items-center ${
                              user.status === 'Paid' ? 'bg-primary' : 'bg-outline-variant'
                            }`}
                            title={`Toggle compliance status to ${user.status === 'Paid' ? 'Pending' : 'Paid'}`}
                          >
                            <span className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-350 ${
                              user.status === 'Paid' ? 'translate-x-[16px]' : 'translate-x-0'
                            }`} />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="text-error hover:bg-error-container/20 p-2 rounded-xl transition-all"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ==================== PRODUCT DETAIL / CREATE MODAL ==================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-6 max-w-lg w-full space-y-4 animate-fade-in shadow-2xl border border-outline-variant/35 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
              <h3 className="text-base font-extrabold font-display text-primary flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {editingProduct ? 'Edit Catalog Product' : 'Add New Catalog Product'}
              </h3>
              <button 
                onClick={() => setIsProductModalOpen(false)} 
                className="p-1.5 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crisp Fuji Apples"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Product Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary font-bold text-on-surface"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Subtext / Marketing Hook</label>
                <input
                  type="text"
                  placeholder="e.g. Harvested daily with sweet organic pulp."
                  value={prodSubtext}
                  onChange={(e) => setProdSubtext(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="4.50"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    placeholder="Organic / On Sale"
                    value={prodBadge}
                    onChange={(e) => setProdBadge(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col justify-end pb-1 pl-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer py-1 select-none">
                    <input
                      type="checkbox"
                      checked={prodIsOrganic}
                      onChange={(e) => setProdIsOrganic(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="text-[11px] font-bold text-on-surface">Is Organic</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="Paste high-res image link..."
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary text-[10px] break-all font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Simulated Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={prodRating}
                    onChange={(e) => setProdRating(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Reviews Count</label>
                  <input
                    type="number"
                    value={prodReviews}
                    onChange={(e) => setProdReviews(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Product Detailed Description</label>
                <textarea
                  placeholder="Detail the ingredients, storage conditions, and certification numbers..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-neutral-50 border border-outline-variant/40 rounded-xl focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#444] rounded-xl font-bold font-sans active:scale-95 transition-all text-xs"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:brightness-105 text-white rounded-xl font-bold font-sans active:scale-95 transition-all text-xs"
                >
                  {editingProduct ? 'Update Product Item' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== USER MANUALLY ADD MODAL ==================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 animate-fade-in shadow-2xl border border-outline-variant/35 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
              <h3 className="text-sm font-extrabold font-display text-primary">Insert Registry Entry</h3>
              <button 
                onClick={() => setIsAddUserOpen(false)} 
                className="p-1 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
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
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
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
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                    Amount (₹)
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
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
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
                className="w-full bg-[#fea619] hover:brightness-105 transition-all text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                Add Entry Row
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
