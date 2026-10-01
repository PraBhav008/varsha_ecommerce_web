-- ============================================================================
-- Migration: 0007_inquiries.sql
-- Description: Creates the 'inquiries' table to store contact messages and custom quotes
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,                             -- e.g., 'INQ-1001' or UUID
  name TEXT NOT NULL,                              -- Sender name
  email TEXT,                                      -- Sender email
  phone TEXT NOT NULL,                             -- Sender phone / WhatsApp
  subject TEXT,                                    -- Subject or interest
  message TEXT NOT NULL,                           -- Inquiry details / requirements
  inquiry_type TEXT NOT NULL DEFAULT 'General' CHECK (inquiry_type IN ('General', 'Wholesale', 'Custom Quote', 'Showroom Visit')),
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Quoted', 'Resolved', 'Archived')),
  admin_notes TEXT,                                -- Internal workshop notes / quote summary
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Indexes for Inquiry Management
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON inquiries(phone);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- 3. Automatic updated_at Trigger
CREATE TRIGGER IF NOT EXISTS trg_inquiries_updated_at
AFTER UPDATE ON inquiries
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE inquiries SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
