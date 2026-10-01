-- ============================================================================
-- Migration: 0011_seed_initial_data.sql
-- Description: Comprehensive seed data for Varsha Furniture (Ahmedabad Workshop)
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------------------------
-- 1. SEED CATEGORIES
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO categories (id, name, slug, description, cover_image, display_order, is_active) VALUES
('cat-dining-chairs', 'Dining Chairs', 'dining-chairs', 'Ergonomic upholstered and leatherette chairs engineered for residential dining and premium restaurants.', 'assets/images/catalog/varsha-prod-01.jpg', 1, 1),
('cat-executive-chairs', 'Executive Chairs', 'executive-chairs', 'High-back ergonomic leatherette chairs with heavy-duty chrome frames and synchro-tilt mechanisms for directors.', 'assets/images/catalog/varsha-prod-10.jpg', 2, 1),
('cat-dining-sets', 'Dining Sets', 'dining-sets', 'Complete composite marble-finish dining suites paired with matching upholstered seats and luxury booth benches.', 'assets/images/catalog/varsha-prod-03.jpg', 3, 1),
('cat-workstations', 'Ergonomic Workstations', 'ergonomic-workstations', 'High-performance task seating with adjustable lumbar contouring, hydraulic gas lifts, and breathable mesh.', 'assets/images/catalog/varsha-prod-11.jpg', 4, 1),
('cat-accent-lounge', 'Accent & Lounge', 'accent-lounge', 'Curved sculptural accent armchairs tailored for statement living spaces, reception suites, and lounge areas.', 'assets/images/catalog/varsha-prod-07.jpg', 5, 1);

-- ----------------------------------------------------------------------------
-- 2. SEED ALL 36 AUTHENTIC WORKSHOP PRODUCTS
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO products (id, title, slug, category, category_id, price, original_price, image, desc, badge, status, stock_quantity, is_featured) VALUES
('vf-01', 'Aria Quilted Mustard Dining Armchair', 'aria-quilted-mustard-dining-armchair', 'Dining Chairs', 'cat-dining-chairs', 4200, 5500, 'assets/images/catalog/varsha-prod-01.jpg', 'Ergonomic mustard leatherette dining armchair with diamond quilting and matte black legs.', 'Bestseller', 'In Stock', 25, 1),
('vf-02', 'Modena Tan Leather Dining Chair', 'modena-tan-leather-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 3900, 4900, 'assets/images/catalog/varsha-prod-02.jpg', 'Contoured tan faux-leather dining chair with high-resilience foam and tapered steel legs.', 'Popular', 'In Stock', 20, 1),
('vf-03', 'Elysian Onyx Marble Dining Suite', 'elysian-onyx-marble-dining-suite', 'Dining Sets', 'cat-dining-sets', 34500, 42000, 'assets/images/catalog/varsha-prod-03.jpg', 'Complete composite marble dining set with upholstered chairs and luxury booth seating.', 'Signature', 'In Stock', 8, 1),
('vf-04', 'Sienna Duo-Tone Dining Chair', 'sienna-duo-tone-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 4400, 5800, 'assets/images/catalog/varsha-prod-04.jpg', 'Two-tone quilted back dining chair crafted with premium leatherette and steel frame.', 'Featured', 'In Stock', 18, 1),
('vf-05', 'Carrara 4-Seater Marble Dining Ensemble', 'carrara-4-seater-marble-dining-ensemble', 'Dining Sets', 'cat-dining-sets', 28900, 35000, 'assets/images/catalog/varsha-prod-05.jpg', 'Polished marble-finish 4-seater dining table paired with four grey leatherette chairs.', 'Bestseller', 'In Stock', 6, 1),
('vf-06', 'Verona Tufted High-Back Chair', 'verona-tufted-high-back-chair', 'Dining Chairs', 'cat-dining-chairs', 4600, 5900, 'assets/images/catalog/varsha-prod-06.jpg', 'Tall cushioned dining chair featuring diamond-quilted upholstery and black powder-coated legs.', '', 'In Stock', 15, 0),
('vf-07', 'Milano Camel Accent Armchair', 'milano-camel-accent-armchair', 'Accent & Lounge', 'cat-accent-lounge', 4800, 6200, 'assets/images/catalog/varsha-prod-07.jpg', 'Smooth camel-tone upholstered chair with curved barrel back and minimalist metal frame.', '', 'In Stock', 12, 0),
('vf-08', 'Napoli Curved Grey Dining Chair', 'napoli-curved-grey-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 4100, 5200, 'assets/images/catalog/varsha-prod-08.jpg', 'Contemporary curved-back grey leatherette chair designed for hospitality and home dining.', '', 'In Stock', 22, 0),
('vf-09', 'Crown Sovereign Dining Chair', 'crown-sovereign-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 4750, 6000, 'assets/images/catalog/varsha-prod-09.jpg', 'Architectural high-density dining chair engineered for lasting comfort and durability.', 'Exclusive', 'In Stock', 14, 0),
('vf-10', 'Vanguard Executive Duo Office Chair', 'vanguard-executive-duo-office-chair', 'Executive Chairs', 'cat-executive-chairs', 11800, 15000, 'assets/images/catalog/varsha-prod-10.jpg', 'High-back ergonomic executive chair with chrome finish accents and heavy-duty swivel base.', 'Top Rated', 'In Stock', 10, 1),
('vf-11', 'Regent Mid-Back Workstation Chair', 'regent-mid-back-workstation-chair', 'Ergonomic Workstations', 'cat-workstations', 7800, 9800, 'assets/images/catalog/varsha-prod-11.jpg', 'Supportive mid-back ergonomic task chair with pneumatic height adjustment and smooth casters.', '', 'In Stock', 30, 0),
('vf-12', 'Apex Dual-Tone Boss Chair', 'apex-dual-tone-boss-chair', 'Executive Chairs', 'cat-executive-chairs', 12500, 16000, 'assets/images/catalog/varsha-prod-12.jpg', 'Dual-tone luxury boss chair with integrated lumbar support and polished chrome armrests.', 'Signature', 'In Stock', 9, 0),
('vf-13', 'Capri Low-Back Task Chair', 'capri-low-back-task-chair', 'Ergonomic Workstations', 'cat-workstations', 6900, 8900, 'assets/images/catalog/varsha-prod-13.jpg', 'Compact professional task chair built with reinforced steel mechanism and padded cushions.', '', 'In Stock', 25, 0),
('vf-14', 'Senator High-Back Director Chair', 'senator-high-back-director-chair', 'Executive Chairs', 'cat-executive-chairs', 13200, 17500, 'assets/images/catalog/varsha-prod-14.jpg', 'Plush multi-layer cushioned executive chair with synchro-tilt locking mechanism.', 'Popular', 'In Stock', 11, 0),
('vf-15', 'Blush Diamond Quilted Executive Chair', 'blush-diamond-quilted-executive-chair', 'Executive Chairs', 'cat-executive-chairs', 13800, 18000, 'assets/images/catalog/varsha-prod-15.jpg', 'Rose blush designer high-back chair with diamond quilted backrest and chrome star base.', 'Designer Pick', 'In Stock', 7, 0),
('vf-16', 'Blush Executive Ergonomic Chair', 'blush-executive-ergonomic-chair', 'Ergonomic Workstations', 'cat-workstations', 8900, 11500, 'assets/images/catalog/varsha-prod-16.jpg', 'Contemporary rose-hued office chair with padded armrests and tilt-tension adjustment.', '', 'In Stock', 16, 0),
('vf-17', 'Kobe Minimalist Modern Chair', 'kobe-minimalist-modern-chair', 'Accent & Lounge', 'cat-accent-lounge', 5200, 6800, 'assets/images/catalog/varsha-prod-17.jpg', 'Sculptural accent armchair with seamless upholstery and industrial powder-coated legs.', '', 'In Stock', 14, 0),
('vf-18', 'Imperial Cognac Quilted Chair', 'imperial-cognac-quilted-chair', 'Executive Chairs', 'cat-executive-chairs', 14200, 18900, 'assets/images/catalog/varsha-prod-18.jpg', 'Deep-cushioned cognac leatherette director chair with diamond cross-stitching.', 'Bestseller', 'In Stock', 12, 1),
('vf-19', 'Monarch Director High-Back Armchair', 'monarch-director-high-back-armchair', 'Executive Chairs', 'cat-executive-chairs', 15600, 20500, 'assets/images/catalog/varsha-prod-19.jpg', 'Heavy-duty executive boardroom chair with reinforced steel core and premium upholstery.', 'Premium', 'In Stock', 8, 0),
('vf-20', 'Jade Mint Curved Accent Chair', 'jade-mint-curved-accent-chair', 'Accent & Lounge', 'cat-accent-lounge', 4900, 6500, 'assets/images/catalog/varsha-prod-20.jpg', 'Pastel jade bucket armchair with tailored rear diamond quilting and black metal legs.', 'New Arrival', 'In Stock', 15, 0),
('vf-21', 'Artisan Ochre Velvet Accent Chair', 'artisan-ochre-velvet-accent-chair', 'Accent & Lounge', 'cat-accent-lounge', 5100, 6600, 'assets/images/catalog/varsha-prod-21.jpg', 'Vibrant ochre-yellow dining accent chair with curved ergonomic shell and slim legs.', '', 'In Stock', 10, 0),
('vf-22', 'Nordic Grey Leatherette Chair', 'nordic-grey-leatherette-chair', 'Dining Chairs', 'cat-dining-chairs', 3950, 5200, 'assets/images/catalog/varsha-prod-22.jpg', 'Clean Scandinavian-style upholstered chair built for residential dining and cafes.', '', 'In Stock', 20, 0),
('vf-23', 'Moda Taupe Contoured Chair', 'moda-taupe-contoured-chair', 'Dining Chairs', 'cat-dining-chairs', 4300, 5600, 'assets/images/catalog/varsha-prod-23.jpg', 'Warm taupe dining armchair designed with reinforced joint fittings and soft upholstery.', '', 'In Stock', 17, 0),
('vf-24', 'Torino Slate Grey Dining Chair', 'torino-slate-grey-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 4150, 5400, 'assets/images/catalog/varsha-prod-24.jpg', 'Refined slate grey side chair featuring precision stitching and floor-protective glides.', '', 'In Stock', 19, 0),
('vf-25', 'Aura Two-Tone Tan Office Chair', 'aura-two-tone-tan-office-chair', 'Ergonomic Workstations', 'cat-workstations', 8400, 10800, 'assets/images/catalog/varsha-prod-25.jpg', 'Contemporary work chair featuring dual-tone leatherette upholstery and chrome star base.', '', 'In Stock', 14, 0),
('vf-26', 'Presidential Teak-Trim High Back', 'presidential-teak-trim-high-back', 'Executive Chairs', 'cat-executive-chairs', 16800, 22000, 'assets/images/catalog/varsha-prod-26.jpg', 'Luxury executive throne chair with solid teak finished arm accents and high-density foam.', 'Signature', 'In Stock', 5, 1),
('vf-27', 'Dynasty Classic Boss Chair', 'dynasty-classic-boss-chair', 'Executive Chairs', 'cat-executive-chairs', 14900, 19500, 'assets/images/catalog/varsha-prod-27.jpg', 'Spacious executive high-back chair with multi-stage locking mechanism and plush arm pads.', '', 'In Stock', 8, 0),
('vf-28', 'Zenith Ergonomic Workstation Chair', 'zenith-ergonomic-workstation-chair', 'Ergonomic Workstations', 'cat-workstations', 7600, 9900, 'assets/images/catalog/varsha-prod-28.jpg', 'Sturdy task chair engineered with lumbar contouring and Class-4 hydraulic gas lift.', '', 'In Stock', 28, 1),
('vf-29', 'Matrix High-Profile Swivel Chair', 'matrix-high-profile-swivel-chair', 'Executive Chairs', 'cat-executive-chairs', 13500, 17800, 'assets/images/catalog/varsha-prod-29.jpg', 'Modern executive swivel chair equipped with nylon dual-wheel casters and tilt-lock.', '', 'In Stock', 11, 0),
('vf-30', 'Titan Two-Tone Office Chair', 'titan-two-tone-office-chair', 'Executive Chairs', 'cat-executive-chairs', 11900, 15500, 'assets/images/catalog/varsha-prod-30.jpg', 'Black and beige duo-tone ergonomic executive chair with wrapped base and cushioned arms.', 'Value Pick', 'In Stock', 13, 0),
('vf-31', 'Solstice Studio Executive Chair', 'solstice-studio-executive-chair', 'Executive Chairs', 'cat-executive-chairs', 16200, 21000, 'assets/images/catalog/varsha-prod-31.jpg', 'Editorial studio high-back chair with dual-density headrest and polished chrome armature.', 'Bestseller', 'In Stock', 6, 1),
('vf-32', 'Sovereign Brown Leather Boss Chair', 'sovereign-brown-leather-boss-chair', 'Executive Chairs', 'cat-executive-chairs', 15800, 20800, 'assets/images/catalog/varsha-prod-32.jpg', 'Hand-stitched brown leatherette director chair with deep lumbar channel quilting.', 'Exclusive', 'In Stock', 9, 0),
('vf-33', 'Onyx Duo Executive Task Chair', 'onyx-duo-executive-task-chair', 'Ergonomic Workstations', 'cat-workstations', 8200, 10500, 'assets/images/catalog/varsha-prod-33.jpg', 'Ergonomic office chair with reinforced polymer armrests and smooth pneumatic adjustment.', '', 'In Stock', 15, 0),
('vf-34', 'Meridian Grey Mesh & Leather Chair', 'meridian-grey-mesh-leather-chair', 'Ergonomic Workstations', 'cat-workstations', 9400, 12200, 'assets/images/catalog/varsha-prod-34.jpg', 'Breathable ergonomic high-back task chair engineered for long working hours.', 'Popular', 'In Stock', 12, 0),
('vf-35', 'Vintage Oak Accent Dining Chair', 'vintage-oak-accent-dining-chair', 'Dining Chairs', 'cat-dining-chairs', 4500, 5800, 'assets/images/catalog/varsha-prod-35.jpg', 'Curved profile upholstered dining chair with durable inner hardwood frame.', '', 'In Stock', 16, 0),
('vf-36', 'Signature Teal & Wood Executive Chair', 'signature-teal-wood-executive-chair', 'Executive Chairs', 'cat-executive-chairs', 17500, 23000, 'assets/images/catalog/varsha-prod-36.jpg', 'Statement teal leatherette executive chair with solid wood lacquered arms and chrome base.', 'Masterpiece', 'In Stock', 4, 1);

-- ----------------------------------------------------------------------------
-- 3. SEED CUSTOMERS DIRECTORY
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO customers (id, name, company, phone, email, city, address, orders_count, total_spent, last_order_date) VALUES
('CUST-01', 'Dr. Ketan Shah', '', '+91 98250 14231', 'dr.ketan.shah@gmail.com', 'Bodakdev, Ahmedabad', 'B-402, Satellite Towers, Bodakdev', 2, 42100, '2026-09-29'),
('CUST-02', 'Priya Mehra', '', '+91 98980 54120', 'priya.mehra@outlook.com', 'Navrangpura, Ahmedabad', '14, Swastik Society, Navrangpura', 1, 32400, '2026-09-28'),
('CUST-03', 'Anand Verma', 'Tech Innovations Pvt Ltd', '+91 97129 88340', 'anand.verma@techinnovate.in', 'Gandhinagar, Gujarat', 'Plot 18, Infocity Tower 2, Gandhinagar', 3, 89400, '2026-09-26'),
('CUST-04', 'Sunil Jhaveri', '', '+91 98240 77190', 'sunil.jhaveri@yahoo.co.in', 'Satellite, Ahmedabad', '702, Prerna Arcade, Satellite', 1, 34500, '2026-09-25'),
('CUST-05', 'Manish Patel', '', '+91 99099 23145', 'manish.patel84@gmail.com', 'Vastrapur, Ahmedabad', '12, Sunrise Park, Vastrapur', 2, 26200, '2026-09-22'),
('CUST-06', 'Deepak Sharma', 'Mumbai Corporate Spaces', '+91 98201 44556', 'd.sharma@mumbaicorp.com', 'Mumbai, Maharashtra', 'Floor 8, Nariman Point Commercial Hub', 1, 16800, '2026-09-18');

-- ----------------------------------------------------------------------------
-- 4. SEED ORDERS & LINE ITEMS
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO orders (id, order_number, customer_id, customer_name, customer_phone, customer_email, delivery_city, delivery_address, items_summary, subtotal, discount, delivery_fee, tax, total, status, payment_status, payment_method, notes, order_date) VALUES
('ORD-1084', 'VF-2026-1084', 'CUST-01', 'Dr. Ketan Shah', '+91 98250 14231', 'dr.ketan.shah@gmail.com', 'Bodakdev, Ahmedabad', 'B-402, Satellite Towers, Bodakdev', 'Carrara 4-Seater Marble Dining Ensemble (1)', 28900, 0, 0, 0, 28900, 'Manufacturing', 'Paid in Full', 'Bank Transfer / Workshop NEFT', 'Composite marble finish with grey leatherette chairs.', '2026-09-29'),
('ORD-1083', 'VF-2026-1083', 'CUST-02', 'Priya Mehra', '+91 98980 54120', 'priya.mehra@outlook.com', 'Navrangpura, Ahmedabad', '14, Swastik Society, Navrangpura', 'Solstice Studio Executive Chair (2)', 32400, 0, 0, 0, 32400, 'Pending Dispatch', 'Paid in Full', 'UPI / QR Code', 'Chrome star base with black dual-density headrest.', '2026-09-28'),
('ORD-1082', 'VF-2026-1082', 'CUST-03', 'Anand Verma (Tech Innovations)', '+91 97129 88340', 'anand.verma@techinnovate.in', 'Gandhinagar, Gujarat', 'Plot 18, Infocity Tower 2, Gandhinagar', 'Zenith Ergonomic Workstation Chair (6)', 45600, 0, 0, 0, 45600, 'Delivered', 'Paid in Full', 'Corporate Cheque / RTGS', 'Corporate office floor 3 dispatch.', '2026-09-26'),
('ORD-1081', 'VF-2026-1081', 'CUST-04', 'Sunil Jhaveri', '+91 98240 77190', 'sunil.jhaveri@yahoo.co.in', 'Satellite, Ahmedabad', '702, Prerna Arcade, Satellite', 'Elysian Onyx Marble Dining Suite (1)', 34500, 0, 0, 0, 34500, 'Delivered', 'Paid in Full', 'Bank Transfer', 'Luxury booth seating with high-gloss composite marble.', '2026-09-25'),
('ORD-1080', 'VF-2026-1080', 'CUST-05', 'Manish Patel', '+91 99099 23145', 'manish.patel84@gmail.com', 'Vastrapur, Ahmedabad', '12, Sunrise Park, Vastrapur', 'Aria Quilted Mustard Dining Armchair (4)', 16800, 0, 0, 0, 16800, 'Delivered', 'Paid in Full', 'Cash on Delivery', 'Quilted mustard leatherette with matte black steel legs.', '2026-09-22');

INSERT OR IGNORE INTO order_items (id, order_id, product_id, product_title, unit_price, quantity, line_total, customization_notes) VALUES
('ITEM-1084-1', 'ORD-1084', 'vf-05', 'Carrara 4-Seater Marble Dining Ensemble', 28900, 1, 28900, 'Composite marble top; grey leatherette upholstery'),
('ITEM-1083-1', 'ORD-1083', 'vf-31', 'Solstice Studio Executive Chair', 16200, 2, 32400, 'Black leatherette with chrome base'),
('ITEM-1082-1', 'ORD-1082', 'vf-28', 'Zenith Ergonomic Workstation Chair', 7600, 6, 45600, 'Standard black mesh with adjustable lumbar support'),
('ITEM-1081-1', 'ORD-1081', 'vf-03', 'Elysian Onyx Marble Dining Suite', 34500, 1, 34500, 'Composite onyx marble; luxury booth seating'),
('ITEM-1080-1', 'ORD-1080', 'vf-01', 'Aria Quilted Mustard Dining Armchair', 4200, 4, 16800, 'Mustard diamond quilted leatherette');

-- ----------------------------------------------------------------------------
-- 5. SEED COUPONS & PROMO VOUCHERS
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO coupons (id, code, discount_type, discount_value, discount_label, description, min_order_amount, max_discount_amount, expiry_date, usage_limit, used_count, status) VALUES
('CPN-01', 'WORKSHOP10', 'PERCENTAGE', 10, '10% OFF', '10% discount on dining suites above ₹25,000.', 25000, 5000, '2026-12-31', 100, 19, 'Active'),
('CPN-02', 'FESTIVE5', 'PERCENTAGE', 5, '5% OFF', 'Direct factory discount for festive pre-orders.', 10000, 2500, '2026-11-15', 200, 34, 'Active'),
('CPN-03', 'BULKCHAIR', 'FIXED_AMOUNT', 1500, '₹1,500 OFF', 'Flat ₹1,500 savings on orders of 4 or more dining chairs.', 16000, 1500, '2026-10-31', 50, 8, 'Active'),
('CPN-04', 'MONSOON26', 'PERCENTAGE', 7, '7% OFF', 'Monsoon special workshop promo voucher.', 15000, 2000, '2026-08-31', 100, 42, 'Expired');

-- ----------------------------------------------------------------------------
-- 6. SEED CUSTOMER REVIEWS & TESTIMONIALS
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO reviews (id, author, city, rating, product_id, product_name, review_text, status, is_featured, verified_purchase, review_date) VALUES
('REV-01', 'Dr. Ketan Shah', 'Ahmedabad', 5, 'vf-05', 'Carrara 4-Seater Marble Dining Ensemble', 'Superb quality composite marble and very sturdy chairs. Bought directly from Singarwa workshop without any middleman charges.', 'Approved', 1, 1, '2026-09-25'),
('REV-02', 'Anand Verma', 'Gandhinagar', 5, 'vf-28', 'Zenith Ergonomic Workstation Chair', 'We outfitted our corporate development floor with 6 Zenith chairs. Exceptional lower back support for long coding shifts.', 'Approved', 1, 1, '2026-09-22'),
('REV-03', 'Bhavna Trivedi', 'Ahmedabad', 5, 'vf-01', 'Aria Quilted Mustard Dining Armchair', 'The mustard color matches our dining room flawlessly. Diamond stitching is done with immense precision.', 'Approved', 1, 1, '2026-09-18'),
('REV-04', 'Sunil Jhaveri', 'Ahmedabad', 5, 'vf-31', 'Solstice Studio Executive Chair', 'Solid heavy chrome base and genuine high-density comfort. Worth every rupee.', 'Approved', 1, 1, '2026-09-12');

-- ----------------------------------------------------------------------------
-- 7. SEED STORE CONFIGURATION SETTINGS
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO store_settings (setting_key, setting_value, data_type, category, description) VALUES
('store_name', 'Varsha Furniture', 'string', 'general', 'Official brand name'),
('tagline', 'Ahmedabad Handcrafted Quality Furniture', 'string', 'general', 'Official workshop tagline'),
('workshop_address', 'Shop No 41, Shraddha industrial hub, 43, Indore - Ahmedabad Hwy, Singarwa, Ahmedabad, Gujarat 382430', 'string', 'contact', 'Factory & workshop physical location'),
('phone_primary', '8690650459', 'string', 'contact', 'Direct workshop phone number'),
('phone_formatted', '+91 86906 50459', 'string', 'contact', 'Display format telephone'),
('whatsapp_number', '918690650459', 'string', 'contact', 'Direct WhatsApp ordering number'),
('support_email', 'contact@varshafurniture.com', 'string', 'contact', 'Customer support email'),
('currency_symbol', '₹', 'string', 'billing', 'Store currency symbol'),
('currency_code', 'INR', 'string', 'billing', 'Store currency code'),
('tax_label', '18% GST Included', 'string', 'billing', 'GST tax notation for India'),
('free_delivery_min_order', '25000', 'number', 'shipping', 'Minimum order amount in INR for free delivery');

-- ----------------------------------------------------------------------------
-- 8. SEED SEO METADATA
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO seo_metadata (id, route, page_name, meta_title, meta_description, keywords, canonical_url, og_image) VALUES
('seo-home', 'home', 'Home Page', 'Varsha Furniture | Handcrafted Luxury & Executive Seating Ahmedabad', 'Varsha Furniture Ahmedabad - Premium Handcrafted Dining Chairs, Composite Marble Dining Suites, and Executive Ergonomic Seating directly from our workshop.', 'varsha furniture, dining chairs ahmedabad, marble dining set, executive office chair, singarwa furniture workshop', 'https://varshafurniture.com/', 'assets/images/catalog/varsha-prod-01.jpg'),
('seo-shop', 'shop', 'Shop & Catalog', 'Shop Premium Chairs & Dining Sets | Varsha Furniture Ahmedabad', 'Browse handcrafted dining chairs, ergonomic executive desk seating, and luxury marble dining tables direct from workshop manufacturer in Ahmedabad.', 'furniture shop ahmedabad, buy office chair, buy dining chair online, singarwa wholesale chairs', 'https://varshafurniture.com/#shop', 'assets/images/catalog/varsha-prod-03.jpg'),
('seo-about', 'about', 'About Our Workshop', 'About Varsha Furniture | 15+ Years of Handcrafted Excellence in Singarwa', 'Discover Varsha Furniture legacy in Ahmedabad: high-density ergonomic frames, genuine leatherette stitching, and composite marble mastery.', 'ahmedabad furniture manufacturer, singarwa workshop, chair craftsman gujarat', 'https://varshafurniture.com/#about', 'assets/images/catalog/varsha-prod-05.jpg'),
('seo-contact', 'contact', 'Contact & Showroom', 'Visit Workshop & Contact | Varsha Furniture Singarwa Ahmedabad', 'Visit our Shraddha Industrial Hub workshop or call +91 86906 50459 for custom bespoke orders, wholesale hospitalities, and retail dining sets.', 'varsha furniture phone, singarwa furniture shop location, buy custom furniture ahmedabad', 'https://varshafurniture.com/#contact', 'assets/images/catalog/varsha-prod-10.jpg');

-- ----------------------------------------------------------------------------
-- 9. SEED MEDIA ASSET GALLERY (All 36 Catalog Photographs)
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO media_assets (id, file_name, file_path, title, alt_text, category) VALUES
('media-01', 'varsha-prod-01.jpg', 'assets/images/catalog/varsha-prod-01.jpg', 'Aria Quilted Mustard Dining Armchair', 'Yellow quilted dining chair with black legs', 'Catalog'),
('media-02', 'varsha-prod-02.jpg', 'assets/images/catalog/varsha-prod-02.jpg', 'Modena Tan Leather Dining Chair', 'Tan leatherette curved dining chair', 'Catalog'),
('media-03', 'varsha-prod-03.jpg', 'assets/images/catalog/varsha-prod-03.jpg', 'Elysian Onyx Marble Dining Suite', 'Composite marble dining set with booth seat', 'Catalog'),
('media-04', 'varsha-prod-04.jpg', 'assets/images/catalog/varsha-prod-04.jpg', 'Sienna Duo-Tone Dining Chair', 'Duo-tone dining chair rear stitch', 'Catalog'),
('media-05', 'varsha-prod-05.jpg', 'assets/images/catalog/varsha-prod-05.jpg', 'Carrara 4-Seater Marble Dining Ensemble', 'Carrara white marble top dining ensemble', 'Catalog'),
('media-06', 'varsha-prod-06.jpg', 'assets/images/catalog/varsha-prod-06.jpg', 'Verona Tufted High-Back Chair', 'High back grey tufted dining chair', 'Catalog'),
('media-07', 'varsha-prod-07.jpg', 'assets/images/catalog/varsha-prod-07.jpg', 'Milano Camel Accent Armchair', 'Camel curved barrel lounge armchair', 'Catalog'),
('media-08', 'varsha-prod-08.jpg', 'assets/images/catalog/varsha-prod-08.jpg', 'Napoli Curved Grey Dining Chair', 'Contemporary grey side chair', 'Catalog'),
('media-09', 'varsha-prod-09.jpg', 'assets/images/catalog/varsha-prod-09.jpg', 'Crown Sovereign Dining Chair', 'Crown silhouette dining chair', 'Catalog'),
('media-10', 'varsha-prod-10.jpg', 'assets/images/catalog/varsha-prod-10.jpg', 'Vanguard Executive Duo Office Chair', 'Executive chair with chrome star base', 'Catalog'),
('media-11', 'varsha-prod-11.jpg', 'assets/images/catalog/varsha-prod-11.jpg', 'Regent Mid-Back Workstation Chair', 'Mid-back ergonomic task chair', 'Catalog'),
('media-12', 'varsha-prod-12.jpg', 'assets/images/catalog/varsha-prod-12.jpg', 'Apex Dual-Tone Boss Chair', 'Boss chair with chrome armrests', 'Catalog'),
('media-13', 'varsha-prod-13.jpg', 'assets/images/catalog/varsha-prod-13.jpg', 'Capri Low-Back Task Chair', 'Compact desk chair', 'Catalog'),
('media-14', 'varsha-prod-14.jpg', 'assets/images/catalog/varsha-prod-14.jpg', 'Senator High-Back Director Chair', 'High-back director desk chair', 'Catalog'),
('media-15', 'varsha-prod-15.jpg', 'assets/images/catalog/varsha-prod-15.jpg', 'Blush Diamond Quilted Executive Chair', 'Blush pink diamond quilted swivel chair', 'Catalog'),
('media-16', 'varsha-prod-16.jpg', 'assets/images/catalog/varsha-prod-16.jpg', 'Blush Executive Ergonomic Chair', 'Modern rose desk chair with padded armrests', 'Catalog'),
('media-17', 'varsha-prod-17.jpg', 'assets/images/catalog/varsha-prod-17.jpg', 'Kobe Minimalist Modern Chair', 'Minimalist black frame modern chair', 'Catalog'),
('media-18', 'varsha-prod-18.jpg', 'assets/images/catalog/varsha-prod-18.jpg', 'Imperial Cognac Quilted Chair', 'Cognac leatherette quilted swivel chair', 'Catalog'),
('media-19', 'varsha-prod-19.jpg', 'assets/images/catalog/varsha-prod-19.jpg', 'Monarch Director High-Back Armchair', 'Director armchair in black leatherette', 'Catalog'),
('media-20', 'varsha-prod-20.jpg', 'assets/images/catalog/varsha-prod-20.jpg', 'Jade Mint Curved Accent Chair', 'Mint pastel bucket chair with metal legs', 'Catalog'),
('media-21', 'varsha-prod-21.jpg', 'assets/images/catalog/varsha-prod-21.jpg', 'Artisan Ochre Velvet Accent Chair', 'Ochre velvet accent chair', 'Catalog'),
('media-22', 'varsha-prod-22.jpg', 'assets/images/catalog/varsha-prod-22.jpg', 'Nordic Grey Leatherette Chair', 'Scandinavian style dining chair', 'Catalog'),
('media-23', 'varsha-prod-23.jpg', 'assets/images/catalog/varsha-prod-23.jpg', 'Moda Taupe Contoured Chair', 'Warm taupe dining armchair', 'Catalog'),
('media-24', 'varsha-prod-24.jpg', 'assets/images/catalog/varsha-prod-24.jpg', 'Torino Slate Grey Dining Chair', 'Torino slate grey side chair', 'Catalog'),
('media-25', 'varsha-prod-25.jpg', 'assets/images/catalog/varsha-prod-25.jpg', 'Aura Two-Tone Tan Office Chair', 'Two-tone tan office swivel chair', 'Catalog'),
('media-26', 'varsha-prod-26.jpg', 'assets/images/catalog/varsha-prod-26.jpg', 'Presidential Teak-Trim High Back', 'Presidential high back chair with teak finish', 'Catalog'),
('media-27', 'varsha-prod-27.jpg', 'assets/images/catalog/varsha-prod-27.jpg', 'Dynasty Classic Boss Chair', 'Spacious executive high back chair', 'Catalog'),
('media-28', 'varsha-prod-28.jpg', 'assets/images/catalog/varsha-prod-28.jpg', 'Zenith Ergonomic Workstation Chair', 'Zenith task chair with lumbar contouring', 'Catalog'),
('media-29', 'varsha-prod-29.jpg', 'assets/images/catalog/varsha-prod-29.jpg', 'Matrix High-Profile Swivel Chair', 'Matrix modern executive swivel chair', 'Catalog'),
('media-30', 'varsha-prod-30.jpg', 'assets/images/catalog/varsha-prod-30.jpg', 'Titan Two-Tone Office Chair', 'Titan black and beige duo-tone chair', 'Catalog'),
('media-31', 'varsha-prod-31.jpg', 'assets/images/catalog/varsha-prod-31.jpg', 'Solstice Studio Executive Chair', 'Studio executive chair with chrome armature', 'Catalog'),
('media-32', 'varsha-prod-32.jpg', 'assets/images/catalog/varsha-prod-32.jpg', 'Sovereign Brown Leather Boss Chair', 'Sovereign brown leatherette boss chair', 'Catalog'),
('media-33', 'varsha-prod-33.jpg', 'assets/images/catalog/varsha-prod-33.jpg', 'Onyx Duo Executive Task Chair', 'Onyx duo executive task chair', 'Catalog'),
('media-34', 'varsha-prod-34.jpg', 'assets/images/catalog/varsha-prod-34.jpg', 'Meridian Grey Mesh & Leather Chair', 'Breathable ergonomic high-back task chair', 'Catalog'),
('media-35', 'varsha-prod-35.jpg', 'assets/images/catalog/varsha-prod-35.jpg', 'Vintage Oak Accent Dining Chair', 'Curved profile upholstered dining chair', 'Catalog'),
('media-36', 'varsha-prod-36.jpg', 'assets/images/catalog/varsha-prod-36.jpg', 'Signature Teal & Wood Executive Chair', 'Teal leatherette executive chair with wood arms', 'Catalog');

-- ----------------------------------------------------------------------------
-- 10. SEED DEFAULT ADMIN USER
-- Default username: admin (Password placeholder for initial installation)
-- ----------------------------------------------------------------------------
INSERT OR IGNORE INTO admin_users (id, username, email, password_hash, full_name, role, is_active) VALUES
('usr-owner-01', 'varsha_admin', 'contact@varshafurniture.com', 'pbkdf2$iterations=100000$salt=vfworkshop$hash=seedhashplaceholder', 'Varsha Workshop Administrator', 'owner', 1);
