-- ============================================================================
-- Migration: 0005_coupons.sql
-- Description: Creates the 'coupons' table to store discount codes and vouchers
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,                             -- e.g., 'CPN-01' or UUID
  code TEXT NOT NULL UNIQUE,                       -- Promo code (e.g. 'WORKSHOP10')
  discount_type TEXT NOT NULL DEFAULT 'PERCENTAGE' CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
  discount_value REAL NOT NULL CHECK (discount_value > 0), -- e.g., 10 (for 10%) or 1500 (for ₹1500)
  discount_label TEXT NOT NULL,                    -- Display badge (e.g. '10% OFF', '₹1,500 OFF')
  description TEXT,                                -- Promotion terms & criteria
  min_order_amount INTEGER DEFAULT 0 CHECK (min_order_amount >= 0),
  max_discount_amount INTEGER,                     -- Optional ceiling cap for percentage discounts
  expiry_date TEXT NOT NULL,                       -- Date YYYY-MM-DD
  usage_limit INTEGER,                             -- Max redemption count allowed (NULL for unlimited)
  used_count INTEGER NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Disabled')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Indexes for Quick Validation at Checkout
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_status ON coupons(status);
CREATE INDEX IF NOT EXISTS idx_coupons_expiry ON coupons(expiry_date);

-- 3. Automatic updated_at Trigger
CREATE TRIGGER IF NOT EXISTS trg_coupons_updated_at
AFTER UPDATE ON coupons
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE coupons SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
