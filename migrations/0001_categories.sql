-- ============================================================================
-- Migration: 0001_categories.sql
-- Description: Creates the 'categories' table to store product collections/taxonomies
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,                             -- e.g., 'cat-dining-chairs' or UUID
  name TEXT NOT NULL UNIQUE,                       -- e.g., 'Dining Chairs'
  slug TEXT NOT NULL UNIQUE,                       -- e.g., 'dining-chairs'
  description TEXT,                                -- Category description
  cover_image TEXT,                               -- Banner or thumbnail image URL
  display_order INTEGER NOT NULL DEFAULT 0,        -- Sort order in navigation
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Indexes for Fast Lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- 3. Automatic updated_at Timestamp Trigger
CREATE TRIGGER IF NOT EXISTS trg_categories_updated_at
AFTER UPDATE ON categories
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE categories SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
