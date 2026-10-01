-- ============================================================================
-- Migration: 0003_customers.sql
-- Description: Creates the 'customers' table to store client directory and order statistics
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,                             -- e.g., 'CUST-01' or UUID
  name TEXT NOT NULL,                              -- Customer full name
  company TEXT DEFAULT '',                         -- Business or entity name (optional)
  phone TEXT NOT NULL,                             -- Primary contact phone / WhatsApp
  email TEXT,                                      -- Email address
  city TEXT NOT NULL,                              -- City & State (e.g. 'Bodakdev, Ahmedabad')
  address TEXT,                                    -- Detailed delivery address
  pincode TEXT,                                    -- Postal code (e.g. '382430')
  orders_count INTEGER NOT NULL DEFAULT 0 CHECK (orders_count >= 0),
  total_spent INTEGER NOT NULL DEFAULT 0 CHECK (total_spent >= 0),
  last_order_date TEXT,                            -- YYYY-MM-DD or ISO timestamp
  notes TEXT,                                      -- Customer preferences or workshop notes
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Indexes for Search & Filter
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);
CREATE INDEX IF NOT EXISTS idx_customers_total_spent ON customers(total_spent);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

-- 3. Automatic updated_at Timestamp Trigger
CREATE TRIGGER IF NOT EXISTS trg_customers_updated_at
AFTER UPDATE ON customers
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE customers SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
