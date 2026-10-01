-- ============================================================================
-- VARSHA FURNITURE - READY-TO-USE SQL QUERIES REFERENCE FOR CLOUDFLARE D1
-- Use in Cloudflare Workers / Pages Functions / Hono API endpoints
-- ============================================================================

-- ============================================================================
-- 1. STOREFRONT CATALOG & PRODUCT TASKS
-- ============================================================================

-- Task 1.1: Fetch all active categories with product counts
SELECT 
  c.id, 
  c.name, 
  c.slug, 
  c.description, 
  c.cover_image, 
  c.display_order,
  COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON p.category_id = c.id AND p.status != 'Discontinued'
WHERE c.is_active = 1
GROUP BY c.id
ORDER BY c.display_order ASC;

-- Task 1.2: Fetch paginated products with category and search filter
-- Parameters: ?1 = category_name (or '%'), ?2 = search_term (e.g. '%dining%'), ?3 = limit, ?4 = offset
SELECT 
  id, 
  title, 
  slug, 
  category, 
  price, 
  original_price, 
  image, 
  badge, 
  status, 
  stock_quantity,
  rating_avg,
  rating_count
FROM products
WHERE 
  (?1 = 'All' OR category = ?1)
  AND (title LIKE ?2 OR desc LIKE ?2 OR badge LIKE ?2)
  AND status != 'Discontinued'
ORDER BY 
  CASE WHEN ?5 = 'price_asc' THEN price END ASC,
  CASE WHEN ?5 = 'price_desc' THEN price END DESC,
  created_at DESC
LIMIT ?3 OFFSET ?4;

-- Task 1.3: Fetch single product details with category info
SELECT 
  p.*, 
  c.name AS category_name, 
  c.slug AS category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.id = ?1 OR p.slug = ?1;

-- Task 1.4: Fetch featured products for Homepage
SELECT id, title, slug, category, price, original_price, image, badge, status, rating_avg
FROM products
WHERE is_featured = 1 AND status != 'Discontinued'
ORDER BY created_at DESC
LIMIT 8;

-- Task 1.5: Search suggestions autocomplete
SELECT id, title, category, price, image 
FROM products 
WHERE title LIKE ?1 OR category LIKE ?1
LIMIT 6;


-- ============================================================================
-- 2. CHECKOUT & ORDER TASKS
-- ============================================================================

-- Task 2.1: Validate coupon code at checkout
SELECT 
  code, 
  discount_type, 
  discount_value, 
  discount_label, 
  min_order_amount, 
  max_discount_amount
FROM coupons
WHERE 
  code = UPPER(?1)
  AND status = 'Active'
  AND expiry_date >= date('now')
  AND (usage_limit IS NULL OR used_count < usage_limit);

-- Task 2.2: Find or create customer by phone before placing order
INSERT INTO customers (id, name, phone, email, city, address, orders_count, total_spent, last_order_date)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, 1, ?7, date('now'))
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  email = COALESCE(excluded.email, customers.email),
  city = excluded.city,
  address = COALESCE(excluded.address, customers.address);

-- Task 2.3: Insert new Order master record
INSERT INTO orders (
  id, order_number, customer_id, customer_name, customer_phone, customer_email,
  delivery_city, delivery_address, items_summary, subtotal, discount,
  delivery_fee, tax, total, status, payment_status, payment_method, coupon_code, notes, order_date
) VALUES (
  ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, 'Manufacturing', ?15, ?16, ?17, ?18, date('now')
);

-- Task 2.4: Insert Order Line Item
INSERT INTO order_items (
  id, order_id, product_id, product_title, unit_price, quantity, line_total, customization_notes
) VALUES (
  ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8
);

-- Task 2.5: Increment coupon usage counter after successful order
UPDATE coupons 
SET used_count = used_count + 1 
WHERE code = ?1;

-- Task 2.6: Decrement product stock quantity after order placement
UPDATE products 
SET stock_quantity = MAX(0, stock_quantity - ?2),
    status = CASE WHEN stock_quantity - ?2 <= 0 THEN 'Out of Stock' ELSE status END
WHERE id = ?1;


-- ============================================================================
-- 3. REVIEWS & RATINGS TASKS
-- ============================================================================

-- Task 3.1: Fetch approved reviews for a specific product
SELECT id, author, city, rating, review_text, verified_purchase, review_date
FROM reviews
WHERE product_id = ?1 AND status = 'Approved'
ORDER BY review_date DESC;

-- Task 3.2: Fetch featured reviews for Homepage Testimonials section
SELECT id, author, city, rating, product_name, review_text, review_date
FROM reviews
WHERE is_featured = 1 AND status = 'Approved'
ORDER BY rating DESC, review_date DESC
LIMIT 6;

-- Task 3.3: Submit a new customer review (defaults to Pending moderation)
INSERT INTO reviews (
  id, author, city, rating, product_id, product_name, review_text, status, verified_purchase, review_date
) VALUES (
  ?1, ?2, ?3, ?4, ?5, ?6, ?7, 'Pending', 1, date('now')
);


-- ============================================================================
-- 4. CONTACT & CUSTOM INQUIRY TASKS
-- ============================================================================

-- Task 4.1: Record new contact form inquiry
INSERT INTO inquiries (
  id, name, email, phone, subject, message, inquiry_type, status
) VALUES (
  ?1, ?2, ?3, ?4, ?5, ?6, ?7, 'New'
);

-- Task 4.2: List recent pending inquiries for workshop manager
SELECT id, name, phone, email, subject, message, inquiry_type, status, created_at
FROM inquiries
WHERE status IN ('New', 'In Progress')
ORDER BY created_at DESC;


-- ============================================================================
-- 5. ADMIN DASHBOARD & KPI ANALYTICS TASKS
-- ============================================================================

-- Task 5.1: Overall workshop performance metrics
SELECT 
  (SELECT COUNT(*) FROM products WHERE status != 'Discontinued') AS total_products,
  (SELECT COUNT(*) FROM orders WHERE status != 'Cancelled') AS total_orders,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE status != 'Cancelled') AS total_revenue,
  (SELECT COUNT(*) FROM customers) AS total_customers,
  (SELECT COUNT(*) FROM orders WHERE status = 'Manufacturing') AS pending_manufacturing_count,
  (SELECT COUNT(*) FROM orders WHERE status = 'Pending Dispatch') AS pending_dispatch_count;

-- Task 5.2: Recent orders table for Admin Dashboard
SELECT 
  o.id, 
  o.order_number, 
  o.customer_name, 
  o.customer_phone, 
  o.delivery_city, 
  o.items_summary, 
  o.total, 
  o.status, 
  o.payment_status, 
  o.order_date
FROM orders o
ORDER BY o.created_at DESC
LIMIT 10;

-- Task 5.3: Update order production / fulfillment status
UPDATE orders 
SET status = ?2 
WHERE id = ?1;

-- Task 5.4: Top 5 best selling products by revenue
SELECT 
  oi.product_id, 
  oi.product_title, 
  SUM(oi.quantity) AS total_units_sold, 
  SUM(oi.line_total) AS total_revenue
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
WHERE o.status != 'Cancelled'
GROUP BY oi.product_id, oi.product_title
ORDER BY total_revenue DESC
LIMIT 5;

-- Task 5.5: Sales revenue aggregated by month
SELECT 
  strftime('%Y-%m', order_date) AS month, 
  COUNT(id) AS orders_count, 
  SUM(total) AS monthly_revenue
FROM orders
WHERE status != 'Cancelled'
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month DESC
LIMIT 12;


-- ============================================================================
-- 6. STORE SETTINGS & SEO MANAGEMENT TASKS
-- ============================================================================

-- Task 6.1: Fetch all public store settings
SELECT setting_key, setting_value, data_type 
FROM store_settings;

-- Task 6.2: Update store setting
INSERT INTO store_settings (setting_key, setting_value, updated_at)
VALUES (?1, ?2, (strftime('%Y-%m-%d %H:%M:%SZ', 'now')))
ON CONFLICT(setting_key) DO UPDATE SET
  setting_value = excluded.setting_value,
  updated_at = excluded.updated_at;

-- Task 6.3: Fetch SEO metadata for current page route
SELECT meta_title, meta_description, keywords, canonical_url, og_image
FROM seo_metadata
WHERE route = ?1;
