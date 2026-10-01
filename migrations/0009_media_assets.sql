-- ============================================================================
-- Migration: 0009_media_assets.sql
-- Description: Creates the 'media_assets' table to store gallery photos and workshop media
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Media Assets Table
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,                             -- e.g., 'media-01' or UUID
  file_name TEXT NOT NULL,                         -- e.g. 'varsha-prod-01.jpg'
  file_path TEXT NOT NULL UNIQUE,                  -- e.g. 'assets/images/catalog/varsha-prod-01.jpg' or R2 URL
  title TEXT,                                      -- Friendly title
  alt_text TEXT,                                   -- Accessibility alt text
  category TEXT DEFAULT 'Catalog' CHECK (category IN ('Catalog', 'Workshop', 'Showroom', 'Banners', 'General')),
  mime_type TEXT DEFAULT 'image/jpeg',
  file_size_kb INTEGER DEFAULT 120,
  width INTEGER DEFAULT 800,
  height INTEGER DEFAULT 800,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Indexes for Media Library
CREATE INDEX IF NOT EXISTS idx_media_category ON media_assets(category);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media_assets(created_at);
