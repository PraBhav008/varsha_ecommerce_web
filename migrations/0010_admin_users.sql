-- ============================================================================
-- Migration: 0010_admin_users.sql
-- Description: Creates 'admin_users' and 'admin_sessions' tables for secure dashboard access
-- Platform: Cloudflare D1 (SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,                             -- e.g. 'usr-owner-01' or UUID
  username TEXT NOT NULL UNIQUE,                   -- Login username (e.g., 'varsha_admin')
  email TEXT NOT NULL UNIQUE,                      -- Contact email
  password_hash TEXT NOT NULL,                     -- PBKDF2 / Argon2 / bcrypt hash
  full_name TEXT NOT NULL,                         -- Display name
  role TEXT NOT NULL DEFAULT 'manager' CHECK (role IN ('owner', 'manager', 'staff')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
);

-- 2. Create Admin Auth Sessions Table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,                             -- Session token or UUID
  user_id TEXT NOT NULL,                           -- Foreign key reference to admin_users(id)
  ip_address TEXT,
  user_agent TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%SZ', 'now')),
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- 3. Indexes for Auth Lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- 4. Automatic updated_at Trigger
CREATE TRIGGER IF NOT EXISTS trg_admin_users_updated_at
AFTER UPDATE ON admin_users
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE admin_users SET updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now')) WHERE id = OLD.id;
END;
