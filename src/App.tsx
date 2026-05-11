import React, { useState, useEffect, useMemo, FormEvent } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ChevronRight, 
  LayoutDashboard, 
  Package, 
  ListOrdered, 
  LogOut, 
  Smartphone,
  CreditCard,
  Truck,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Product, 
  Order, 
  CartItem, 
  Category, 
  Size, 
  OrderStatus, 
  PaymentMethod,
  AdminStats 
} from './types';
import { 
  getProducts, 
  saveProducts, 
  getOrders, 
  saveOrders, 
  getCart, 
  saveCart, 
  generateOrderId 
} from './utils';

// --- Components ---

const Navbar = ({ 
  cartCount, 
  onCartClick, 
  onAdminClick, 
  view,
  isAdminLoggedIn
}: { 
  cartCount: number; 
  onCartClick: () => void; 
  onAdminClick: () => void; 
  view: 'shop' | 'admin';
  isAdminLoggedIn: boolean;
}) => (
  <nav className="sticky top-0 z-40 bg-white border-b border-border-base px-4 py-3 sm:px-8 flex justify-between items-center backdrop-blur-md bg-white/80">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
      <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg shadow-sm shadow-indigo-200">
        <span className="text-white font-bold text-xl">P</span>
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-primary leading-none">Preyo Store</h1>
        <p className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-black hidden sm:block">T-Shirt Emporium</p>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      {view === 'shop' ? (
        <button 
          onClick={onAdminClick}
          className="text-sm font-semibold text-text-muted hover:text-primary transition-colors"
        >
          {isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}
        </button>
      ) : (
        <button 
          onClick={() => window.location.hash = ''}
          className="text-sm font-semibold text-text-muted hover:text-primary transition-colors"
        >
          Back to Shop
        </button>
      )}
      
      {view === 'shop' && (
        <button 
          onClick={onCartClick}
          className="relative p-2 hover:bg-bg-base rounded-full transition-colors group"
          id="cart-button"
        >
          <ShoppingBag size={22} className="text-text-base group-hover:text-primary transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  </nav>
);

const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <section className="px-4 pt-6 pb-12 sm:py-12">
    <div className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-indigo-700 rounded-[2rem] p-8 sm:p-16 text-white shadow-2xl shadow-indigo-200">
        <div className="max-w-xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 border border-white/30">
              Limited Edition Drops
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
              Trendy Tees at <br />Affordable Prices
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-md leading-relaxed opacity-90">
              Discover our new collection of premium cotton oversized streetwear. Comfort meets urban style.
            </p>
            <button 
              onClick={onShopNow}
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            >
              Shop the Drop
            </button>
          </motion.div>
        </div>
        
        {/* Abstract shapes for Sleek theme */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2" />
      </div>
    </div>
  </section>
);

const ProductCard = ({ 
  product, 
  onAddToCart,
  onBuyNow
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative flex flex-col h-full bg-white rounded-xl border border-border-base overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-square overflow-hidden bg-bg-base p-1">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="badge-sleek shadow-sm">
            {product.category}
          </span>
          {product.stock <= 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-text-base leading-tight">{product.name}</h3>
          <p className="font-bold text-sm text-primary">${product.price}</p>
        </div>
        <p className="text-text-muted text-[11px] line-clamp-1 mb-4">{product.description}</p>
        
        <div className="space-y-4 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map(size => (
              <div 
                key={size} 
                className="size-chip-sleek"
              >
                {size}
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className={`flex-1 py-2 rounded-lg font-bold text-[13px] transition-all shadow-indigo-100 hover:shadow-lg ${
                product.stock <= 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-primary text-white hover:bg-primary-hover'
              }`}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              disabled={product.stock <= 0}
              className={`px-3 py-2 rounded-lg font-bold text-[13px] transition-colors ${
                product.stock <= 0 
                ? 'bg-gray-50 text-gray-300 cursor-not-allowed' 
                : 'bg-indigo-50 text-primary hover:bg-indigo-100'
              }`}
              title="Buy Now"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'shop' | 'admin'>('shop');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [isBuyNowFlow, setIsBuyNowFlow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [priceRange] = useState<[number, number]>([0, 100]);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Checkout State
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: 'Cash on Delivery' as PaymentMethod,
    size: '' as Size,
    color: '',
  });

  // Admin Panel Tab
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: 'Classic',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'White'],
    description: '',
    stock: 10,
    imageUrl: '',
  });

  const categories: Category[] = ['Classic', 'Oversized', 'Graphic', 'Couple', 'Premium', 'Custom'];
  const allSizes: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];

  // Load Initial Data
  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrders());
    setCart(getCart());
    
    // Auth check
    const authStatus = localStorage.getItem('preyo_admin_auth');
    if (authStatus === 'true') setIsAdminLoggedIn(true);

    // Hash check for admin
    if (window.location.hash === '#admin') {
      setView('admin');
    }
    
    const handleHashChange = () => {
      if (window.location.hash === '#admin') setView('admin');
      else setView('shop');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync Cart
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Derived State
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const stats = useMemo((): AdminStats => {
    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'Pending').length,
      confirmedOrders: orders.filter(o => o.status === 'Confirmed').length,
      totalSales: orders.filter(o => o.status === 'Delivered' || o.status === 'Confirmed').reduce((sum, o) => sum + o.totalPrice, 0),
    };
  }, [products, orders]);

  // Handlers
  const addToCart = (product: Product, quantity = 1, size?: Size, color?: string) => {
    const existing = cart.find(item => 
      item.id === product.id && 
      item.selectedSize === (size || product.sizes[0]) && 
      item.selectedColor === (color || product.colors[0])
    );

    if (existing) {
      setCart(cart.map(item => 
        item === existing ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity, 
        selectedSize: size || product.sizes[0], 
        selectedColor: color || product.colors[0] 
      }]);
    }
  };

  const updateCartQuantity = (id: string, size: Size, color: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, size: Size, color: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === '123456') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('preyo_admin_auth', 'true');
      setAdminError('');
    } else {
      setAdminError('Invalid username or password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('preyo_admin_auth');
    setView('shop');
    window.location.hash = '';
  };

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);
    
    let orderItems: CartItem[] = [];
    let total = 0;

    if (isBuyNowFlow && selectedProduct) {
      const item: CartItem = {
        ...selectedProduct,
        selectedSize: checkoutData.size || selectedProduct.sizes[0],
        selectedColor: checkoutData.color || selectedProduct.colors[0],
        quantity: 1,
      };
      orderItems = [item];
      total = selectedProduct.price;
    } else {
      orderItems = [...cart];
      total = cartTotal;
    }

    const newOrder: Order = {
      id: generateOrderId(),
      customerName: checkoutData.name,
      phoneNumber: checkoutData.phone,
      email: checkoutData.email,
      address: checkoutData.address,
      items: orderItems,
      totalPrice: total,
      paymentMethod: checkoutData.paymentMethod,
      note: checkoutData.note,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      // Send to Google Sheets
      const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbyiNrOWwaXRxV5vwsM1M1Jwd1NXDELtGGQt-EdzcUZo1tPiOnrvLGD8nNiPX7WT_OG5Lg/exec';
      
      const payload = {
        orderId: newOrder.id,
        name: newOrder.customerName,
        phone: newOrder.phoneNumber,
        email: newOrder.email || 'N/A',
        address: newOrder.address,
        product: orderItems.map(item => item.name).join(', '),
        size: orderItems.map(item => item.selectedSize).join(', '),
        color: orderItems.map(item => item.selectedColor).join(', '),
        quantity: orderItems.map(item => item.quantity).join(', '),
        total: newOrder.totalPrice,
        payment: newOrder.paymentMethod,
        note: newOrder.note || 'N/A'
      };

      // Using no-cors if needed for some GAS setups, but standard fetch normally works for JSON POST
      // However, GAS redirects (302) often cause issues with standard POST in browsers. 
      // We use a standard approach and handle potential redirect issues.
      const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors', // Standard for GAS Web App calls from browser to avoid CORS preflight issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Since we use no-cors, we won't get a proper true/false response, 
      // but the data will be sent. If we didn't use no-cors, we'd check response.ok.

      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      saveOrders(updatedOrders);

      // Update stock
      const updatedProducts = products.map(p => {
        const orderItem = orderItems.find(oi => oi.id === p.id);
        if (orderItem) {
          return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
        }
        return p;
      });
      setProducts(updatedProducts);
      saveProducts(updatedProducts);

      if (!isBuyNowFlow) {
        setCart([]);
      }

      setLastOrderId(newOrder.id);
      setIsCheckoutOpen(false);
      setIsBuyNowFlow(false);
      setSelectedProduct(null);
      setIsOrderSuccess(true);
      
      // Clear checkout form
      setCheckoutData({
        name: '',
        phone: '',
        email: '',
        address: '',
        note: '',
        paymentMethod: 'Cash on Delivery',
        size: '' as Size,
        color: '',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error while connecting to the server. Your order was NOT processed. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const deleteOrder = (id: string) => {
    if (confirm('Delete this order?')) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      saveOrders(updated);
    }
  };

  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...productFormData } : p);
      setProducts(updated);
      saveProducts(updated);
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productFormData,
      };
      const updated = [newProduct, ...products];
      setProducts(updated);
      saveProducts(updated);
    }
    setProductFormData({
      name: '',
      price: 0,
      category: 'Classic',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'White'],
      description: '',
      stock: 10,
      imageUrl: '',
    });
  };

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      <Navbar 
        view={view}
        isAdminLoggedIn={isAdminLoggedIn}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => window.location.hash = 'admin'}
      />

      <main>
        {view === 'shop' ? (
          <>
            <Hero onShopNow={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
            
            <section id="shop" className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-1">Our Collection</h2>
                  <p className="text-gray-500 text-sm">Browsing {filteredProducts.length} unique designs</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative group w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search tees..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select 
                      className="px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:border-primary transition-colors text-sm font-semibold text-text-base appearance-none cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
                    >
                      <option value="All">All Styles</option>
                      <option value="Classic">Classic</option>
                      <option value="Oversized">Oversized</option>
                      <option value="Graphic">Graphic</option>
                      <option value="Couple">Couple</option>
                      <option value="Premium">Premium</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={(p) => {
                        addToCart(p);
                        setIsCartOpen(true);
                      }}
                      onBuyNow={(p) => {
                        setSelectedProduct(p);
                        setIsBuyNowFlow(true);
                        setCheckoutData({...checkoutData, size: p.sizes[0], color: p.colors[0]});
                        setIsCheckoutOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                  <Package className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 transition-colors">Try adjusting your filters or search query.</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl mb-6">
                  <LayoutDashboard size={24} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your credentials to manage the store.</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5 pl-1">Username</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-bg-base border border-border-base rounded-xl outline-none focus:bg-white focus:border-primary transition-all"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="admin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5 pl-1">Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 bg-bg-base border border-border-base rounded-xl outline-none focus:bg-white focus:border-primary transition-all"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                  {adminError && <p className="text-red-500 text-xs font-medium pl-1">{adminError}</p>}
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-indigo-100 mt-2">
                    Access Dashboard
                  </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="w-6 h-6 flex-shrink-0 bg-amber-200 text-amber-700 flex items-center justify-center rounded-full">!</div>
                    <p className="text-[10px] text-amber-800 leading-normal">
                      <strong>Demo Warning:</strong> This app uses <code>localStorage</code>. Data stays in this browser only.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
                  {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'products', icon: Package, label: 'Products' },
                    { id: 'orders', icon: ListOrdered, label: 'Orders' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all border whitespace-nowrap ${adminTab === tab.id ? 'bg-primary text-white shadow-lg border-primary shadow-indigo-100' : 'bg-white text-text-muted hover:bg-bg-base border-border-base'}`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-white text-red-500 hover:bg-red-50 border border-red-50 transition-all mt-auto"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </aside>
                
                {/* Content Area */}
                <div className="flex-grow space-y-6">
                  {adminTab === 'dashboard' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Sales', value: `$${stats.totalSales}`, color: 'bg-green-500' },
                          { label: 'Pending Orders', value: stats.pendingOrders, color: 'bg-amber-500' },
                          { label: 'Total Orders', value: stats.totalOrders, color: 'bg-primary' },
                          { label: 'Products', value: stats.totalProducts, color: 'bg-purple-500' },
                        ].map((s, i) => (
                          <div key={i} className="card-sleek p-6 overflow-hidden relative group">
                            <div className={`absolute top-0 right-0 w-16 h-16 ${s.color} opacity-10 rounded-bl-full translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform`} />
                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">{s.label}</p>
                            <h4 className="text-3xl font-black text-text-base">{s.value}</h4>
                          </div>
                        ))}
                      </div>
                      
                      <div className="card-sleek p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <CreditCard className="text-primary" size={20} /> Recent Orders
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-border-base">
                                <th className="pb-4 text-xs font-bold text-text-muted uppercase tracking-widest">ID</th>
                                <th className="pb-4 text-xs font-bold text-text-muted uppercase tracking-widest">Customer</th>
                                <th className="pb-4 text-xs font-bold text-text-muted uppercase tracking-widest">Total</th>
                                <th className="pb-4 text-xs font-bold text-text-muted uppercase tracking-widest">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border-base/50">
                              {orders.slice(0, 5).map(order => (
                                <tr key={order.id} className="group">
                                  <td className="py-4 text-sm font-mono text-gray-400">{order.id}</td>
                                  <td className="py-4 text-sm font-bold">{order.customerName}</td>
                                  <td className="py-4 text-sm font-black">${order.totalPrice}</td>
                                  <td className="py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {order.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {orders.length === 0 && <p className="text-center py-12 text-gray-400 italic">No orders yet.</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {adminTab === 'products' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* Product Form */}
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleProductSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Name</label>
                              <input 
                                required
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.name}
                                onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Price ($)</label>
                              <input 
                                type="number" required
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.price === 0 ? '' : productFormData.price}
                                onChange={(e) => setProductFormData({...productFormData, price: e.target.value === '' ? 0 : Number(e.target.value)})}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Category</label>
                              <select 
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none cursor-pointer"
                                value={productFormData.category}
                                onChange={(e) => setProductFormData({...productFormData, category: e.target.value as Category})}
                              >
                                {['Classic', 'Oversized', 'Graphic', 'Couple', 'Premium', 'Custom'].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Image URL</label>
                              <input 
                                required
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.imageUrl}
                                onChange={(e) => setProductFormData({...productFormData, imageUrl: e.target.value})}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Description</label>
                              <textarea 
                                required rows={3}
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                                value={productFormData.description}
                                onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Stock Quantity</label>
                              <input 
                                type="number" required
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.stock === 0 ? '' : productFormData.stock}
                                onChange={(e) => setProductFormData({...productFormData, stock: e.target.value === '' ? 0 : Number(e.target.value)})}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Sizes (comma separated)</label>
                              <input 
                                required
                                placeholder="S, M, L, XL"
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.sizes.join(', ')}
                                onChange={(e) => setProductFormData({...productFormData, sizes: e.target.value.split(',').map(s => s.trim().toUpperCase() as Size)})}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Colors (comma separated)</label>
                              <input 
                                required
                                placeholder="Black, White, Blue"
                                className="w-full px-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={productFormData.colors.join(', ')}
                                onChange={(e) => setProductFormData({...productFormData, colors: e.target.value.split(',').map(c => c.trim())})}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <button type="submit" className="flex-grow bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                              {editingProduct ? <Check size={18} /> : <Plus size={18} />}
                              {editingProduct ? 'Update Product' : 'Create Product'}
                            </button>
                            {editingProduct && (
                              <button 
                                type="button"
                                onClick={() => {
                                  setEditingProduct(null);
                                  setProductFormData({
                                    name: '', price: 0, category: 'Classic', sizes: ['M', 'L'], colors: ['White'], description: '', stock: 10, imageUrl: ''
                                  });
                                }}
                                className="px-6 py-3 bg-bg-base text-text-muted rounded-xl font-bold hover:bg-border-base transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Product List */}
                      <div className="space-y-4">
                        {products.map(p => (
                          <div key={p.id} className="card-sleek p-4 flex items-center gap-4 hover:border-primary/20 transition-all">
                            <img src={p.imageUrl} alt="" className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                            <div className="flex-grow">
                              <h4 className="font-bold text-sm text-text-base">{p.name}</h4>
                              <p className="text-text-muted text-xs">${p.price} • {p.category}</p>
                              <div className="flex gap-2 mt-2">
                                <button 
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setProductFormData({...p});
                                  }}
                                  className="text-[10px] font-bold uppercase text-primary hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => deleteProduct(p.id)}
                                  className="text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminTab === 'orders' && (
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                      <div className="flex justify-between items-center mb-10 flex-col sm:flex-row gap-4">
                        <h3 className="text-xl font-bold">Order Management</h3>
                        <div className="relative w-full sm:w-64">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="text" 
                            placeholder="Phone or Order ID..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-base rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            value={orderSearchQuery}
                            onChange={(e) => setOrderSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {orders.filter(o => 
                          o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                          o.phoneNumber.includes(orderSearchQuery) ||
                          o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase())
                        ).map(order => (
                          <div key={order.id} className="card-sleek p-6 group hover:border-primary/20 transition-all">
                            <div className="flex flex-col xl:flex-row justify-between gap-4 mb-4">
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-mono font-bold text-text-muted">{order.id}</span>
                                  <div className="w-1 h-1 bg-border-base rounded-full" />
                                  <span className="text-xs text-text-muted">{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <h4 className="text-lg font-bold text-text-base">{order.customerName}</h4>
                                <p className="text-sm text-text-muted font-medium mb-1">{order.phoneNumber} • {order.email || 'No email'}</p>
                                <p className="text-sm text-text-muted">{order.address}</p>
                              </div>
                              <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-start gap-3">
                                <select 
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider outline-none border transition-all ${
                                    order.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' :
                                    'bg-red-100 text-red-700 border-red-200'
                                  }`}
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <button 
                                  onClick={() => deleteOrder(order.id)}
                                  className="p-2 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="bg-bg-base/50 p-4 rounded-xl border border-border-base space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs font-medium">
                                  <div className="flex gap-3 items-center">
                                    <div className="w-8 h-10 bg-white rounded border border-border-base overflow-hidden">
                                      <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-text-base">{item.name}</p>
                                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-text-base">${item.price * item.quantity}</span>
                                </div>
                              ))}
                              {order.note && (
                                <div className="pt-2 mt-2 border-t border-border-base">
                                  <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Customer Note:</p>
                                  <p className="text-xs text-text-base italic">"{order.note}"</p>
                                </div>
                              )}
                              <div className="pt-2 mt-2 border-t border-border-base flex justify-between items-center">
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-text-muted">Payment</p>
                                  <p className="text-xs font-bold text-primary">{order.paymentMethod}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] uppercase font-bold text-text-muted">Total Amount</p>
                                  <p className="font-black text-primary text-lg leading-tight">${order.totalPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {orders.length === 0 && <div className="text-center py-20 text-gray-400">No customers have placed orders yet.</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-gray-400" /> Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                      <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest leading-none">
                          {item.selectedSize} • {item.selectedColor}
                        </p>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center bg-gray-100 rounded-lg scale-90 -ml-2">
                            <button onClick={() => updateCartQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="p-1.5 hover:bg-gray-200 transition-colors"><Minus size={14} /></button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="p-1.5 hover:bg-gray-200 transition-colors"><Plus size={14} /></button>
                          </div>
                          <p className="font-bold text-sm">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag size={64} className="mb-4" />
                    <p className="text-lg font-bold">Cart is empty</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="text-green-600 font-bold tracking-tight">FREE</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setIsBuyNowFlow(false);
                    }}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-indigo-100"
                  >
                    Checkout Now <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsCheckoutOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[min(800px,90vh)]"
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/80 backdrop-blur-md text-gray-500 hover:text-black rounded-full shadow-sm transition-all z-20 border border-border-base"
              >
                <X size={20} />
              </button>

              {/* Order Summary Side */}
              <div className="hidden md:flex md:w-[38%] bg-bg-base p-8 lg:p-10 border-r border-border-base flex-col h-full overflow-y-auto">
                <h3 className="text-xl font-bold mb-8 text-text-base">Order Summary</h3>
                
                <div className="space-y-6 flex-grow">
                  {isBuyNowFlow && selectedProduct ? (
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-white rounded-xl overflow-hidden shadow-sm border border-border-base flex-shrink-0">
                        <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-base line-clamp-2">{selectedProduct.name}</h4>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">{checkoutData.size} • {checkoutData.color}</p>
                        <p className="text-sm font-black mt-2 text-primary">${selectedProduct.price}</p>
                      </div>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-16 h-20 bg-white rounded-xl overflow-hidden shadow-sm border border-border-base flex-shrink-0">
                          <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-base line-clamp-2">{item.name}</h4>
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">{item.selectedSize} • {item.selectedColor} (x{item.quantity})</p>
                          <p className="text-sm font-black mt-2 text-primary">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-border-base">
                  <div className="flex justify-between items-end">
                    <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Total Amount</p>
                    <p className="text-4xl font-black text-primary leading-none">${isBuyNowFlow ? selectedProduct?.price : cartTotal}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Order Summary (Collapsible or just simplified) */}
              <div className="md:hidden bg-bg-base p-6 border-b border-border-base">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-text-base">Your Order</h3>
                    <p className="text-xs text-text-muted">{isBuyNowFlow ? '1 Item' : `${cart.length} Items`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">${isBuyNowFlow ? selectedProduct?.price : cartTotal}</p>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="flex-grow p-6 sm:p-8 lg:p-12 overflow-y-auto bg-white">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-1 text-text-base">Checkout</h3>
                  <p className="text-text-muted text-sm mb-8">Secure your order by providing delivery details.</p>
                  
                  <form onSubmit={placeOrder} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Receiver Name</label>
                        <input 
                          required
                          placeholder="John Doe"
                          className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all"
                          value={checkoutData.name}
                          onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Mobile Phone</label>
                        <input 
                          required type="tel"
                          placeholder="017xxxxxxxx"
                          className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all"
                          value={checkoutData.phone}
                          onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Email Address (Optional)</label>
                        <input 
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all"
                          value={checkoutData.email}
                          onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                        />
                      </div>
                      
                      {isBuyNowFlow && selectedProduct && (
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Selected Size</label>
                            <select 
                              className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all appearance-none cursor-pointer"
                              value={checkoutData.size}
                              onChange={(e) => setCheckoutData({...checkoutData, size: e.target.value as Size})}
                            >
                              {selectedProduct.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Selected Color</label>
                            <select 
                              className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all appearance-none cursor-pointer"
                              value={checkoutData.color}
                              onChange={(e) => setCheckoutData({...checkoutData, color: e.target.value})}
                            >
                              {selectedProduct.colors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Delivery Address</label>
                        <textarea 
                          required rows={2}
                          placeholder="House No, Area, City..."
                          className="w-full px-5 py-3.5 bg-bg-base border border-border-base rounded-2xl outline-none focus:bg-white focus:border-primary transition-all resize-none"
                          value={checkoutData.address}
                          onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-1">Order Note (Optional)</label>
                        <textarea 
                          rows={1}
                          placeholder="Any special instructions for delivery..."
                          className="w-full px-5 py-2.5 bg-bg-base border border-border-base rounded-xl outline-none focus:bg-white focus:border-primary transition-all resize-none text-sm"
                          value={checkoutData.note}
                          onChange={(e) => setCheckoutData({...checkoutData, note: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border-base">
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1 pl-1">Payment Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'Cash on Delivery', icon: Truck },
                          { id: 'bKash', icon: Smartphone },
                          { id: 'Nagad', icon: Smartphone },
                        ].map(method => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setCheckoutData({...checkoutData, paymentMethod: method.id as PaymentMethod})}
                            className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-xs transition-all border ${checkoutData.paymentMethod === method.id ? 'bg-primary text-white border-primary shadow-lg shadow-indigo-100 scale-[1.02]' : 'bg-white text-text-muted border-border-base hover:bg-bg-base'}`}
                          >
                            <method.icon size={16} />
                            {method.id}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 pb-2">
                      <button 
                        type="submit"
                        disabled={isSubmittingOrder}
                        className={`w-full bg-primary text-white py-5 rounded-2xl font-extrabold text-xl transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 group ${isSubmittingOrder ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover active:scale-[0.98]'}`}
                        id="confirm-order-button"
                      >
                        {isSubmittingOrder ? (
                          <>Processing Order...</>
                        ) : (
                          <>Confirm My Order <Check size={24} className="group-hover:scale-125 transition-transform" /></>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-text-muted font-medium mt-4">
                        By clicking confirm, you agree to our terms of delivery.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOrderSuccess(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-125">
                <Check size={40} />
              </div>
              <h3 className="text-3xl font-black mb-2 text-text-base">Order Confirmed!</h3>
              <p className="text-text-muted mb-8 text-sm leading-relaxed">
                Thank you for your purchase. Your order <span className="font-mono font-bold text-primary">{lastOrderId}</span> has been received and is being processed.
              </p>
              <button 
                onClick={() => setIsOrderSuccess(false)}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:shadow-xl transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-border-base px-4 py-20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-primary">Preyo T-Shirt Store</h2>
            <p className="text-text-muted max-w-sm mb-6 leading-relaxed">Premium quality T-shirts for the modern world. Sustainable fabrics and unique designs crafted for you.</p>
            <div className="flex gap-2 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 max-w-sm backdrop-blur-sm">
              <div className="w-5 h-5 flex-shrink-0 bg-indigo-200 text-primary flex items-center justify-center rounded-full text-[10px] font-black">!</div>
              <p className="text-[10px] text-indigo-700 leading-normal">
                <strong>Local Storage Demo:</strong> Data is private to this browser/device only. For real production, connect to <strong>Firebase</strong> or <strong>Supabase</strong>.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-text-muted">Explore</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="#" className="text-text-base hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#shop" className="text-text-base hover:text-primary transition-colors">T-Shirts</a></li>
              <li><a href="#admin" className="text-text-base hover:text-primary transition-colors">Admin Panel</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-text-muted">Contact Info</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li className="text-text-base">support@preyo.com</li>
              <li className="text-text-base">+880 1234 567 890</li>
              <li className="text-text-base">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border-base flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-text-muted opacity-60">
          <p>© 2026 Preyo T-Shirt Store. Design by Sleek Interface.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
