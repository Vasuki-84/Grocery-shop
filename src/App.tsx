import { useState, useEffect } from 'react';
import { Search, ChevronDown, ListFilter, ShoppingCart, User, ShieldCheck, LogOut, ArrowRight, Activity, Grid } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import CartCheckout from './components/CartCheckout';
import AuthScreen from './components/AuthScreen';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import { ScreenType, Product, CartItem, UserRecord, Order } from './types';
import { PRODUCTS, CATEGORIES, DUMMY_CART_INITIAL, MOCK_USERS_INITIAL } from './data';

export default function App() {
  // Navigation & Page routing states
  const [currentScreen, setScreen] = useState<ScreenType>('home');
  const [activeCategory, setActiveCategory] = useState<string>('Grocery');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  // Dynamic products catalog persisted state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('grocify_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Dynamic categories persisted state
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('grocify_categories');
      return saved ? JSON.parse(saved) : CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  });

  // Dynamic user orders persisted state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('grocify_orders');
      if (saved) return JSON.parse(saved);
      // Give initial order for testing order history view
      return [
        {
          id: 'ORD-548190',
          userEmail: 'tester@test.com',
          date: 'Jun 20, 2026',
          items: [
            {
              id: 'g2',
              name: 'Ripe Hass Avocados',
              price: 2.99,
              quantity: 2,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVk1vBIoDLjux9H6aK5Wbo9S6KTAGqCvM1x6xEEGbcHQFMN6T5GQ8ZgJNK2-e-1iLD7NevoR-m11ufF5xVxX8tAeNL5nPNuNELmGZo3-iYymCq-1BE3diS336_pl0L76poRXxOWYoRwXi9qsVeRP31ZL-OG9uAff8bmrAdZkFrjVNMjfK_4TZnix3mZwd4vlhBFeOQW2N5c0-FSD-QT4QIUsLiu0gH2vCpcCwsEt4lb_-QIRz_GkHsgPTD_FqIK8Ds7ForH3ih6jk'
            },
            {
              id: 'g5',
              name: 'Pure Orange Juice',
              price: 6.99,
              quantity: 1,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDWwY8nYiVXL-sUVUI59UNR65Bc4Uc99QMDDxBj3YprguBkBypTQ8pGbHKHiQcjLDi_p7fuaEIS4zXbYFFMf0SabLEq6KBcaUPRQewL7bhqzisOBeGzpe8cHGfJAGkqm1Onroj-vJ7shlraRx5Rl4U2uinIjPrCsyfjviAiio6K831uQQ9xiJPZ6roPqvNtBPvajDRqz1uzu0p6csKQoIMjSxsaY-RczmslvHEjDiC3EIcBy0Jo_il-j3HxpkbKigEEp9fDA3m5oU'
            }
          ],
          subtotal: 12.97,
          total: 15.62,
          status: 'Paid',
          paymentMethod: 'GPAY',
          deliveryAddress: 'Home • 966, Mettur main road, Kuruppanaikenpalayam , Bhavani , Erode - 638301'
        }
      ];
    } catch {
      return [];
    }
  });

  // Shopping Cart items persisted with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('grocify_cart');
      return saved ? JSON.parse(saved) : DUMMY_CART_INITIAL;
    } catch {
      return DUMMY_CART_INITIAL;
    }
  });

  // Favorites/Likes registration
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('grocify_favorites');
      return saved ? JSON.parse(saved) : ['g1', 'g2', 'j1', 'j4'];
    } catch {
      return ['g1', 'g2', 'j1', 'j4'];
    }
  });

  // Current Logged-in credentials context
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(() => {
    try {
      const saved = localStorage.getItem('grocify_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sandbox user rows persisted
  const [users, setUsers] = useState<UserRecord[]>(() => {
    try {
      const saved = localStorage.getItem('grocify_users');
      return saved ? JSON.parse(saved) : MOCK_USERS_INITIAL;
    } catch {
      return MOCK_USERS_INITIAL;
    }
  });

  // Synchronization with browser storage logs
  useEffect(() => {
    localStorage.setItem('grocify_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('grocify_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('grocify_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('grocify_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('grocify_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('grocify_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('grocify_users', JSON.stringify(users));
  }, [users]);

  // Dynamic cart quantities math calculation
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Client operations: add items directly
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: product.id, product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Likes registry toggle operations
  const handleToggleFavorite = (id: string) => {
    setFavorites(prevFavs =>
      prevFavs.includes(id) ? prevFavs.filter(fId => fId !== id) : [...prevFavs, id]
    );
  };

  // Login handler
  const handleLoginSuccess = (user: UserRecord) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setScreen('admin');
    } else {
      setScreen('shop');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('home');
  };

  // Admin Products CRUD handlers
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    setProducts(prev => [
      ...prev,
      {
        ...newProd,
        id: `prod-${Date.now()}`
      }
    ]);
  };

  const handleUpdateProduct = (id: string, updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === id ? updatedProd : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Admin Categories CRUD handlers
  const handleAddCategory = (newCat: { id: string; name: string; label: string; icon: string }) => {
    setCategories(prev => [...prev, newCat]);
  };

  const handleUpdateCategory = (id: string, updatedCat: { name: string; label: string; icon: string }) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedCat } : c));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Place order from Checkout screen
  const handlePlaceOrder = (newOrder: Omit<Order, 'userEmail'>) => {
    const finalEmail = currentUser ? currentUser.email : 'tester@test.com';
    setOrders(prev => [
      {
        ...newOrder,
        userEmail: finalEmail
      } as Order,
      ...prev
    ]);
  };

  // Admin rows modifier methods
  const handleToggleUserStatus = (id: string) => {
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === id ? { ...u, status: u.status === 'Paid' ? 'Pending' : 'Paid' } : u
      )
    );
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
  };

  const handleAddUser = (name: string, email: string, amount: number, status: 'Paid' | 'Pending') => {
    setUsers(prevUsers => [
      ...prevUsers,
      {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
        avatarInitials: name.slice(0, 2).toUpperCase(),
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount,
        status
      }
    ]);
  };

  const filteredStoreProducts = products.filter(p => {
    const categoryMatches = activeCategory === 'All' ? true : p.category === activeCategory;
    const queryMatches = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.subtext.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && queryMatches;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    // Default popular by review counts or ratings
    return (b.rating ?? 0) - (a.rating ?? 0);
  });

  return (
    <div className="min-h-screen bg-background text-on-background font-sans antialiased flex flex-col justify-between">
      
      {/* Dynamic ambient header sync */}
      <Header 
        currentScreen={currentScreen} 
        setScreen={setScreen} 
        cartCount={totalCartCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main stage canvas layout page container */}
      <main className="flex-grow pt-24 pb-32">
        {currentScreen === 'home' && (
          <HeroSection 
            setScreen={setScreen} 
            setSelectedCategory={setActiveCategory} 
          />
        )}

        {currentScreen === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            {/* Featured top header banner based on selected Category */}
            {activeCategory === 'Personal Care' && (
              <div className="relative overflow-hidden h-40 md:h-52 rounded-[28px] mb-8 group flex items-center p-6 md:p-10 text-white">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    alt="skincare personal banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGr6_IVn_yJcte7hI3-9oDSJVBBK1vRz8nO0Ww4vh0LCIXl15sPCGNzRwlHbxOQg0LezQoWNnOewAT6E5JJLMmhUbkWQUoeXS_VUBZreP82Vz-qqltI56W5mrMCy4RNGodgeBCZMC_RREWpEmfyJmd_SUyd_OY9YQzms7zGtLBMnZ_N_PzfFPK1sUfhYwSLL5JoTcYEBpBd_FXJ2cQmFi9kEh8LLQKX2lvdhrZUBJ1HZVe2ukFul7q_mFIEc8V5N3Gyzkl7J9WBnM"
                  />
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
                </div>
                <div className="relative z-10 space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight shadow-text">Natural Radiance</h2>
                  <p className="text-xs md:text-sm font-light text-white/90">Experience botanical extracts and soothing skincare formulations.</p>
                </div>
              </div>
            )}

            {activeCategory === 'Household' && (
              <div className="relative overflow-hidden h-40 md:h-52 rounded-[28px] mb-8 bg-surface-container-low flex flex-col md:flex-row items-center justify-between p-6 md:p-10 border border-outline-variant/20 shadow-sm">
                <div className="space-y-2 z-10 max-w-sm text-center md:text-left">
                  <span className="bg-primary/10 text-primary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider block w-fit mx-auto md:mx-0">Eco-Friendly Cleaning</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight text-on-surface">Household Essentials</h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Organic plant-based disinfectants kind to your family and environment.</p>
                </div>
                {/* Visual product photo hotlink */}
                <div className="relative h-28 md:h-40 w-full md:w-1/2 mt-4 md:mt-0">
                  <img
                    alt="clean cleaners display container"
                    className="w-full h-full object-contain relative z-10 drop-shadow-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0HfzwVMI4ae1aDLr015JqD-GFw7Y7ozuHusH6N30IL4C-_IhSS5z-kYEHIaLSHcMdzrPwcuvYEP774c2CG3gFLKfK2eEeUokEJF5wAGK0xyLRABKSe4cLL24aUispjqpF4gML-iIur4lGWi99ZujljKVf80WL-0CI1rZMC2Q_U0muzI_KXlYonOpNwtuIsRXjU3U7JyOm14roi87fquHJqaEqmfufEKEqNcXeQ6DoyQPoBJw0IUVcMLSGiMr9FmP2MhzDkIGiIAs"
                  />
                </div>
              </div>
            )}

            {activeCategory === 'Juices' && (
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold font-display text-on-surface leading-tight">Pure Refreshments</h2>
                <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">Artisanal, nutrient-dense cold-pressed juices and organic lemonades to restore energy.</p>
              </div>
            )}

            {activeCategory === 'Stationery' && (
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold font-display text-on-surface leading-tight">Premium Stationery</h2>
                <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">Faded linen journals, professional writing ink pens, and minimalist desktop organizers.</p>
              </div>
            )}

            {activeCategory === 'Grocery' && (
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold font-display text-on-surface leading-tight">Fresh Groceries</h2>
                <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">Certified organic greens, vine Cluster tomatoes, and wholesome dairy selections.</p>
              </div>
            )}

            {/* Category horizontal switcher chips */}
            <div className="flex gap-2.5 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mb-6">
              <button
                onClick={() => setActiveCategory('All')}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-200 outline-none border ${
                  activeCategory === 'All'
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
                }`}
                id="chip-all"
              >
                All categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-200 outline-none border ${
                    activeCategory === cat.id
                      ? 'bg-primary border-primary text-white shadow-md'
                      : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
                  }`}
                  id={`chip-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat.id}
                </button>
              ))}
            </div>

            {/* Search Input and Sort features Filter Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Elastic Search input bar */}
              <div className="relative flex-grow">
                <Search className="w-5 h-5 text-on-surface-variant/70 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search catalog items, features, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container border-none focus:ring-2 focus:ring-primary/20 rounded-2xl text-sm font-sans placeholder:text-on-surface-variant/60"
                  id="storefront-search-input"
                />
              </div>

              {/* Sorting popover simulated trigger */}
              <div className="flex gap-2.5">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="py-4 pl-4 pr-10 rounded-2xl bg-surface-container-high border-none text-xs font-bold text-on-surface-variant focus:ring-2 focus:ring-primary/20"
                  id="sort-select"
                >
                  <option value="popular">Sort: Popular Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Live Store Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredStoreProducts.length === 0 ? (
                <div className="col-span-full text-center py-16 bg-white/40 border border-dashed border-outline-variant/30 rounded-3xl p-6">
                  <p className="text-on-surface-variant mb-3 font-sans">No items matched your current search parameter or selection.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="text-primary font-bold hover:underline"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                filteredStoreProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isFavorited={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              )}
            </div>
            
            {/* View Cart Sticky floating bottom bar indicator (Sync with designs) */}
            {totalCartCount > 0 && (
              <div className="fixed bottom-24 left-0 right-0 px-4 flex justify-center z-40 pointer-events-none md:bottom-12 md:left-auto md:right-10 md:w-auto">
                <button
                  onClick={() => setScreen('cart')}
                  className="pointer-events-auto bg-primary text-white font-bold font-sans shadow-2xl py-4 px-8 rounded-full flex items-center gap-3 hover:brightness-105 active:scale-95 transition-all outline-none"
                  id="floating-cart-anchor"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>View Cart • ₹{cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</span>
                  <div className="bg-secondary text-on-secondary text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {currentScreen === 'cart' && (
          <CartCheckout
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            setScreen={setScreen}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentScreen === 'login' && (
          <AuthScreen onLoginSuccess={handleLoginSuccess} />
        )}

        {currentScreen === 'admin' && (
          <AdminDashboard
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
            onAddUser={handleAddUser}
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {currentScreen === 'profile' && (
          <UserProfile
            currentUser={currentUser}
            orders={orders}
            favoritesCount={favorites.length}
            cartCount={totalCartCount}
            setScreen={setScreen}
            setActiveCategory={setActiveCategory}
          />
        )}
      </main>

      {/* Floating abstract decorative background fruits (Matches premium designs in Prompts) */}
      {(currentScreen === 'home' || currentScreen === 'login') && (
        <>
          <div className="fixed top-24 right-10 w-24 h-24 rotate-12 opacity-30 select-none pointer-events-none z-0 hidden lg:block hover:rotate-45 transition-transform duration-700">
            <img
              alt="gourmet background fresh green apple product detail"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQup6A75Q8Phr5H0zM_oJE8AaAPWd72QSxNqejWavutc3XbNT47LNVYubbKn3XI9THxkSvP1h2ZzHjItcXEKARl1BIwBsuCtO8Lbf-aAK3BvuudR826ZZ-nCkG1WtQMSL0bhFbpU_aEPQvcIEUd8lOvogcYuBpoNlFXcTAGp_f_K0EctAjGnAzwGTiQpIu1otFFiiJvN3yPx9i2woIy0eQdHLahRnVv5R6NYNGPQqqr249R6kGjlZoG6nWOxqhQx9MhxTVDlCUnY4"
            />
          </div>
          <div className="fixed bottom-24 left-10 w-28 h-28 -rotate-12 opacity-30 select-none pointer-events-none z-0 hidden lg:block hover:-rotate-45 transition-transform duration-500">
            <img
              alt="gourmet background fresh orange carrots product detail"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9HGzEy1KFlK3AUUULNMkoy73yysRYslMdf0py6YRio03S11Lg_7YuFXcN7VzabVYJEmxQcQ9HviiprpXg0k1Vtkh83F2xaZm6YhwzG2NMvgyFpxjzNZCMK1MQIEGPW-cE03HwOpRKOtG_O-bmbW8hU0rL0ylDFuoGl9aWfR9yZ8hgxtyW5d5K9wDrAfe50aLSVuFhht4L-FChELQ7iv0TFrAlFJ3rphyQnkBmg7n7d6ZbRZUITLdk2feQeAcUcW3VyKYxhgY5yPg"
            />
          </div>
        </>
      )}

      {/* Global client-side Bottom navigation bar for mobile viewpoint */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-outline-variant/30 flex justify-around items-center px-4 py-3 pb-safe shadow-lg rounded-t-2xl">
        <button
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center justify-center p-2 text-xs font-bold tracking-wide transition-all ${
            currentScreen === 'home' ? 'text-primary' : 'text-on-surface-variant'
          }`}
          id="mobile-nav-home"
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">storefront</span>
          <span>Shop</span>
        </button>
        <button
          onClick={() => {
            setActiveCategory('Grocery');
            setScreen('shop');
          }}
          className={`flex flex-col items-center justify-center p-2 text-xs font-bold tracking-wide transition-all ${
            currentScreen === 'shop' ? 'text-primary' : 'text-on-surface-variant'
          }`}
          id="mobile-nav-categories"
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">category</span>
          <span>Categories</span>
        </button>
        <button
          onClick={() => setScreen('cart')}
          className={`flex flex-col items-center justify-center p-2 text-xs font-bold tracking-wide transition-all ${
            currentScreen === 'cart' ? 'text-primary' : 'text-on-surface-variant'
          }`}
          id="mobile-nav-cart"
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">shopping_basket</span>
          <span>Cart</span>
        </button>
        <button
          onClick={() => setScreen(currentUser ? 'profile' : 'login')}
          className={`flex flex-col items-center justify-center p-2 text-xs font-bold tracking-wide transition-all ${
            currentScreen === 'profile' || currentScreen === 'login' ? 'text-primary' : 'text-on-surface-variant'
          }`}
          id="mobile-nav-profile"
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">person</span>
          <span>{currentUser ? 'Profile' : 'Login'}</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="w-full bg-surface-container-highest border-t border-outline-variant/25 py-12 px-6 md:px-12 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Address */}
          <div className="space-y-4">
            <span className="font-display font-black text-primary text-xl tracking-tight">Grocify Retail</span>
            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <p className="font-semibold text-on-surface text-xs uppercase tracking-wider">Registered Address:</p>
              <p className="text-on-surface-variant">966, Mettur main road, Kuruppanaikenpalayam , Bhavani , Erode - 638301.</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <span className="font-display font-bold text-on-surface text-sm">Contact Us</span>
            <div className="space-y-2 text-xs text-on-surface-variant font-medium leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="font-bold text-on-surface">Phone:</span> +91 9715532466
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold text-on-surface">Email:</span> thangarajaarumugam84@gmail.com
              </p>
              <p className="text-on-surface-variant/80">Certified Organic Foods & Specialty Products doorsteps.</p>
            </div>
          </div>

          {/* Shop Categories Navigation Links */}
          <div className="space-y-4">
            <span className="font-display font-bold text-on-surface text-sm">Shop Categories</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-semibold text-primary">
              <button 
                onClick={() => { setActiveCategory('Grocery'); setScreen('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className="hover:underline text-left outline-none"
              >
                Groceries
              </button>
              <button 
                onClick={() => { setActiveCategory('Stationery'); setScreen('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className="hover:underline text-left outline-none"
              >
                Stationery
              </button>
              <button 
                onClick={() => { setActiveCategory('Juices'); setScreen('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className="hover:underline text-left outline-none"
              >
                Raw Juices
              </button>
              <button 
                onClick={() => { setActiveCategory('Personal Care'); setScreen('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className="hover:underline text-left outline-none"
              >
                Personal Care
              </button>
              <button 
                onClick={() => { setActiveCategory('Household'); setScreen('shop'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className="hover:underline text-left col-span-2 outline-none"
              >
                Household Essentials
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/85 font-medium">
          <span>© 2026 Grocify Retail. Certified organic. All rights reserved.</span>
          <div className="flex gap-6">
            <button onClick={() => alert("Privacy policy document ready in store.")} className="hover:text-primary outline-none">Privacy Policy</button>
            <button onClick={() => alert("Terms of Service document ready in store.")} className="hover:text-primary outline-none">Terms of Service</button>
            <button onClick={() => alert("We are online to assist you at thangarajaarumugam84@gmail.com")} className="hover:text-primary outline-none">Contact Support</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
