/**
 * VARSHA FURNITURE - Interactive Application Script
 * Handcrafted in Ahmedabad | Contact: +91 86906 50459
 */

(function () {
  'use strict';

  // ---------------- State Management ----------------
  const state = {
    cart: JSON.parse(localStorage.getItem('vf_cart') || '[]'),
    activeCategory: 'All',
    searchQuery: '',
    currentModalProduct: null
  };

  const BUSINESS_PHONE = '8690650459';
  const BUSINESS_PHONE_FORMATTED = '+91 86906 50459';

  // ---------------- DOM Element References ----------------
  const elements = {
    productsGrid: document.getElementById('products-grid'),
    featuredGrid: document.getElementById('featured-grid'),
    cartBadge: document.getElementById('cart-badge'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartItemsBody: document.getElementById('cart-items-body'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTotal: document.getElementById('cart-total'),
    productModal: document.getElementById('product-modal'),
    cookieBanner: document.getElementById('cookie-banner'),
    toastNotice: document.getElementById('toast-notice'),
    mobileNav: document.getElementById('nav-menu'),
    mobileToggle: document.getElementById('mobile-toggle')
  };

  // ---------------- Format Currency Helper ----------------
  function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // ---------------- Toast Notification ----------------
  function showToast(message) {
    if (!elements.toastNotice) return;
    elements.toastNotice.textContent = message;
    elements.toastNotice.classList.add('show');
    setTimeout(() => {
      elements.toastNotice.classList.remove('show');
    }, 2800);
  }

  // ---------------- Render Products ----------------
  function refreshProductsFromStorage() {
    if (typeof getVarshaProducts === 'function') {
      VARSHA_PRODUCTS = getVarshaProducts();
    }
  }

  // Fetch live products from Cloudflare D1 /api/products if deployed on Pages
  async function loadProductsFromD1() {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          VARSHA_PRODUCTS = data.products.map(p => ({
            ...p,
            originalPrice: p.original_price ?? p.originalPrice
          }));
          renderFeaturedHome();
          renderCategoryTabs();
          renderCatalog();
        }
      }
    } catch (e) {
      // In local file mode or offline, fallback smoothly to products.js catalog
    }
  }

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    const isOutOfStock = product.status === 'Out of Stock';
    let badgeHtml = '';
    if (isOutOfStock) {
      badgeHtml = `<span class="card-badge" style="background-color: #7A271A; color: #FFF;">Out of Stock</span>`;
    } else if (product.badge) {
      badgeHtml = `<span class="card-badge">${product.badge}</span>`;
    }

    card.innerHTML = `
      <div class="card-media" onclick="window.VF.openModal('${product.id}')">
        ${badgeHtml}
        <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='assets/images/catalog/varsha-prod-01.jpg'">
        <div class="card-quick-actions">
          <button class="btn-card-quick" type="button" onclick="event.stopPropagation(); window.VF.openModal('${product.id}')">
            Quick View
          </button>
        </div>
      </div>
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="card-category">${product.category}</span>
          ${product.status && product.status !== 'In Stock' ? `<span style="font-size: 0.72rem; color: #B45309; font-weight: 500;">${product.status}</span>` : ''}
        </div>
        <h4 class="card-title" onclick="window.VF.openModal('${product.id}')">${product.title}</h4>
        <div class="card-footer">
          <div class="price-wrap">
            <span class="card-price">${formatINR(product.price)}</span>
            ${product.originalPrice ? `<span class="card-price-original">${formatINR(product.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-card-add" type="button" title="${isOutOfStock ? 'Currently Out of Stock' : 'Add to Cart'}" ${isOutOfStock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''} onclick="event.stopPropagation(); ${isOutOfStock ? `window.VF.showToast('Item is out of stock. Contact workshop for custom order.');` : `window.VF.addToCart('${product.id}', 1)`}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
    return card;
  }

  function renderCategoryTabs() {
    const tabsContainer = document.querySelector('.category-tabs-wrap');
    if (!tabsContainer) return;

    refreshProductsFromStorage();
    const categories = ['All', ...new Set(VARSHA_PRODUCTS.map(p => p.category).filter(Boolean))];

    tabsContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-tab ${state.activeCategory === cat ? 'active' : ''}`;
      btn.setAttribute('data-cat', cat);
      if (cat === 'All') {
        btn.textContent = `All Items (${VARSHA_PRODUCTS.length})`;
      } else {
        const count = VARSHA_PRODUCTS.filter(p => p.category === cat).length;
        btn.textContent = `${cat} (${count})`;
      }
      btn.addEventListener('click', () => {
        filterCategory(cat);
      });
      tabsContainer.appendChild(btn);
    });
  }

  function renderCatalog() {
    refreshProductsFromStorage();
    if (!elements.productsGrid) return;
    elements.productsGrid.innerHTML = '';

    let filtered = VARSHA_PRODUCTS;

    if (state.activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === state.activeCategory);
    }

    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-text-muted);">
          <p style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 8px;">No furniture found matching your criteria.</p>
          <button class="btn-secondary" style="margin-top: 12px;" onclick="window.VF.filterCategory('All')">View All Collections</button>
        </div>
      `;
      return;
    }

    filtered.forEach(prod => {
      elements.productsGrid.appendChild(createProductCard(prod));
    });
  }

  function renderFeaturedHome() {
    refreshProductsFromStorage();
    if (!elements.featuredGrid) return;
    elements.featuredGrid.innerHTML = '';
    // Showcase top 8 bestsellers / signature pieces
    const featured = VARSHA_PRODUCTS.filter(p => p.badge && p.badge !== '').slice(0, 8);
    // If fewer than 8 with badges, fill with first products
    const list = featured.length >= 4 ? featured : VARSHA_PRODUCTS.slice(0, 8);
    list.forEach(prod => {
      elements.featuredGrid.appendChild(createProductCard(prod));
    });
  }

  // ---------------- Cart Logic ----------------
  function saveCart() {
    localStorage.setItem('vf_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (elements.cartBadge) {
      elements.cartBadge.textContent = totalItems;
      elements.cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (!elements.cartItemsBody) return;

    if (state.cart.length === 0) {
      elements.cartItemsBody.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 4px;">Your cart is empty</p>
          <p style="font-size: 0.8rem;">Browse our handcrafted collection and add items to your cart.</p>
        </div>
      `;
      if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatINR(0);
      if (elements.cartTotal) elements.cartTotal.textContent = formatINR(0);
      return;
    }

    let subtotal = 0;
    elements.cartItemsBody.innerHTML = '';

    state.cart.forEach(item => {
      const prod = VARSHA_PRODUCTS.find(p => p.id === item.id);
      if (!prod) return;

      const itemTotal = prod.price * item.qty;
      subtotal += itemTotal;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-thumb">
          <img src="${prod.image}" alt="${prod.title}">
        </div>
        <div class="cart-item-info">
          <h5 class="cart-item-title">${prod.title}</h5>
          <div class="cart-item-price">${formatINR(prod.price)}</div>
          <div class="cart-qty-controls">
            <button class="qty-btn" type="button" onclick="window.VF.updateQty('${prod.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" type="button" onclick="window.VF.updateQty('${prod.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" type="button" title="Remove" onclick="window.VF.removeFromCart('${prod.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      elements.cartItemsBody.appendChild(row);
    });

    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatINR(subtotal);
    if (elements.cartTotal) elements.cartTotal.textContent = formatINR(subtotal);
  }

  function addToCart(productId, qty = 1) {
    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ id: productId, qty: qty });
    }
    saveCart();
    const prod = VARSHA_PRODUCTS.find(p => p.id === productId);
    showToast(`Added to cart: ${prod ? prod.title : 'Item'}`);
    openCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    showToast('Item removed from cart');
  }

  function updateQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }

  function openCart() {
    if (elements.cartDrawer) elements.cartDrawer.classList.add('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (elements.cartDrawer) elements.cartDrawer.classList.remove('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---------------- Product Modal ----------------
  function openModal(productId) {
    const prod = VARSHA_PRODUCTS.find(p => p.id === productId);
    if (!prod || !elements.productModal) return;

    state.currentModalProduct = prod;

    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalPriceOrig = document.getElementById('modal-price-orig');
    const modalDesc = document.getElementById('modal-desc');
    const modalWhatsapp = document.getElementById('modal-whatsapp-link');

    if (modalImg) modalImg.src = prod.image;
    if (modalCategory) modalCategory.textContent = prod.category;
    if (modalTitle) modalTitle.textContent = prod.title;
    if (modalPrice) modalPrice.textContent = formatINR(prod.price);
    if (modalPriceOrig) {
      modalPriceOrig.textContent = prod.originalPrice ? formatINR(prod.originalPrice) : '';
    }
    if (modalDesc) modalDesc.textContent = prod.desc;

    if (modalWhatsapp) {
      const msg = encodeURIComponent(`Hello Varsha Furniture, I am interested in: ${prod.title} (${formatINR(prod.price)}). Please provide more details.`);
      modalWhatsapp.href = `https://wa.me/${BUSINESS_PHONE}?text=${msg}`;
    }

    elements.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (elements.productModal) elements.productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---------------- SPA Router ----------------
  let isInternalNav = false;

  function navigateTo(route) {
    const cleanRoute = (route || 'home').replace(/^#/, '');
    const validRoutes = ['home', 'shop', 'about', 'contact', 'faqs', 'terms', 'privacy'];
    const activeRoute = validRoutes.includes(cleanRoute) ? cleanRoute : 'home';

    // Hide all page views
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    // Show active page view
    const targetView = document.getElementById(`view-${activeRoute}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Update nav link active classes
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkTarget = link.getAttribute('data-route');
      if (linkTarget === activeRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile nav if open
    if (elements.mobileNav) elements.mobileNav.classList.remove('open');

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Only sync URL history if running on a web server (prevents Chromium file:// frame origin security warning)
    if (window.location.protocol !== 'file:' && window.location.hash !== `#${activeRoute}`) {
      try {
        window.history.pushState(null, '', `#${activeRoute}`);
      } catch (err) {
        // Silently ignored if blocked by sandbox
      }
    }
  }

  // ---------------- Category Filter ----------------
  function filterCategory(category) {
    state.activeCategory = category;
    document.querySelectorAll('.category-tab').forEach(tab => {
      if (tab.getAttribute('data-cat') === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    renderCatalog();
  }

  // ---------------- Cookie Banner ----------------
  function initCookieBanner() {
    const accepted = localStorage.getItem('vf_cookies_accepted');
    if (!accepted && elements.cookieBanner) {
      setTimeout(() => {
        elements.cookieBanner.classList.add('show');
      }, 900);
    }
  }

  function acceptCookies() {
    localStorage.setItem('vf_cookies_accepted', 'true');
    if (elements.cookieBanner) elements.cookieBanner.classList.remove('show');
    showToast('Demo cookie preferences saved');
  }

  function declineCookies() {
    localStorage.setItem('vf_cookies_accepted', 'declined');
    if (elements.cookieBanner) elements.cookieBanner.classList.remove('show');
  }

  // ---------------- FAQs Accordion ----------------
  function initFAQs() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  // ---------------- Event Listeners & Initialization ----------------
  document.addEventListener('DOMContentLoaded', () => {
    // Render initial views
    refreshProductsFromStorage();
    renderFeaturedHome();
    renderCategoryTabs();
    renderCatalog();
    updateCartUI();
    initFAQs();
    initCookieBanner();

    // Fetch live Cloudflare D1 products (if running via Pages/Workers)
    loadProductsFromD1();

    // Listen for storage changes from admin dashboard tab
    window.addEventListener('storage', (e) => {
      if (e.key === 'varsha_furniture_catalog') {
        refreshProductsFromStorage();
        renderFeaturedHome();
        renderCategoryTabs();
        renderCatalog();
      }
    });

    // Check initial route
    const initialRoute = window.location.hash || '#home';
    navigateTo(initialRoute);

    // Hash change listener (handles browser back/forward buttons on web servers)
    window.addEventListener('hashchange', () => {
      if (isInternalNav) return;
      navigateTo(window.location.hash);
    });

    // Intercept internal anchor clicks to prevent Chromium file:// frame navigation warnings
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const route = link.getAttribute('data-route') || href.replace(/^#/, '');
          if (route) {
            navigateTo(route);
          }
        }
      }
    });

    // Mobile menu toggle
    if (elements.mobileToggle && elements.mobileNav) {
      elements.mobileToggle.addEventListener('click', () => {
        elements.mobileNav.classList.toggle('open');
      });
    }

    // Header scroll blur effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Category tabs click
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-cat');
        filterCategory(cat);
      });
    });

    // Global click listener for closing modal on backdrop
    if (elements.productModal) {
      elements.productModal.addEventListener('click', (e) => {
        if (e.target === elements.productModal) closeModal();
      });
    }

    // Modal Add To Cart
    const modalAddBtn = document.getElementById('modal-add-btn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (state.currentModalProduct) {
          addToCart(state.currentModalProduct.id, 1);
          closeModal();
        }
      });
    }

    // Storefront checkout button -> Place order in Cloudflare D1
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', async () => {
        if (state.cart.length === 0) {
          showToast('Your cart is empty');
          return;
        }

        const itemsSummary = state.cart.map(i => {
          const p = VARSHA_PRODUCTS.find(prod => prod.id === i.id);
          return `${p ? p.title : i.id} (${i.qty})`;
        }).join(', ');

        const totalAmount = state.cart.reduce((sum, item) => {
          const p = VARSHA_PRODUCTS.find(prod => prod.id === item.id);
          return sum + (p ? p.price * item.qty : 0);
        }, 0);

        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerName: 'Direct Online Client',
              deliveryCity: 'Ahmedabad',
              itemsSummary,
              subtotal: totalAmount,
              total: totalAmount,
              status: 'Manufacturing',
              notes: 'Placed via storefront cart'
            })
          });
        } catch (e) {}

        state.cart = [];
        saveCart();
        closeCart();
        showToast('Order confirmed! Our workshop team will reach out shortly.');
      });
    }

    // Contact form submit -> Save to Cloudflare D1
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || '';
        const phone = document.getElementById('contact-phone')?.value || '';
        const subject = document.getElementById('contact-category')?.value || 'General Inquiry';
        const message = document.getElementById('contact-message')?.value || '';

        try {
          await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, subject, message, inquiryType: subject })
          });
        } catch (err) {
          // Graceful fallback
        }

        showToast('Thank you! Your inquiry has been sent to the workshop.');
        contactForm.reset();
      });
    }

    // Search bar listener if exists
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderCatalog();
      });
    }
  });

  // Export public API to window
  window.VF = {
    addToCart,
    removeFromCart,
    updateQty,
    openCart,
    closeCart,
    openModal,
    closeModal,
    navigateTo,
    filterCategory,
    acceptCookies,
    declineCookies,
    showToast
  };

})();
