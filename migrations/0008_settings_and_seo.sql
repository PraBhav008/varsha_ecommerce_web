-- ============================================================================
-- Migration: 0008_settings_and_seo.sql
-- Description: Creates 'store_settings' and 'seo_metadata' tables for workshop configuration
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Store Settings Key-Value Table
CREATE TABLE IF NOT EXISTS store_settings (
  setting_key TEXT PRIMARY KEY,                    -- e.g. 'store_name', 'workshop_address'
  setting_value TEXT NOT NULL,                     -- Value (text, number string, or JSON string)
  data_type TEXT NOT NULL DEFAULT 'string' CHECK (data_type IN ('string', 'number', 'boolean', 'json')),
  category TEXT NOT NULL DEFAULT 'general',        -- 'general', 'contact', 'billing', 'shipping'
  description TEXT,                                -- Setting label or help text
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_store_settings_category ON store_settings(category);

-- 2. Create SEO Metadata Table
CREATE TABLE IF NOT EXISTS seo_metadata (
  id TEXT PRIMARY KEY,                             -- e.g., 'seo-home', 'seo-shop'
  route TEXT NOT NULL UNIQUE,                      -- Route identifier (e.g., 'home', 'shop', 'about', 'contact')
  page_name TEXT NOT NULL,                         -- Human readable label (e.g. 'Home Page')
  meta_title TEXT NOT NULL,                        -- <title> tag content
  meta_description TEXT NOT NULL,                  -- <meta name="description"> content
  keywords TEXT,                                   -- <meta name="keywords"> comma-separated
  canonical_url TEXT,                              -- Canonical link href
  og_image TEXT,                                   -- Open Graph share image URL
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_route ON seo_metadata(route);

-- 3. Automatic updated_at Triggers
CREATE TRIGGER IF NOT EXISTS trg_store_settings_updated_at
AFTER UPDATE ON store_settings
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE store_settings SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE setting_key = OLD.setting_key;
END;

CREATE TRIGGER IF NOT EXISTS trg_seo_metadata_updated_at
AFTER UPDATE ON seo_metadata
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE seo_metadata SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
