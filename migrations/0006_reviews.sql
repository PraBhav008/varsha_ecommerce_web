-- ============================================================================
-- Migration: 0006_reviews.sql
-- Description: Creates the 'reviews' table to store customer reviews and ratings
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,                             -- e.g., 'REV-01' or UUID
  author TEXT NOT NULL,                            -- Client name (e.g., 'Dr. Ketan Shah')
  city TEXT DEFAULT 'Ahmedabad',                   -- Author location
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), -- 1 to 5 Star Rating
  product_id TEXT,                                 -- Foreign key reference to products(id)
  product_name TEXT NOT NULL,                      -- Display title of product reviewed
  review_text TEXT NOT NULL,                       -- Testimonial feedback content
  status TEXT NOT NULL DEFAULT 'Approved' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  verified_purchase INTEGER NOT NULL DEFAULT 1 CHECK (verified_purchase IN (0, 1)),
  review_date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d', 'now')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 2. Indexes for Moderation and Storefront Display
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON reviews(is_featured);

-- 3. Automatic updated_at Trigger
CREATE TRIGGER IF NOT EXISTS trg_reviews_updated_at
AFTER UPDATE ON reviews
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE reviews SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;

-- 4. Trigger to recalculate product rating average and count when review is inserted/updated
CREATE TRIGGER IF NOT EXISTS trg_sync_product_rating_insert
AFTER INSERT ON reviews
FOR EACH ROW
WHEN NEW.product_id IS NOT NULL AND NEW.status = 'Approved'
BEGIN
  UPDATE products
  SET rating_avg = ROUND((SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id AND status = 'Approved'), 1),
      rating_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id AND status = 'Approved')
  WHERE id = NEW.product_id;
END;

CREATE TRIGGER IF NOT EXISTS trg_sync_product_rating_update
AFTER UPDATE ON reviews
FOR EACH ROW
WHEN NEW.product_id IS NOT NULL
BEGIN
  UPDATE products
  SET rating_avg = ROUND((SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id AND status = 'Approved'), 1),
      rating_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id AND status = 'Approved')
  WHERE id = NEW.product_id;
END;
