-- ============================================================================
-- Migration: 0002_products.sql
-- Description: Creates the 'products' table to store furniture catalog items
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,                             -- e.g., 'vf-01', 'vf-02' or UUID
  title TEXT NOT NULL,                             -- Product name
  slug TEXT UNIQUE,                                -- URL-friendly slug
  category TEXT NOT NULL,                          -- Category name (e.g. 'Dining Chairs')
  category_id TEXT,                                -- Foreign key reference to categories(id)
  price INTEGER NOT NULL CHECK (price >= 0),       -- Current selling price in INR
  original_price INTEGER CHECK (original_price IS NULL OR original_price >= price), -- MRP / compare price
  image TEXT NOT NULL,                             -- Primary product image path or URL
  desc TEXT,                                       -- Full product description
  badge TEXT DEFAULT '',                           -- e.g., 'Bestseller', 'Signature', 'Popular'
  status TEXT NOT NULL DEFAULT 'In Stock' CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock', 'Made to Order', 'Discontinued')),
  stock_quantity INTEGER NOT NULL DEFAULT 10 CHECK (stock_quantity >= 0),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  rating_avg REAL DEFAULT 5.0 CHECK (rating_avg >= 0 AND rating_avg <= 5.0),
  rating_count INTEGER DEFAULT 0 CHECK (rating_count >= 0),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 2. Indexes for Query Performance & Storefront Filters
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_badge ON products(badge);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- 3. Automatic updated_at Timestamp Trigger
CREATE TRIGGER IF NOT EXISTS trg_products_updated_at
AFTER UPDATE ON products
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE products SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
