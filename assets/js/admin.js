/**
 * VARSHA FURNITURE - Store Owner Admin Dashboard Script
 * Handcrafted in Ahmedabad | Contact: +91 86906 50459
 * Full 11-page Suite: Dashboard, Products, Categories, Orders, Customers,
 * Coupons, Media, Analytics, Reviews, SEO, Settings
 */

(function () {
  'use strict';

  // ---------------- State Management ----------------
  const state = {
    currentView: 'dashboard', // default page
    searchQuery: '',
    selectedCategory: 'All',
    selectedStatus: 'All',
    sortBy: 'default',
    viewMode: 'table', // 'table' | 'grid'
    editingProductId: null,
    isFormDirty: false,
    formInitialState: null,
    pendingActionAfterUnsavedCheck: null,

    // Filter states for orders
    orderFilterStatus: 'All',
    orderSearchQuery: '',

    // Filter states for media
    mediaFilter: 'all'
  };

  // Workshop Default Categories
  const DEFAULT_CATEGORIES = [
    'Dining Chairs',
    'Executive Chairs',
    'Dining Sets',
    'Ergonomic Workstations',
    'Accent & Lounge'
  ];

  // Workshop Badges
  const AVAILABLE_BADGES = [
    '',
    'Bestseller',
    'Signature',
    'Popular',
    'Featured',
    'Exclusive',
    'New Arrival',
    'Top Rated',
    'Value Pick',
    'Masterpiece',
    'Designer Pick'
  ];

  // Workshop Gallery Images (36 authentic photos)
  const WORKSHOP_IMAGES = Array.from({ length: 36 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `assets/images/catalog/varsha-prod-${num}.jpg`;
  });

  // ---------------- Seed / LocalStorage Data Helpers ----------------
  function getStorageData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
    }
    return fallback;
  }

  function setStorageData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Error writing ${key} to storage:`, e);
    }
  }

  // 1. Initial Orders Data
  const INITIAL_ORDERS = [
    {
      id: 'ORD-1084',
      customer: 'Dr. Ketan Shah',
      phone: '+91 98250 14231',
      city: 'Bodakdev, Ahmedabad',
      items: 'Carrara 4-Seater Marble Dining Ensemble (1)',
      total: 28900,
      date: '2026-09-29',
      status: 'Manufacturing',
      notes: 'Composite marble finish with grey leatherette chairs.'
    },
    {
      id: 'ORD-1083',
      customer: 'Priya Mehra',
      phone: '+91 98980 54120',
      city: 'Navrangpura, Ahmedabad',
      items: 'Solstice Studio Executive Chair (2)',
      total: 32400,
      date: '2026-09-28',
      status: 'Pending Dispatch',
      notes: 'Chrome star base with black dual-density headrest.'
    },
    {
      id: 'ORD-1082',
      customer: 'Anand Verma (Tech Innovations)',
      phone: '+91 97129 88340',
      city: 'Gandhinagar, Gujarat',
      items: 'Zenith Ergonomic Workstation Chair (6)',
      total: 45600,
      date: '2026-09-26',
      status: 'Delivered',
      notes: 'Corporate office floor 3 dispatch.'
    },
    {
      id: 'ORD-1081',
      customer: 'Sunil Jhaveri',
      phone: '+91 98240 77190',
      city: 'Satellite, Ahmedabad',
      items: 'Elysian Onyx Marble Dining Suite (1)',
      total: 34500,
      date: '2026-09-25',
      status: 'Delivered',
      notes: 'Luxury booth seating with high-gloss composite marble.'
    },
    {
      id: 'ORD-1080',
      customer: 'Manish Patel',
      phone: '+91 99099 23145',
      city: 'Vastrapur, Ahmedabad',
      items: 'Aria Quilted Mustard Dining Armchair (4)',
      total: 16800,
      date: '2026-09-22',
      status: 'Delivered',
      notes: 'Quilted mustard leatherette with matte black steel legs.'
    }
  ];

  // 2. Initial Customers Data
  const INITIAL_CUSTOMERS = [
    {
      id: 'CUST-01',
      name: 'Dr. Ketan Shah',
      phone: '9825014231',
      email: 'dr.ketan.shah@gmail.com',
      city: 'Ahmedabad, Gujarat',
      ordersCount: 2,
      totalSpent: 42100,
      lastOrder: '2026-09-29'
    },
    {
      id: 'CUST-02',
      name: 'Priya Mehra',
      phone: '9898054120',
      email: 'priya.mehra@outlook.com',
      city: 'Ahmedabad, Gujarat',
      ordersCount: 1,
      totalSpent: 32400,
      lastOrder: '2026-09-28'
    },
    {
      id: 'CUST-03',
      name: 'Anand Verma',
      company: 'Tech Innovations Pvt Ltd',
      phone: '9712988340',
      email: 'anand.verma@techinnovate.in',
      city: 'Gandhinagar, Gujarat',
      ordersCount: 3,
      totalSpent: 89400,
      lastOrder: '2026-09-26'
    },
    {
      id: 'CUST-04',
      name: 'Sunil Jhaveri',
      phone: '9824077190',
      email: 'sunil.jhaveri@yahoo.co.in',
      city: 'Ahmedabad, Gujarat',
      ordersCount: 1,
      totalSpent: 34500,
      lastOrder: '2026-09-25'
    },
    {
      id: 'CUST-05',
      name: 'Manish Patel',
      phone: '9909923145',
      email: 'manish.patel84@gmail.com',
      city: 'Ahmedabad, Gujarat',
      ordersCount: 2,
      totalSpent: 26200,
      lastOrder: '2026-09-22'
    },
    {
      id: 'CUST-06',
      name: 'Deepak Sharma',
      phone: '9820144556',
      email: 'd.sharma@mumbaicorp.com',
      city: 'Mumbai, Maharashtra',
      ordersCount: 1,
      totalSpent: 16800,
      lastOrder: '2026-09-18'
    }
  ];

  // 3. Initial Coupons Data
  const INITIAL_COUPONS = [
    {
      id: 'CPN-01',
      code: 'WORKSHOP10',
      discount: '10% OFF',
      desc: '10% discount on dining suites above ₹25,000.',
      expiry: '2026-12-31',
      status: 'Active',
      used: 19
    },
    {
      id: 'CPN-02',
      code: 'FESTIVE5',
      discount: '5% OFF',
      desc: 'Direct factory discount for festive pre-orders.',
      expiry: '2026-11-15',
      status: 'Active',
      used: 34
    },
    {
      id: 'CPN-03',
      code: 'BULKCHAIR',
      discount: '₹1,500 OFF',
      desc: 'Flat ₹1,500 savings on orders of 4 or more dining chairs.',
      expiry: '2026-10-31',
      status: 'Active',
      used: 8
    },
    {
      id: 'CPN-04',
      code: 'MONSOON26',
      discount: '7% OFF',
      desc: 'Monsoon special workshop promo voucher.',
      expiry: '2026-08-31',
      status: 'Expired',
      used: 42
    }
  ];

  // 4. Initial Reviews Data
  const INITIAL_REVIEWS = [
    {
      id: 'REV-01',
      author: 'Dr. Ketan Shah',
      city: 'Ahmedabad',
      rating: 5,
      product: 'Carrara 4-Seater Marble Dining Ensemble',
      text: 'Superb quality composite marble and very sturdy chairs. Bought directly from Singarwa workshop without any middleman charges.',
      date: '2026-09-25',
      status: 'Approved'
    },
    {
      id: 'REV-02',
      author: 'Anand Verma',
      city: 'Gandhinagar',
      rating: 5,
      product: 'Zenith Ergonomic Workstation Chair',
      text: 'We outfitted our corporate development floor with 6 Zenith chairs. Exceptional lower back support for long coding shifts.',
      date: '2026-09-22',
      status: 'Approved'
    },
    {
      id: 'REV-03',
      author: 'Bhavna Trivedi',
      city: 'Ahmedabad',
      rating: 5,
      product: 'Aria Quilted Mustard Dining Armchair',
      text: 'The mustard color matches our dining room flawlessly. Diamond stitching is done with immense precision.',
      date: '2026-09-18',
      status: 'Approved'
    },
    {
      id: 'REV-04',
      author: 'Sunil Jhaveri',
      city: 'Ahmedabad',
      rating: 5,
      product: 'Solstice Studio Executive Chair',
      text: 'Solid heavy chrome base and genuine high-density comfort. Worth every rupee.',
      date: '2026-09-12',
      status: 'Approved'
    }
  ];

  // 5. Initial SEO Settings
  const INITIAL_SEO = {
    title: 'Varsha Furniture | Handcrafted Luxury & Executive Seating Ahmedabad',
    metaDesc: 'Varsha Furniture Ahmedabad - Premium Handcrafted Dining Chairs, Composite Marble Dining Suites, and Executive Ergonomic Seating directly from our workshop.',
    keywords: 'varsha furniture, dining chairs ahmedabad, marble dining set, executive office chair, singarwa furniture workshop',
    googleUrl: 'https://varshafurniture.com/'
  };

  // 6. Initial Store Settings
  const INITIAL_SETTINGS = {
    storeName: 'Varsha Furniture',
    workshopAddress: 'Shop No 41, Shraddha industrial hub, 43, Indore - Ahmedabad Hwy, Singarwa, Ahmedabad, Gujarat 382430',
    phone: '8690650459',
    phoneFormatted: '+91 86906 50459',
    whatsapp: '918690650459',
    email: 'contact@varshafurniture.com',
    currency: '₹ (INR)',
    taxGst: '18% GST Included',
    freeDeliveryMin: '25000'
  };

  // ---------------- Data Accessors ----------------
  function getCatalog() {
    if (typeof getVarshaProducts === 'function') {
      return getVarshaProducts();
    }
    return window.VARSHA_PRODUCTS || [];
  }

  function saveCatalog(newCatalog) {
    try {
      localStorage.setItem('varsha_furniture_catalog', JSON.stringify(newCatalog));
      if (typeof window !== 'undefined') {
        window.VARSHA_PRODUCTS = newCatalog;
      }
    } catch (e) {
      console.error('Failed to save catalog to localStorage', e);
      showToast('Could not save to browser storage. Your browser may have storage disabled.', 'error');
      return false;
    }
    renderCurrentView();
    updateSidebarCounts();
    return true;
  }

  // Sync individual product changes with Cloudflare D1
  async function syncProductToD1(productData, isEdit) {
    try {
      await fetch('/api/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    } catch (e) {
      console.warn('Could not sync product with D1 API:', e);
    }
  }

  // Sync order status updates with Cloudflare D1
  async function syncOrderStatusToD1(orderId, newStatus) {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
    } catch (e) {
      console.warn('Could not sync order status with D1 API:', e);
    }
  }

  // Fetch live products and orders from Cloudflare D1 on admin boot
  async function loadAdminDataFromD1() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          const mapped = data.products.map(p => ({
            ...p,
            originalPrice: p.original_price ?? p.originalPrice
          }));
          window.VARSHA_PRODUCTS = mapped;
          localStorage.setItem('varsha_furniture_catalog', JSON.stringify(mapped));
          renderCurrentView();
          updateSidebarCounts();
        }
      }
    } catch (e) {}

    try {
      const resOrders = await fetch('/api/orders');
      if (resOrders.ok) {
        const dataOrders = await resOrders.json();
        if (dataOrders.success && Array.isArray(dataOrders.orders) && dataOrders.orders.length > 0) {
          setStorageData('vf_orders_data', dataOrders.orders);
          renderOrders();
          renderDashboard();
        }
      }
    } catch (e) {}
  }

  function getOrders() {
    return getStorageData('vf_orders_data', INITIAL_ORDERS);
  }

  function saveOrders(data) {
    setStorageData('vf_orders_data', data);
    renderOrders();
    renderDashboard();
    updateSidebarCounts();
  }

  function getCustomers() {
    return getStorageData('vf_customers_data', INITIAL_CUSTOMERS);
  }

  function saveCustomers(data) {
    setStorageData('vf_customers_data', data);
    renderCustomers();
    updateSidebarCounts();
  }

  function getCoupons() {
    return getStorageData('vf_coupons_data', INITIAL_COUPONS);
  }

  function saveCoupons(data) {
    setStorageData('vf_coupons_data', data);
    renderCoupons();
    updateSidebarCounts();
  }

  function getReviews() {
    return getStorageData('vf_reviews_data', INITIAL_REVIEWS);
  }

  function saveReviews(data) {
    setStorageData('vf_reviews_data', data);
    renderReviews();
    updateSidebarCounts();
  }

  function getSeo() {
    return getStorageData('vf_seo_data', INITIAL_SEO);
  }

  function saveSeo(data) {
    setStorageData('vf_seo_data', data);
    renderSeo();
  }

  function getSettings() {
    return getStorageData('vf_settings_data', INITIAL_SETTINGS);
  }

  function saveSettings(data) {
    setStorageData('vf_settings_data', data);
    renderSettings();
  }

  // ---------------- Currency Helper ----------------
  function formatINR(val) {
    if (!val && val !== 0) return '₹0';
    return '₹' + Number(val).toLocaleString('en-IN');
  }

  // ---------------- Toast Notification ----------------
  function showToast(message, type = 'success') {
    const toast = document.getElementById('admin-toast');
    const toastMsg = document.getElementById('admin-toast-msg');
    const toastIcon = document.getElementById('admin-toast-icon');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.className = `admin-toast ${type} show`;

    if (toastIcon) {
      if (type === 'error') {
        toastIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      } else {
        toastIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      }
    }

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ---------------- Master View Switching ----------------
  const VIEW_TITLES = {
    dashboard: 'Store Dashboard',
    products: 'All Products',
    categories: 'Categories & Collections',
    orders: 'Workshop Orders & Inquiries',
    customers: 'Customer Directory',
    coupons: 'Discount Coupons & Vouchers',
    media: 'Media Asset Library',
    analytics: 'Performance & Sales Analytics',
    reviews: 'Customer Reviews & Testimonials',
    seo: 'Search Engine Optimization (SEO)',
    settings: 'Store & Workshop Settings'
  };

  function switchView(viewName) {
    if (state.isFormDirty) {
      showUnsavedWarning(() => {
        state.isFormDirty = false;
        closeProductModal(true);
        switchView(viewName);
      });
      return;
    }

    state.currentView = viewName;

    // Update navigation active states
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
      const target = btn.getAttribute('data-view');
      btn.classList.toggle('active', target === viewName);
    });

    // Update main view panels
    document.querySelectorAll('.admin-view').forEach(panel => {
      const panelView = panel.getAttribute('data-view');
      panel.classList.toggle('active', panelView === viewName);
    });

    // Update topbar breadcrumbs
    const pageTitleElem = document.getElementById('topbar-page-title');
    if (pageTitleElem) {
      pageTitleElem.textContent = VIEW_TITLES[viewName] || 'Store Manager';
    }

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render targeted view
    renderCurrentView();
  }

  function renderCurrentView() {
    switch (state.currentView) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'products':
        renderProductsPage();
        break;
      case 'categories':
        renderCategories();
        break;
      case 'orders':
        renderOrders();
        break;
      case 'customers':
        renderCustomers();
        break;
      case 'coupons':
        renderCoupons();
        break;
      case 'media':
        renderMedia();
        break;
      case 'analytics':
        renderAnalytics();
        break;
      case 'reviews':
        renderReviews();
        break;
      case 'seo':
        renderSeo();
        break;
      case 'settings':
        renderSettings();
        break;
      default:
        renderDashboard();
        break;
    }
  }

  function updateSidebarCounts() {
    const catalog = getCatalog();
    const orders = getOrders();
    const coupons = getCoupons();
    const reviews = getReviews();

    const elProd = document.getElementById('sidebar-count-products');
    const elOrders = document.getElementById('sidebar-count-orders');
    const elCoupons = document.getElementById('sidebar-count-coupons');
    const elReviews = document.getElementById('sidebar-count-reviews');

    if (elProd) elProd.textContent = catalog.length;
    if (elOrders) elOrders.textContent = orders.length;
    if (elCoupons) elCoupons.textContent = coupons.filter(c => c.status === 'Active').length;
    if (elReviews) elReviews.textContent = reviews.length;
  }

  // ---------------- 1. DASHBOARD / OVERVIEW PAGE ----------------
  function renderDashboard() {
    const catalog = getCatalog();
    const orders = getOrders();
    const totalCount = catalog.length;

    // Categories Count
    const categoriesSet = new Set(catalog.map(p => p.category).filter(Boolean));
    const totalCategories = categoriesSet.size;

    // Revenue calculation from orders
    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);

    // Stock availability
    const inStockCount = catalog.filter(p => !p.status || p.status === 'In Stock').length;
    const outOfStockCount = catalog.filter(p => p.status === 'Out of Stock').length;

    // Attention items
    const missingOriginalPrice = catalog.filter(p => !p.originalPrice || Number(p.originalPrice) <= Number(p.price));
    const attentionNeededCount = missingOriginalPrice.length + outOfStockCount;

    // Stat Elements
    const elTotal = document.getElementById('stat-total-products');
    const elRevenue = document.getElementById('stat-dashboard-revenue');
    const elOrders = document.getElementById('stat-dashboard-orders');
    const elInStock = document.getElementById('stat-in-stock');

    if (elTotal) elTotal.textContent = totalCount;
    if (elRevenue) elRevenue.textContent = formatINR(totalRevenue);
    if (elOrders) elOrders.textContent = orders.length;
    if (elInStock) elInStock.textContent = inStockCount;

    // Render Recent Orders in Dashboard
    const recentOrdersContainer = document.getElementById('dashboard-recent-orders-list');
    if (recentOrdersContainer) {
      recentOrdersContainer.innerHTML = '';
      orders.slice(0, 4).forEach(ord => {
        const row = document.createElement('div');
        row.className = 'health-item';
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.innerHTML = `
          <div>
            <div style="font-weight: 600; color: var(--admin-text-main); font-size: 0.88rem;">${ord.customer} (${ord.id})</div>
            <div style="font-size: 0.76rem; color: var(--admin-text-muted);">${ord.items}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: var(--admin-text-main); font-size: 0.92rem;">${formatINR(ord.total)}</div>
            <span class="order-status-pill ${ord.status.toLowerCase().replace(/\s+/g, '-')}">${ord.status}</span>
          </div>
        `;
        recentOrdersContainer.appendChild(row);
      });
    }

    // Render Category Distribution
    const catListContainer = document.getElementById('overview-category-list');
    if (catListContainer) {
      catListContainer.innerHTML = '';
      const sortedCategories = Array.from(categoriesSet).sort((a, b) => {
        const countA = catalog.filter(p => p.category === a).length;
        const countB = catalog.filter(p => p.category === b).length;
        return countB - countA;
      });

      sortedCategories.forEach(catName => {
        const count = catalog.filter(p => p.category === catName).length;
        const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

        const row = document.createElement('div');
        row.className = 'category-bar-item';
        row.innerHTML = `
          <div class="cat-bar-header">
            <span class="cat-bar-name">
              <span>${catName}</span>
              <span class="cat-bar-count">(${count} items &bull; ${percentage}%)</span>
            </span>
            <button class="cat-filter-quick-btn" type="button" data-cat="${catName}">View in Catalog &rarr;</button>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width: ${percentage}%"></div>
          </div>
        `;

        row.querySelector('.cat-filter-quick-btn').addEventListener('click', () => {
          state.selectedCategory = catName;
          state.searchQuery = '';
          state.selectedStatus = 'All';
          switchView('products');
        });

        catListContainer.appendChild(row);
      });
    }

    // Render Health checklist
    const healthContainer = document.getElementById('overview-health-list');
    if (healthContainer) {
      healthContainer.innerHTML = `
        <div class="health-item ${missingOriginalPrice.length > 0 ? '' : 'good'}">
          <div class="health-item-icon ${missingOriginalPrice.length > 0 ? 'warning' : 'success'}">
            ${missingOriginalPrice.length > 0 ? '!' : '&#10003;'}
          </div>
          <div class="health-item-content">
            <div class="health-item-title">${missingOriginalPrice.length} Products Without MRP Discount</div>
            <div class="health-item-text">Adding an original price shows buyers the % savings badge.</div>
          </div>
        </div>
        <div class="health-item ${outOfStockCount > 0 ? '' : 'good'}">
          <div class="health-item-icon ${outOfStockCount > 0 ? 'warning' : 'success'}">
            ${outOfStockCount > 0 ? '!' : '&#10003;'}
          </div>
          <div class="health-item-content">
            <div class="health-item-title">${outOfStockCount} Products Marked Out of Stock</div>
            <div class="health-item-text">${outOfStockCount > 0 ? 'Customers cannot add out of stock items directly to cart.' : 'All items are active and in stock.'}</div>
          </div>
        </div>
      `;
    }
  }

  // ---------------- 2. PRODUCTS PAGE ----------------
  function renderProductsPage() {
    const catalog = getCatalog();
    populateCategoryDropdown(catalog);

    let filtered = [...catalog];

    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      );
    }

    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    if (state.selectedStatus !== 'All') {
      filtered = filtered.filter(p => (p.status || 'In Stock') === state.selectedStatus);
    }

    switch (state.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }

    const summaryCount = document.getElementById('products-summary-count');
    if (summaryCount) {
      summaryCount.textContent = `Showing ${filtered.length} of ${catalog.length} products`;
    }

    const clearBtn = document.getElementById('btn-clear-filters');
    const isFiltered = state.searchQuery.trim() !== '' || state.selectedCategory !== 'All' || state.selectedStatus !== 'All';
    if (clearBtn) {
      clearBtn.style.display = isFiltered ? 'inline-block' : 'none';
    }

    const tableContainer = document.getElementById('products-table-container');
    const gridContainer = document.getElementById('products-grid-container');
    const emptyState = document.getElementById('products-empty-state');

    if (filtered.length === 0) {
      if (tableContainer) tableContainer.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    if (state.viewMode === 'table') {
      if (tableContainer) tableContainer.style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';
      renderTableView(filtered);
    } else {
      if (tableContainer) tableContainer.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'grid';
      renderGridView(filtered);
    }
  }

  function populateCategoryDropdown(catalog) {
    const select = document.getElementById('filter-category-select');
    if (!select) return;

    const currentVal = state.selectedCategory;
    const categories = ['All', ...new Set(catalog.map(p => p.category).filter(Boolean))];

    select.innerHTML = '';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      if (cat === 'All') {
        opt.textContent = `All Categories (${catalog.length})`;
      } else {
        const count = catalog.filter(p => p.category === cat).length;
        opt.textContent = `${cat} (${count})`;
      }
      opt.selected = cat === currentVal;
      select.appendChild(opt);
    });
  }

  function renderTableView(products) {
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    products.forEach(prod => {
      const status = prod.status || 'In Stock';
      const statusClass = status === 'In Stock' ? 'in-stock' : (status === 'Made to Order' ? 'made-to-order' : 'out-of-stock');

      let discountBadge = '';
      if (prod.originalPrice && Number(prod.originalPrice) > Number(prod.price)) {
        const pct = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
        discountBadge = `<span class="price-discount-tag">-${pct}%</span>`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-prod-thumb" style="width: 70px;">
          <img class="table-product-thumb" src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
        </td>
        <td class="td-prod-info">
          <div class="table-product-name">${prod.title}</div>
          <div class="table-product-meta-row">
            <span class="table-product-id">ID: ${prod.id}</span>
            <span class="mobile-only-category category-pill">${prod.category}</span>
            ${prod.badge ? `<span class="mobile-only-badge badge-pill">${prod.badge}</span>` : ''}
          </div>
        </td>
        <td class="td-prod-category desktop-only-cell">
          <span class="category-pill">${prod.category}</span>
        </td>
        <td class="td-prod-price">
          <div class="price-main">${formatINR(prod.price)}</div>
          ${prod.originalPrice && Number(prod.originalPrice) > Number(prod.price) ? `
            <div class="mobile-only-orig-price">
              <span class="price-original">${formatINR(prod.originalPrice)}</span>
              ${discountBadge}
            </div>
          ` : ''}
        </td>
        <td class="td-prod-orig-price desktop-only-cell">
          ${prod.originalPrice ? `
            <div class="price-original">${formatINR(prod.originalPrice)}</div>
            ${discountBadge}
          ` : '<span style="color: var(--admin-text-light); font-size: 0.8rem;">—</span>'}
        </td>
        <td class="td-prod-badge desktop-only-cell">
          ${prod.badge ? `<span class="badge-pill">${prod.badge}</span>` : '<span style="color: var(--admin-text-light); font-size: 0.8rem;">—</span>'}
        </td>
        <td class="td-prod-status">
          <span class="status-pill ${statusClass}">
            <span class="status-pill-dot"></span>
            ${status}
          </span>
        </td>
        <td class="table-actions-cell td-prod-actions" style="text-align: right;">
          <button class="action-icon-btn edit" type="button" title="Edit product" data-id="${prod.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Edit
          </button>
          <button class="action-icon-btn delete" type="button" title="Delete product" data-id="${prod.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </button>
        </td>
      `;

      tr.querySelector('.action-icon-btn.edit').addEventListener('click', () => {
        openEditProductModal(prod.id);
      });

      tr.querySelector('.action-icon-btn.delete').addEventListener('click', () => {
        openDeleteConfirmModal(prod.id);
      });

      tbody.appendChild(tr);
    });
  }

  function renderGridView(products) {
    const grid = document.getElementById('products-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    products.forEach(prod => {
      const status = prod.status || 'In Stock';
      const statusClass = status === 'In Stock' ? 'in-stock' : (status === 'Made to Order' ? 'made-to-order' : 'out-of-stock');

      let discountBadge = '';
      if (prod.originalPrice && Number(prod.originalPrice) > Number(prod.price)) {
        const pct = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
        discountBadge = `<span class="price-discount-tag">-${pct}%</span>`;
      }

      const card = document.createElement('div');
      card.className = 'admin-product-card';
      card.innerHTML = `
        <div class="card-media-wrap">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
          ${prod.badge ? `<div class="card-floating-badge"><span class="badge-pill">${prod.badge}</span></div>` : ''}
          <div class="card-floating-status">
            <span class="status-pill ${statusClass}">
              <span class="status-pill-dot"></span>
              ${status}
            </span>
          </div>
        </div>
        <div class="admin-card-body">
          <div class="admin-card-meta">
            <span class="category-pill">${prod.category}</span>
            <span class="table-product-id">ID: ${prod.id}</span>
          </div>
          <h3 class="admin-card-title">${prod.title}</h3>
          <p class="admin-card-desc">${prod.desc || 'No description provided.'}</p>
          <div class="admin-card-footer">
            <div>
              <div class="price-main">${formatINR(prod.price)}</div>
              ${prod.originalPrice ? `<div class="price-original">${formatINR(prod.originalPrice)} ${discountBadge}</div>` : ''}
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="action-icon-btn edit" type="button" title="Edit product" data-id="${prod.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Edit
              </button>
              <button class="action-icon-btn delete" type="button" title="Delete product" data-id="${prod.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;

      card.querySelector('.action-icon-btn.edit').addEventListener('click', () => {
        openEditProductModal(prod.id);
      });

      card.querySelector('.action-icon-btn.delete').addEventListener('click', () => {
        openDeleteConfirmModal(prod.id);
      });

      grid.appendChild(card);
    });
  }

  // ---------------- 3. CATEGORIES PAGE ----------------
  function renderCategories() {
    const catalog = getCatalog();
    const categoriesSet = new Set(catalog.map(p => p.category).filter(Boolean));
    const container = document.getElementById('categories-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const categoryDescriptions = {
      'Dining Chairs': 'Ergonomic upholstered and leatherette chairs engineered for residential dining and premium restaurants.',
      'Executive Chairs': 'High-back ergonomic leatherette chairs with heavy-duty chrome frames and synchro-tilt mechanisms for directors.',
      'Dining Sets': 'Complete composite marble-finish dining suites paired with matching upholstered seats and luxury booth benches.',
      'Ergonomic Workstations': 'High-performance task seating with adjustable lumbar contouring, hydraulic gas lifts, and breathable mesh.',
      'Accent & Lounge': 'Curved sculptural accent armchairs tailored for statement living spaces, reception suites, and lounge areas.'
    };

    categoriesSet.forEach(catName => {
      const itemsInCat = catalog.filter(p => p.category === catName);
      const coverImage = itemsInCat[0] ? itemsInCat[0].image : 'assets/images/catalog/varsha-prod-01.jpg';
      const desc = categoryDescriptions[catName] || `Handcrafted ${catName.toLowerCase()} manufactured in our Ahmedabad facility.`;

      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="category-card-media">
          <img src="${coverImage}" alt="${catName}" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
          <span class="category-card-badge">${itemsInCat.length} Designs</span>
        </div>
        <div class="category-card-body">
          <h3 class="category-card-title">${catName}</h3>
          <p class="category-card-desc">${desc}</p>
          <div class="category-card-footer">
            <span style="font-size: 0.78rem; color: var(--admin-text-light);">Direct Workshop Line</span>
            <button class="btn-bronze" type="button" style="padding: 6px 12px; font-size: 0.8rem;" data-cat="${catName}">
              View Products &rarr;
            </button>
          </div>
        </div>
      `;

      card.querySelector('button').addEventListener('click', () => {
        state.selectedCategory = catName;
        state.searchQuery = '';
        state.selectedStatus = 'All';
        switchView('products');
      });

      container.appendChild(card);
    });
  }

  // ---------------- 4. ORDERS PAGE ----------------
  function renderOrders() {
    const orders = getOrders();
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    let filtered = [...orders];
    if (state.orderFilterStatus !== 'All') {
      filtered = filtered.filter(o => o.status === state.orderFilterStatus);
    }
    if (state.orderSearchQuery.trim() !== '') {
      const q = state.orderSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.items.toLowerCase().includes(q)
      );
    }

    const countSummary = document.getElementById('orders-summary-count');
    if (countSummary) {
      countSummary.textContent = `Showing ${filtered.length} of ${orders.length} orders`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">
            No orders match your filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(ord => {
      const tr = document.createElement('tr');
      const statusClass = ord.status.toLowerCase().replace(/\s+/g, '-');
      tr.innerHTML = `
        <td class="td-order-id">
          <div class="order-id-badge"><strong>${ord.id}</strong></div>
          <div class="mobile-only-date" style="font-size: 0.8rem; color: var(--admin-text-muted); font-weight: 500; white-space: nowrap;">${ord.date}</div>
        </td>
        <td class="td-order-customer">
          <div class="order-customer-name" style="font-weight: 600;">${ord.customer}</div>
          <div class="order-customer-meta" style="font-size: 0.76rem; color: var(--admin-text-muted);">${ord.city} &bull; ${ord.phone}</div>
        </td>
        <td class="td-order-items">
          <div class="order-items-box" style="font-size: 0.84rem;">${ord.items}</div>
        </td>
        <td class="td-order-total">
          <span class="mobile-order-label">Total: </span>
          <strong class="order-total-amount">${formatINR(ord.total)}</strong>
        </td>
        <td class="td-order-date desktop-only-cell">
          <span style="font-size: 0.82rem; color: var(--admin-text-muted); white-space: nowrap;">${ord.date}</span>
        </td>
        <td class="td-order-status">
          <span class="order-status-pill ${statusClass}">
            ${ord.status}
          </span>
        </td>
        <td class="td-order-action" style="text-align: right;">
          <label class="mobile-status-label" for="order-status-${ord.id}">Change Status:</label>
          <select id="order-status-${ord.id}" class="admin-select order-status-select" data-id="${ord.id}">
            <option value="Manufacturing" ${ord.status === 'Manufacturing' ? 'selected' : ''}>Manufacturing</option>
            <option value="Pending Dispatch" ${ord.status === 'Pending Dispatch' ? 'selected' : ''}>Pending Dispatch</option>
            <option value="Delivered" ${ord.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${ord.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      `;

      tr.querySelector('.order-status-select').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        const allOrders = getOrders();
        const target = allOrders.find(o => o.id === ord.id);
        if (target) {
          target.status = newStatus;
          saveOrders(allOrders);
          showToast(`Order ${ord.id} updated to "${newStatus}"!`, 'success');
        }
      });

      tbody.appendChild(tr);
    });
  }

  // ---------------- 5. CUSTOMERS PAGE ----------------
  function renderCustomers() {
    const customers = getCustomers();
    const container = document.getElementById('customers-grid-container');
    if (!container) return;
    container.innerHTML = '';

    customers.forEach(c => {
      const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2);
      const card = document.createElement('div');
      card.className = 'customer-card';
      card.innerHTML = `
        <div class="customer-card-header">
          <div class="customer-avatar">${initials}</div>
          <div class="customer-header-info">
            <h4>${c.name}</h4>
            <span>${c.city}</span>
          </div>
        </div>
        <div class="customer-meta-list">
          <div class="customer-meta-item">
            <label>Total Orders</label>
            <span>${c.ordersCount}</span>
          </div>
          <div class="customer-meta-item">
            <label>Total Purchased</label>
            <span style="color: var(--admin-bronze-dark);">${formatINR(c.totalSpent)}</span>
          </div>
          <div class="customer-meta-item" style="grid-column: 1 / -1;">
            <label>Last Activity</label>
            <span>${c.lastOrder}</span>
          </div>
        </div>
        <div class="customer-actions-row">
          <a href="tel:${c.phone}" class="btn-outline-neutral" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 7px 10px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call
          </a>
          <a href="https://wa.me/91${c.phone}?text=Hello%20${encodeURIComponent(c.name)}%2C%20greetings%20from%20Varsha%20Furniture." target="_blank" rel="noopener" class="btn-bronze" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 7px 10px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp
          </a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // ---------------- 6. COUPONS PAGE ----------------
  function renderCoupons() {
    const coupons = getCoupons();
    const container = document.getElementById('coupons-grid-container');
    if (!container) return;
    container.innerHTML = '';

    coupons.forEach(c => {
      const card = document.createElement('div');
      card.className = 'coupon-card';
      const isActive = c.status === 'Active';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="coupon-code-pill">${c.code}</span>
          <span class="status-pill ${isActive ? 'in-stock' : 'out-of-stock'}">${c.status}</span>
        </div>
        <div class="coupon-discount-val">${c.discount}</div>
        <div class="coupon-desc">${c.desc}</div>
        <div class="coupon-footer">
          <span style="font-size: 0.78rem; color: var(--admin-text-light);">Used: <strong>${c.used} times</strong></span>
          <button class="btn-outline-neutral toggle-coupon-btn" type="button" style="padding: 5px 10px; font-size: 0.78rem;" data-id="${c.id}">
            ${isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      `;

      card.querySelector('.toggle-coupon-btn').addEventListener('click', () => {
        const allCoupons = getCoupons();
        const target = allCoupons.find(item => item.id === c.id);
        if (target) {
          target.status = target.status === 'Active' ? 'Expired' : 'Active';
          saveCoupons(allCoupons);
          showToast(`Coupon ${target.code} is now ${target.status}!`);
        }
      });

      container.appendChild(card);
    });
  }

  // ---------------- 7. MEDIA LIBRARY PAGE ----------------
  function renderMedia() {
    const catalog = getCatalog();
    const container = document.getElementById('media-grid-container');
    if (!container) return;
    container.innerHTML = '';

    WORKSHOP_IMAGES.forEach((imgPath, idx) => {
      const fileName = imgPath.split('/').pop();
      const associatedProduct = catalog.find(p => p.image === imgPath);

      const card = document.createElement('div');
      card.className = 'media-item-card';
      card.innerHTML = `
        <div class="media-item-thumb">
          <img src="${imgPath}" alt="${fileName}" loading="lazy" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
        </div>
        <div class="media-item-info">
          <div class="media-item-filename" title="${fileName}">${fileName}</div>
          <div class="media-item-meta">${associatedProduct ? associatedProduct.title : 'Workshop Catalog Asset'}</div>
          <div class="media-item-actions">
            <button class="btn-outline-neutral copy-media-btn" type="button" style="padding: 4px 8px; font-size: 0.72rem; width: 100%; justify-content: center;" data-path="${imgPath}">
              Copy Path
            </button>
          </div>
        </div>
      `;

      card.querySelector('.copy-media-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(imgPath).then(() => {
          showToast(`Copied path: ${imgPath}`, 'success');
        });
      });

      container.appendChild(card);
    });
  }

  // ---------------- 8. ANALYTICS PAGE ----------------
  function renderAnalytics() {
    const orders = getOrders();
    const catalog = getCatalog();
    const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const avgOrderVal = orders.length > 0 ? Math.round(totalRev / orders.length) : 0;

    const elRev = document.getElementById('analytics-total-sales');
    const elOrders = document.getElementById('analytics-total-orders');
    const elAov = document.getElementById('analytics-aov');
    const elUnits = document.getElementById('analytics-units-sold');

    if (elRev) elRev.textContent = formatINR(totalRev);
    if (elOrders) elOrders.textContent = orders.length;
    if (elAov) elAov.textContent = formatINR(avgOrderVal);
    if (elUnits) elUnits.textContent = '14 Chairs & Suites';

    // Top Selling Models
    const topContainer = document.getElementById('analytics-top-products');
    if (topContainer) {
      topContainer.innerHTML = '';
      const topProducts = catalog.filter(p => p.badge && p.badge !== '').slice(0, 5);
      topProducts.forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = 'health-item';
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: var(--admin-bronze-dark); font-size: 1.1rem; width: 20px;">#${idx + 1}</span>
            <img src="${p.image}" alt="${p.title}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;">
            <div>
              <div style="font-weight: 600; font-size: 0.88rem;">${p.title}</div>
              <div style="font-size: 0.76rem; color: var(--admin-text-muted);">${p.category} &bull; ${p.badge}</div>
            </div>
          </div>
          <div style="font-weight: 700; color: var(--admin-primary);">${formatINR(p.price)}</div>
        `;
        topContainer.appendChild(row);
      });
    }
  }

  // ---------------- 9. REVIEWS PAGE ----------------
  function renderReviews() {
    const reviews = getReviews();
    const container = document.getElementById('reviews-grid-container');
    if (!container) return;
    container.innerHTML = '';

    reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="review-stars">★★★★★</div>
          <span class="status-pill in-stock" style="font-size: 0.72rem;">Verified Purchase</span>
        </div>
        <div class="review-product-tag">${r.product}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author-block">
          <div>
            <strong>${r.author}</strong>
            <span style="color: var(--admin-text-light);"> &bull; ${r.city}</span>
          </div>
          <span style="color: var(--admin-text-light); font-size: 0.75rem;">${r.date}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // ---------------- 10. SEO PAGE ----------------
  function renderSeo() {
    const seo = getSeo();
    const inputTitle = document.getElementById('seo-input-title');
    const inputDesc = document.getElementById('seo-input-desc');
    const inputKeywords = document.getElementById('seo-input-keywords');

    const previewTitle = document.getElementById('seo-preview-title');
    const previewDesc = document.getElementById('seo-preview-desc');

    if (inputTitle) inputTitle.value = seo.title || '';
    if (inputDesc) inputDesc.value = seo.metaDesc || '';
    if (inputKeywords) inputKeywords.value = seo.keywords || '';

    if (previewTitle) previewTitle.textContent = seo.title || '';
    if (previewDesc) previewDesc.textContent = seo.metaDesc || '';
  }

  // ---------------- 11. SETTINGS PAGE ----------------
  function renderSettings() {
    const settings = getSettings();
    const inputName = document.getElementById('settings-store-name');
    const inputAddress = document.getElementById('settings-workshop-address');
    const inputPhone = document.getElementById('settings-phone');
    const inputEmail = document.getElementById('settings-email');

    if (inputName) inputName.value = settings.storeName || '';
    if (inputAddress) inputAddress.value = settings.workshopAddress || '';
    if (inputPhone) inputPhone.value = settings.phone || '';
    if (inputEmail) inputEmail.value = settings.email || '';
  }

  // ---------------- PRODUCT MODAL (ADD & EDIT) ----------------
  function openAddProductModal() {
    const catalog = getCatalog();
    state.editingProductId = null;

    const modalTitle = document.getElementById('modal-product-title');
    const modalSub = document.getElementById('modal-product-sub');
    if (modalTitle) modalTitle.textContent = 'Add a New Product';
    if (modalSub) modalSub.textContent = 'Enter your furniture details below to add it to your store catalog.';

    document.getElementById('form-product-id').value = generateNewProductId(catalog);
    document.getElementById('form-product-name').value = '';
    document.getElementById('form-product-price').value = '';
    document.getElementById('form-product-original-price').value = '';
    document.getElementById('form-product-desc').value = '';
    document.getElementById('form-product-status').value = 'In Stock';
    document.getElementById('form-custom-category-name').value = '';

    initProductFormCategories(catalog, 'Dining Chairs');
    initProductFormBadges('');

    const defaultImage = 'assets/images/catalog/varsha-prod-01.jpg';
    updateProductImagePreview(defaultImage);
    initWorkshopGallery(defaultImage);

    clearFormErrors();
    state.isFormDirty = false;
    saveFormInitialSnapshot();

    const modal = document.getElementById('modal-product-form');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openEditProductModal(productId) {
    const catalog = getCatalog();
    const product = catalog.find(p => p.id === productId);
    if (!product) {
      showToast('Product not found', 'error');
      return;
    }

    state.editingProductId = productId;

    const modalTitle = document.getElementById('modal-product-title');
    const modalSub = document.getElementById('modal-product-sub');
    if (modalTitle) modalTitle.textContent = `Edit Product: ${product.title}`;
    if (modalSub) modalSub.textContent = `Update pricing, stock availability, photos, or description for ID: ${product.id}`;

    document.getElementById('form-product-id').value = product.id;
    document.getElementById('form-product-name').value = product.title || '';
    document.getElementById('form-product-price').value = product.price || '';
    document.getElementById('form-product-original-price').value = product.originalPrice || '';
    document.getElementById('form-product-desc').value = product.desc || '';
    document.getElementById('form-product-status').value = product.status || 'In Stock';
    document.getElementById('form-custom-category-name').value = '';

    initProductFormCategories(catalog, product.category);
    initProductFormBadges(product.badge || '');

    const currentImg = product.image || 'assets/images/catalog/varsha-prod-01.jpg';
    updateProductImagePreview(currentImg);
    initWorkshopGallery(currentImg);

    clearFormErrors();
    state.isFormDirty = false;
    saveFormInitialSnapshot();

    const modal = document.getElementById('modal-product-form');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal(force = false) {
    if (!force && state.isFormDirty) {
      showUnsavedWarning(() => {
        closeProductModal(true);
      });
      return;
    }

    state.isFormDirty = false;
    state.editingProductId = null;
    const modal = document.getElementById('modal-product-form');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function generateNewProductId(catalog) {
    let maxNum = 0;
    catalog.forEach(p => {
      const match = String(p.id).match(/^vf-(\d+)$/i);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n > maxNum) maxNum = n;
      }
    });
    const nextNum = maxNum + 1;
    return `vf-${String(nextNum).padStart(2, '0')}`;
  }

  function initProductFormCategories(catalog, selectedCategory = '') {
    const select = document.getElementById('form-product-category');
    if (!select) return;

    const categories = Array.from(new Set([...DEFAULT_CATEGORIES, ...catalog.map(p => p.category).filter(Boolean)]));
    select.innerHTML = '';

    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      if (cat === selectedCategory) opt.selected = true;
      select.appendChild(opt);
    });

    const optNew = document.createElement('option');
    optNew.value = '__ADD_NEW__';
    optNew.textContent = '+ Add a New Category...';
    select.appendChild(optNew);

    const customGroup = document.getElementById('form-custom-category-group');
    if (customGroup) customGroup.style.display = 'none';
  }

  function initProductFormBadges(selectedBadge = '') {
    const select = document.getElementById('form-product-badge');
    if (!select) return;

    select.innerHTML = '';
    AVAILABLE_BADGES.forEach(badge => {
      const opt = document.createElement('option');
      opt.value = badge;
      opt.textContent = badge === '' ? 'No Promotional Badge' : badge;
      if (badge === selectedBadge) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function initWorkshopGallery(selectedImagePath) {
    const galleryGrid = document.getElementById('workshop-gallery-grid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    WORKSHOP_IMAGES.forEach(imgPath => {
      const img = document.createElement('img');
      img.className = `gallery-thumb-item ${imgPath === selectedImagePath ? 'selected' : ''}`;
      img.src = imgPath;
      img.alt = 'Workshop Furniture Photo';
      img.loading = 'lazy';

      img.addEventListener('click', () => {
        document.querySelectorAll('.gallery-thumb-item').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        updateProductImagePreview(imgPath);
        markFormDirty();
      });

      galleryGrid.appendChild(img);
    });
  }

  function updateProductImagePreview(imagePath) {
    const inputHidden = document.getElementById('form-product-image');
    const previewImg = document.getElementById('form-preview-thumb');
    const previewPath = document.getElementById('form-preview-path');
    const customUrlInput = document.getElementById('form-custom-image-url');

    if (inputHidden) inputHidden.value = imagePath;
    if (previewImg) previewImg.src = imagePath;
    if (previewPath) previewPath.textContent = imagePath.length > 50 ? imagePath.slice(0, 48) + '...' : imagePath;
    if (customUrlInput && !imagePath.startsWith('data:')) customUrlInput.value = imagePath;
  }

  function saveFormInitialSnapshot() {
    state.formInitialState = {
      name: document.getElementById('form-product-name').value,
      price: document.getElementById('form-product-price').value,
      originalPrice: document.getElementById('form-product-original-price').value,
      category: document.getElementById('form-product-category').value,
      badge: document.getElementById('form-product-badge').value,
      status: document.getElementById('form-product-status').value,
      desc: document.getElementById('form-product-desc').value,
      image: document.getElementById('form-product-image').value
    };
  }

  function markFormDirty() {
    state.isFormDirty = true;
  }

  function clearFormErrors() {
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.form-error-msg').forEach(el => el.textContent = '');
  }

  function validateProductForm() {
    clearFormErrors();
    let isValid = true;

    const nameInput = document.getElementById('form-product-name');
    const priceInput = document.getElementById('form-product-price');
    const origPriceInput = document.getElementById('form-product-original-price');
    const catSelect = document.getElementById('form-product-category');
    const customCatInput = document.getElementById('form-custom-category-name');

    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      document.getElementById('error-product-name').textContent = 'Please enter a product name.';
      isValid = false;
    }

    const priceVal = Number(priceInput.value);
    if (!priceInput.value || isNaN(priceVal) || priceVal <= 0) {
      priceInput.classList.add('is-invalid');
      document.getElementById('error-product-price').textContent = 'Please enter a valid selling price in rupees (greater than 0).';
      isValid = false;
    }

    if (origPriceInput.value) {
      const origVal = Number(origPriceInput.value);
      if (isNaN(origVal) || origVal <= 0) {
        origPriceInput.classList.add('is-invalid');
        document.getElementById('error-product-orig-price').textContent = 'Original price must be a valid number in rupees.';
        isValid = false;
      }
    }

    if (catSelect.value === '__ADD_NEW__') {
      if (!customCatInput.value.trim()) {
        customCatInput.classList.add('is-invalid');
        document.getElementById('error-custom-category').textContent = 'Please type a name for your new category.';
        isValid = false;
      }
    }

    return isValid;
  }

  function saveProductForm() {
    if (!validateProductForm()) return;

    const catalog = getCatalog();
    const idInput = document.getElementById('form-product-id');
    const nameInput = document.getElementById('form-product-name');
    const priceInput = document.getElementById('form-product-price');
    const origPriceInput = document.getElementById('form-product-original-price');
    const catSelect = document.getElementById('form-product-category');
    const customCatInput = document.getElementById('form-custom-category-name');
    const badgeSelect = document.getElementById('form-product-badge');
    const statusSelect = document.getElementById('form-product-status');
    const descInput = document.getElementById('form-product-desc');
    const imageInput = document.getElementById('form-product-image');

    let finalCategory = catSelect.value;
    if (finalCategory === '__ADD_NEW__') {
      finalCategory = customCatInput.value.trim();
    }

    const finalPrice = Math.round(Number(priceInput.value));
    const finalOrigPrice = origPriceInput.value ? Math.round(Number(origPriceInput.value)) : null;

    const productData = {
      id: idInput.value,
      title: nameInput.value.trim(),
      category: finalCategory,
      price: finalPrice,
      originalPrice: finalOrigPrice,
      image: imageInput.value || 'assets/images/catalog/varsha-prod-01.jpg',
      desc: descInput.value.trim() || 'Handcrafted precision furniture from Varsha Furniture workshop.',
      badge: badgeSelect.value || '',
      status: statusSelect.value || 'In Stock'
    };

    let updatedCatalog;
    let message = '';

    if (state.editingProductId) {
      const index = catalog.findIndex(p => p.id === state.editingProductId);
      if (index === -1) {
        showToast('Error: Product no longer exists in catalog.', 'error');
        return;
      }
      productData.id = state.editingProductId;
      updatedCatalog = [...catalog];
      updatedCatalog[index] = productData;
      message = `Product "${productData.title}" was successfully updated!`;
    } else {
      productData.id = generateNewProductId(catalog);
      updatedCatalog = [productData, ...catalog];
      message = `New product "${productData.title}" was added to catalog!`;
    }

    saveCatalog(updatedCatalog);
    syncProductToD1(productData, !!state.editingProductId);
    state.isFormDirty = false;
    closeProductModal(true);
    showToast(message, 'success');
  }

  // ---------------- DELETE PRODUCT CONFIRMATION ----------------
  let productToDeleteId = null;

  function openDeleteConfirmModal(productId) {
    const catalog = getCatalog();
    const product = catalog.find(p => p.id === productId);
    if (!product) return;

    productToDeleteId = productId;

    const previewContainer = document.getElementById('delete-modal-preview');
    if (previewContainer) {
      previewContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
        <div>
          <div style="font-weight: 600; color: var(--admin-text-main); margin-bottom: 2px;">${product.title}</div>
          <div style="font-size: 0.8rem; color: var(--admin-text-muted);">
            ID: <strong>${product.id}</strong> &bull; Category: <strong>${product.category}</strong> &bull; Price: <strong>${formatINR(product.price)}</strong>
          </div>
        </div>
      `;
    }

    const modal = document.getElementById('modal-delete-confirm');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteConfirmModal() {
    productToDeleteId = null;
    const modal = document.getElementById('modal-delete-confirm');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function confirmDeleteProduct() {
    if (!productToDeleteId) return;

    const catalog = getCatalog();
    const prod = catalog.find(p => p.id === productToDeleteId);
    const prodTitle = prod ? prod.title : 'Product';
    const deletedId = productToDeleteId;

    const updatedCatalog = catalog.filter(p => p.id !== productToDeleteId);
    saveCatalog(updatedCatalog);

    // Sync delete to Cloudflare D1
    fetch(`/api/products?id=${encodeURIComponent(deletedId)}`, { method: 'DELETE' }).catch(() => {});

    closeDeleteConfirmModal();
    showToast(`"${prodTitle}" has been removed from your store.`, 'success');
  }

  // ---------------- UNSAVED WARNING ----------------
  function showUnsavedWarning(onConfirmDiscard) {
    state.pendingActionAfterUnsavedCheck = onConfirmDiscard;
    const modal = document.getElementById('modal-unsaved-warning');
    if (modal) modal.classList.add('active');
  }

  function closeUnsavedWarning() {
    state.pendingActionAfterUnsavedCheck = null;
    const modal = document.getElementById('modal-unsaved-warning');
    if (modal) modal.classList.remove('active');
  }

  function confirmDiscardUnsaved() {
    const callback = state.pendingActionAfterUnsavedCheck;
    closeUnsavedWarning();
    if (typeof callback === 'function') {
      callback();
    }
  }

  // ---------------- EXPORT CATALOG ----------------
  function openExportModal() {
    const modal = document.getElementById('modal-export-catalog');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeExportModal() {
    const modal = document.getElementById('modal-export-catalog');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function generateCatalogJsContent() {
    const catalog = getCatalog();
    const jsonString = JSON.stringify(catalog, null, 2);

    return `// Varsha Furniture - Official Product Catalog Data
// Ahmedabad Workshop | Handcrafted Quality Furniture
// Updated: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
const VARSHA_DEFAULT_PRODUCTS = ${jsonString};

// Key used for browser storage of catalog edits
const VF_STORAGE_KEY = 'varsha_furniture_catalog';

/**
 * Returns current catalog data. If changes have been saved in this browser's
 * localStorage, those are loaded. Otherwise, defaults to the factory catalog.
 */
function getVarshaProducts() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(VF_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('Could not read saved Varsha Furniture catalog from localStorage:', err);
  }
  return VARSHA_DEFAULT_PRODUCTS;
}

// Active catalog reference used by storefront and admin
let VARSHA_PRODUCTS = getVarshaProducts();

if (typeof module !== "undefined") {
  module.exports = { VARSHA_PRODUCTS, VARSHA_DEFAULT_PRODUCTS, getVarshaProducts, VF_STORAGE_KEY };
}
`;
  }

  function downloadCatalogJs() {
    const content = generateCatalogJsContent();
    const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Catalog file "products.js" downloaded successfully!', 'success');
  }

  function downloadCatalogJson() {
    const catalog = getCatalog();
    const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `varsha-products-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('JSON backup downloaded successfully!', 'success');
  }

  function copyCatalogJsToClipboard() {
    const content = generateCatalogJsContent();
    navigator.clipboard.writeText(content).then(() => {
      showToast('Catalog code copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Unable to copy to clipboard', 'error');
    });
  }

  // ---------------- FACTORY RESET ----------------
  function openResetConfirmModal() {
    const modal = document.getElementById('modal-reset-confirm');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResetConfirmModal() {
    const modal = document.getElementById('modal-reset-confirm');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function confirmFactoryReset() {
    try {
      localStorage.removeItem('varsha_furniture_catalog');
      if (typeof VARSHA_DEFAULT_PRODUCTS !== 'undefined') {
        window.VARSHA_PRODUCTS = VARSHA_DEFAULT_PRODUCTS;
      }
    } catch (e) {
      console.error(e);
    }
    closeResetConfirmModal();
    renderCurrentView();
    updateSidebarCounts();
    showToast('Catalog reset to original 36 workshop designs!', 'success');
  }

  // ---------------- MOBILE SIDEBAR ----------------
  function openMobileSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  // ---------------- INITIALIZATION ----------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    updateSidebarCounts();
    renderCurrentView();

    // 2. Navigation Click Listeners (All 11 items)
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) switchView(view);
      });
    });

    // 3. Mobile Hamburger Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // 4. "+ Add a Product" Trigger Buttons
    document.querySelectorAll('.btn-trigger-add-product').forEach(btn => {
      btn.addEventListener('click', openAddProductModal);
    });

    // 5. Products Filters and Search
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderProductsPage();
      });
    }

    const catSelect = document.getElementById('filter-category-select');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        renderProductsPage();
      });
    }

    const statusSelect = document.getElementById('filter-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        state.selectedStatus = e.target.value;
        renderProductsPage();
      });
    }

    const sortSelect = document.getElementById('filter-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProductsPage();
      });
    }

    const clearBtn = document.getElementById('btn-clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.selectedCategory = 'All';
        state.selectedStatus = 'All';
        state.sortBy = 'default';
        if (searchInput) searchInput.value = '';
        if (catSelect) catSelect.value = 'All';
        if (statusSelect) statusSelect.value = 'All';
        if (sortSelect) sortSelect.value = 'default';
        renderProductsPage();
      });
    }

    // View Switcher (Table vs Grid)
    const btnViewTable = document.getElementById('btn-view-table');
    const btnViewGrid = document.getElementById('btn-view-grid');
    if (btnViewTable && btnViewGrid) {
      btnViewTable.addEventListener('click', () => {
        state.viewMode = 'table';
        btnViewTable.classList.add('active');
        btnViewGrid.classList.remove('active');
        renderProductsPage();
      });
      btnViewGrid.addEventListener('click', () => {
        state.viewMode = 'grid';
        btnViewGrid.classList.add('active');
        btnViewTable.classList.remove('active');
        renderProductsPage();
      });
    }

    // 6. Orders Filters
    const orderSearch = document.getElementById('orders-search-input');
    if (orderSearch) {
      orderSearch.addEventListener('input', (e) => {
        state.orderSearchQuery = e.target.value;
        renderOrders();
      });
    }

    const orderFilterStatus = document.getElementById('orders-filter-status');
    if (orderFilterStatus) {
      orderFilterStatus.addEventListener('change', (e) => {
        state.orderFilterStatus = e.target.value;
        renderOrders();
      });
    }

    // 7. SEO Save
    const btnSaveSeo = document.getElementById('btn-save-seo');
    if (btnSaveSeo) {
      btnSaveSeo.addEventListener('click', () => {
        const seoData = {
          title: document.getElementById('seo-input-title').value.trim(),
          metaDesc: document.getElementById('seo-input-desc').value.trim(),
          keywords: document.getElementById('seo-input-keywords').value.trim(),
          googleUrl: 'https://varshafurniture.com/'
        };
        saveSeo(seoData);
        showToast('SEO meta tags updated successfully!', 'success');
      });
    }

    // Live SEO preview updates
    const seoTitleInput = document.getElementById('seo-input-title');
    const seoDescInput = document.getElementById('seo-input-desc');
    if (seoTitleInput) {
      seoTitleInput.addEventListener('input', (e) => {
        const preview = document.getElementById('seo-preview-title');
        if (preview) preview.textContent = e.target.value || 'Varsha Furniture';
      });
    }
    if (seoDescInput) {
      seoDescInput.addEventListener('input', (e) => {
        const preview = document.getElementById('seo-preview-desc');
        if (preview) preview.textContent = e.target.value || 'Handcrafted quality furniture.';
      });
    }

    // 8. Settings Save
    const btnSaveSettings = document.getElementById('btn-save-settings');
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener('click', () => {
        const settingsData = {
          storeName: document.getElementById('settings-store-name').value.trim(),
          workshopAddress: document.getElementById('settings-workshop-address').value.trim(),
          phone: document.getElementById('settings-phone').value.trim(),
          email: document.getElementById('settings-email').value.trim()
        };
        saveSettings(settingsData);
        showToast('Workshop settings saved successfully!', 'success');
      });
    }

    // 9. Form Category "+ Add New Category" toggling
    const formCatSelect = document.getElementById('form-product-category');
    const customCatGroup = document.getElementById('form-custom-category-group');
    if (formCatSelect && customCatGroup) {
      formCatSelect.addEventListener('change', () => {
        if (formCatSelect.value === '__ADD_NEW__') {
          customCatGroup.style.display = 'flex';
          const input = document.getElementById('form-custom-category-name');
          if (input) input.focus();
        } else {
          customCatGroup.style.display = 'none';
        }
        markFormDirty();
      });
    }

    // Form inputs dirty tracker
    const formFields = [
      'form-product-name',
      'form-product-price',
      'form-product-original-price',
      'form-product-badge',
      'form-product-status',
      'form-product-desc',
      'form-custom-category-name'
    ];
    formFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', markFormDirty);
        el.addEventListener('change', markFormDirty);
      }
    });

    // Form Save / Cancel Buttons
    const btnSaveProduct = document.getElementById('btn-save-product');
    const btnCancelProduct = document.getElementById('btn-cancel-product');
    const btnCloseProductModal = document.getElementById('btn-close-product-modal');
    if (btnSaveProduct) btnSaveProduct.addEventListener('click', saveProductForm);
    if (btnCancelProduct) btnCancelProduct.addEventListener('click', () => closeProductModal(false));
    if (btnCloseProductModal) btnCloseProductModal.addEventListener('click', () => closeProductModal(false));

    // Form Image Tabs
    const tabGallery = document.getElementById('img-tab-gallery');
    const tabUpload = document.getElementById('img-tab-upload');
    const tabUrl = document.getElementById('img-tab-url');

    const panelGallery = document.getElementById('img-panel-gallery');
    const panelUpload = document.getElementById('img-panel-upload');
    const panelUrl = document.getElementById('img-panel-url');

    function selectImageTab(activeTab) {
      [tabGallery, tabUpload, tabUrl].forEach(t => { if (t) t.classList.remove('active'); });
      [panelGallery, panelUpload, panelUrl].forEach(p => { if (p) p.style.display = 'none'; });

      if (activeTab === 'gallery') {
        if (tabGallery) tabGallery.classList.add('active');
        if (panelGallery) panelGallery.style.display = 'block';
      } else if (activeTab === 'upload') {
        if (tabUpload) tabUpload.classList.add('active');
        if (panelUpload) panelUpload.style.display = 'block';
      } else if (activeTab === 'url') {
        if (tabUrl) tabUrl.classList.add('active');
        if (panelUrl) panelUrl.style.display = 'block';
      }
    }

    if (tabGallery) tabGallery.addEventListener('click', () => selectImageTab('gallery'));
    if (tabUpload) tabUpload.addEventListener('click', () => selectImageTab('upload'));
    if (tabUrl) tabUrl.addEventListener('click', () => selectImageTab('url'));

    // File Input Upload Handling
    const fileInput = document.getElementById('form-file-input');
    const dropArea = document.getElementById('file-drop-area');

    if (dropArea && fileInput) {
      dropArea.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const errorMsg = document.getElementById('error-image-upload');
          if (errorMsg) errorMsg.textContent = '';

          if (!file.type.startsWith('image/')) {
            if (errorMsg) errorMsg.textContent = 'Please choose a valid photo file (JPG, PNG, or WEBP).';
            return;
          }

          const reader = new FileReader();
          reader.onload = function (evt) {
            updateProductImagePreview(evt.target.result);
            markFormDirty();
            showToast('Photo uploaded and preview ready!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

  // ---------------- COUPON MODAL FUNCTIONS ----------------
  function openAddCouponModal() {
    const codeInput = document.getElementById('form-coupon-code');
    const discountInput = document.getElementById('form-coupon-discount');
    const descInput = document.getElementById('form-coupon-desc');
    const expiryInput = document.getElementById('form-coupon-expiry');
    const statusInput = document.getElementById('form-coupon-status');

    if (codeInput) codeInput.value = '';
    if (discountInput) discountInput.value = '';
    if (descInput) descInput.value = '';
    if (expiryInput) {
      // Default to 60 days in future
      const future = new Date();
      future.setDate(future.getDate() + 60);
      expiryInput.value = future.toISOString().slice(0, 10);
    }
    if (statusInput) statusInput.value = 'Active';

    document.querySelectorAll('#modal-coupon-form .form-error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#modal-coupon-form .form-control').forEach(el => el.classList.remove('is-invalid'));

    const modal = document.getElementById('modal-coupon-form');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCouponModal() {
    const modal = document.getElementById('modal-coupon-form');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function saveCouponForm() {
    const codeInput = document.getElementById('form-coupon-code');
    const discountInput = document.getElementById('form-coupon-discount');
    const descInput = document.getElementById('form-coupon-desc');
    const expiryInput = document.getElementById('form-coupon-expiry');
    const statusInput = document.getElementById('form-coupon-status');

    let isValid = true;
    if (!codeInput || !codeInput.value.trim()) {
      if (codeInput) codeInput.classList.add('is-invalid');
      const err = document.getElementById('error-coupon-code');
      if (err) err.textContent = 'Please enter a coupon code.';
      isValid = false;
    }

    if (!discountInput || !discountInput.value.trim()) {
      if (discountInput) discountInput.classList.add('is-invalid');
      const err = document.getElementById('error-coupon-discount');
      if (err) err.textContent = 'Please enter discount display (e.g. 15% OFF).';
      isValid = false;
    }

    if (!isValid) return;

    const newCoupon = {
      id: `CPN-${Date.now().toString().slice(-4)}`,
      code: codeInput.value.trim().toUpperCase(),
      discount: discountInput.value.trim(),
      desc: descInput.value.trim() || 'Special discount for Varsha Furniture workshop orders.',
      expiry: expiryInput.value || '2026-12-31',
      status: statusInput.value || 'Active',
      used: 0
    };

    const allCoupons = getCoupons();
    allCoupons.unshift(newCoupon);
    saveCoupons(allCoupons);

    closeCouponModal();
    showToast(`Coupon "${newCoupon.code}" created successfully!`, 'success');
  }

  // ---------------- REVIEW MODAL FUNCTIONS ----------------
  function openAddReviewModal() {
    const authorInput = document.getElementById('form-review-author');
    const cityInput = document.getElementById('form-review-city');
    const productSelect = document.getElementById('form-review-product');
    const ratingSelect = document.getElementById('form-review-rating');
    const textInput = document.getElementById('form-review-text');

    if (authorInput) authorInput.value = '';
    if (cityInput) cityInput.value = 'Ahmedabad, Gujarat';
    if (ratingSelect) ratingSelect.value = '5';
    if (textInput) textInput.value = '';

    // Populate products
    if (productSelect) {
      productSelect.innerHTML = '';
      const catalog = getCatalog();
      catalog.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.title;
        opt.textContent = `${p.title} (${p.category})`;
        productSelect.appendChild(opt);
      });
    }

    document.querySelectorAll('#modal-review-form .form-error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#modal-review-form .form-control').forEach(el => el.classList.remove('is-invalid'));

    const modal = document.getElementById('modal-review-form');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeReviewModal() {
    const modal = document.getElementById('modal-review-form');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function saveReviewForm() {
    const authorInput = document.getElementById('form-review-author');
    const cityInput = document.getElementById('form-review-city');
    const productSelect = document.getElementById('form-review-product');
    const ratingSelect = document.getElementById('form-review-rating');
    const textInput = document.getElementById('form-review-text');

    let isValid = true;
    if (!authorInput || !authorInput.value.trim()) {
      if (authorInput) authorInput.classList.add('is-invalid');
      const err = document.getElementById('error-review-author');
      if (err) err.textContent = 'Please enter reviewer name.';
      isValid = false;
    }

    if (!cityInput || !cityInput.value.trim()) {
      if (cityInput) cityInput.classList.add('is-invalid');
      const err = document.getElementById('error-review-city');
      if (err) err.textContent = 'Please enter city/location.';
      isValid = false;
    }

    if (!textInput || !textInput.value.trim()) {
      if (textInput) textInput.classList.add('is-invalid');
      const err = document.getElementById('error-review-text');
      if (err) err.textContent = 'Please enter review comments.';
      isValid = false;
    }

    if (!isValid) return;

    const newReview = {
      id: `REV-${Date.now().toString().slice(-4)}`,
      author: authorInput.value.trim(),
      city: cityInput.value.trim(),
      product: productSelect ? productSelect.value : 'Varsha Furniture Seating',
      rating: Number(ratingSelect ? ratingSelect.value : 5),
      text: textInput.value.trim(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Approved'
    };

    const allReviews = getReviews();
    allReviews.unshift(newReview);
    saveReviews(allReviews);

    closeReviewModal();
    showToast(`Review from ${newReview.author} published!`, 'success');
  }

  // Delete Modal
  const btnConfirmDelete = document.getElementById('btn-confirm-delete');
  const btnCancelDelete = document.getElementById('btn-cancel-delete');
  const btnCloseDeleteModal = document.getElementById('btn-close-delete-modal');
  if (btnConfirmDelete) btnConfirmDelete.addEventListener('click', confirmDeleteProduct);
  if (btnCancelDelete) btnCancelDelete.addEventListener('click', closeDeleteConfirmModal);
  if (btnCloseDeleteModal) btnCloseDeleteModal.addEventListener('click', closeDeleteConfirmModal);

  // Unsaved Warning
  const btnKeepEditing = document.getElementById('btn-unsaved-keep');
  const btnDiscardUnsaved = document.getElementById('btn-unsaved-discard');
  if (btnKeepEditing) btnKeepEditing.addEventListener('click', closeUnsavedWarning);
  if (btnDiscardUnsaved) btnDiscardUnsaved.addEventListener('click', confirmDiscardUnsaved);

  // Export Modal
  document.querySelectorAll('.btn-trigger-export').forEach(btn => {
    btn.addEventListener('click', openExportModal);
  });
  const btnCloseExportModal = document.getElementById('btn-close-export-modal');
  const btnDownloadJs = document.getElementById('btn-download-catalog-js');
  const btnDownloadJson = document.getElementById('btn-download-catalog-json');
  const btnCopyJs = document.getElementById('btn-copy-catalog-js');
  if (btnCloseExportModal) btnCloseExportModal.addEventListener('click', closeExportModal);
  if (btnDownloadJs) btnDownloadJs.addEventListener('click', downloadCatalogJs);
  if (btnDownloadJson) btnDownloadJson.addEventListener('click', downloadCatalogJson);
  if (btnCopyJs) btnCopyJs.addEventListener('click', copyCatalogJsToClipboard);

  // Factory Reset Modal
  document.querySelectorAll('.btn-trigger-factory-reset').forEach(btn => {
    btn.addEventListener('click', openResetConfirmModal);
  });
  const btnConfirmReset = document.getElementById('btn-confirm-reset');
  const btnCancelReset = document.getElementById('btn-cancel-reset');
  const btnCloseResetModal = document.getElementById('btn-close-reset-modal');
  if (btnConfirmReset) btnConfirmReset.addEventListener('click', confirmFactoryReset);
  if (btnCancelReset) btnCancelReset.addEventListener('click', closeResetConfirmModal);
  if (btnCloseResetModal) btnCloseResetModal.addEventListener('click', closeResetConfirmModal);

  // Coupon Modal Triggers
  const btnOpenCouponModal = document.getElementById('btn-open-coupon-modal');
  const btnCloseCouponModal = document.getElementById('btn-close-coupon-modal');
  const btnCancelCoupon = document.getElementById('btn-cancel-coupon');
  const btnSaveCoupon = document.getElementById('btn-save-coupon');
  if (btnOpenCouponModal) btnOpenCouponModal.addEventListener('click', openAddCouponModal);
  if (btnCloseCouponModal) btnCloseCouponModal.addEventListener('click', closeCouponModal);
  if (btnCancelCoupon) btnCancelCoupon.addEventListener('click', closeCouponModal);
  if (btnSaveCoupon) btnSaveCoupon.addEventListener('click', saveCouponForm);

  // Review Modal Triggers
  const btnOpenReviewModal = document.getElementById('btn-open-review-modal');
  const btnCloseReviewModal = document.getElementById('btn-close-review-modal');
  const btnCancelReview = document.getElementById('btn-cancel-review');
  const btnSaveReview = document.getElementById('btn-save-review');
  if (btnOpenReviewModal) btnOpenReviewModal.addEventListener('click', openAddReviewModal);
  if (btnCloseReviewModal) btnCloseReviewModal.addEventListener('click', closeReviewModal);
  if (btnCancelReview) btnCancelReview.addEventListener('click', closeReviewModal);
  if (btnSaveReview) btnSaveReview.addEventListener('click', saveReviewForm);

  // Modals backdrop dismissal
  document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay.id === 'modal-product-form') closeProductModal(false);
        else if (overlay.id === 'modal-delete-confirm') closeDeleteConfirmModal();
        else if (overlay.id === 'modal-export-catalog') closeExportModal();
        else if (overlay.id === 'modal-reset-confirm') closeResetConfirmModal();
        else if (overlay.id === 'modal-coupon-form') closeCouponModal();
        else if (overlay.id === 'modal-review-form') closeReviewModal();
      }
    });
  });

    // Hash check
    const urlHash = window.location.hash.replace(/^#/, '');
    if (urlHash && VIEW_TITLES[urlHash]) {
      switchView(urlHash);
    }

    // Live sync products and orders from Cloudflare D1
    loadAdminDataFromD1();
  });

// Global API
window.VF_ADMIN = {
  switchView
};

})();
