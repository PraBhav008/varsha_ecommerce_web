-- ============================================================================
-- Migration: 0004_orders.sql
-- Description: Creates 'orders' and 'order_items' tables for workshop order fulfillment
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Orders Master Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,                             -- e.g., 'ORD-1084' or UUID
  order_number TEXT NOT NULL UNIQUE,               -- Friendly display code (e.g. 'VF-2026-1084')
  customer_id TEXT,                                -- Foreign key to customers(id)
  customer_name TEXT NOT NULL,                     -- Customer display name
  customer_phone TEXT NOT NULL,                    -- Direct telephone / WhatsApp contact
  customer_email TEXT,                             -- Optional notification email
  delivery_city TEXT NOT NULL,                     -- e.g. 'Bodakdev, Ahmedabad'
  delivery_address TEXT,                           -- Full shipping address
  items_summary TEXT NOT NULL,                     -- High-level summary (e.g., 'Carrara 4-Seater Marble Dining Ensemble (1)')
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0), -- Total before discount/tax
  discount INTEGER NOT NULL DEFAULT 0 CHECK (discount >= 0),
  delivery_fee INTEGER NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  tax INTEGER NOT NULL DEFAULT 0 CHECK (tax >= 0),
  total INTEGER NOT NULL CHECK (total >= 0),       -- Final payable amount in INR
  status TEXT NOT NULL DEFAULT 'Manufacturing' CHECK (status IN ('Pending', 'Confirmed', 'Manufacturing', 'Pending Dispatch', 'Delivered', 'Cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Partial Advance', 'Paid in Full', 'Refunded')),
  payment_method TEXT DEFAULT 'Bank Transfer / Workshop NEFT',
  coupon_code TEXT,                                -- Applied discount code if any
  notes TEXT,                                      -- Craftsmanship specifications, polish shade, booth fabrics
  order_date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d', 'now')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 2. Create Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,                             -- Unique item row ID
  order_id TEXT NOT NULL,                          -- Foreign key reference to orders(id)
  product_id TEXT,                                 -- Foreign key reference to products(id)
  product_title TEXT NOT NULL,                     -- Snapshot of product title
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  line_total INTEGER NOT NULL CHECK (line_total >= 0),
  customization_notes TEXT,                        -- Wood stain, fabric color, foam density notes
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 3. Indexes for Filtering & Performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- 4. Automatic updated_at Trigger for Orders
CREATE TRIGGER IF NOT EXISTS trg_orders_updated_at
AFTER UPDATE ON orders
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE orders SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;

-- 5. Trigger to automatically keep customer statistics updated when orders change
CREATE TRIGGER IF NOT EXISTS trg_sync_customer_after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
WHEN NEW.customer_id IS NOT NULL
BEGIN
  UPDATE customers
  SET orders_count = (SELECT COUNT(*) FROM orders WHERE customer_id = NEW.customer_id AND status != 'Cancelled'),
      total_spent = (SELECT COALESCE(SUM(total), 0) FROM orders WHERE customer_id = NEW.customer_id AND status != 'Cancelled'),
      last_order_date = NEW.order_date
  WHERE id = NEW.customer_id;
END;

CREATE TRIGGER IF NOT EXISTS trg_sync_customer_after_order_update
AFTER UPDATE ON orders
FOR EACH ROW
WHEN NEW.customer_id IS NOT NULL
BEGIN
  UPDATE customers
  SET orders_count = (SELECT COUNT(*) FROM orders WHERE customer_id = NEW.customer_id AND status != 'Cancelled'),
      total_spent = (SELECT COALESCE(SUM(total), 0) FROM orders WHERE customer_id = NEW.customer_id AND status != 'Cancelled')
  WHERE id = NEW.customer_id;
END;
