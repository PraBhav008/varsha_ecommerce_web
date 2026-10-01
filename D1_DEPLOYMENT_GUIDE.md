# Cloudflare D1 Database Deployment Guide
## Project: Varsha Furniture (Ahmedabad Workshop)

This guide explains how to set up, test, and deploy the SQL migrations for Varsha Furniture to **Cloudflare D1** (serverless distributed SQLite database).

---

## 📁 Migration Files Overview

All migration files are located in the [`migrations/`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations) directory, structured and named according to the specific data domain they manage:

| File | Data Stored & Managed |
| :--- | :--- |
| [`0001_categories.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0001_categories.sql) | Product collections & taxonomies (Dining Chairs, Executive Chairs, Dining Sets, Workstations, Accent & Lounge) |
| [`0002_products.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0002_products.sql) | Furniture catalog, pricing, comparison MRP, stock levels, badges, ratings, and category relationships |
| [`0003_customers.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0003_customers.sql) | Customer directory, WhatsApp contacts, company names, cities, delivery addresses, and lifetime spend |
| [`0004_orders.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0004_orders.sql) | Workshop orders, production status workflow, payments, and individual line items (`order_items`) |
| [`0005_coupons.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0005_coupons.sql) | Promo vouchers, discount percentages/flat amounts, expiration dates, and usage counters |
| [`0006_reviews.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0006_reviews.sql) | Customer reviews, 1-5 star ratings, testimonials, and auto-sync triggers for product average ratings |
| [`0007_inquiries.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0007_inquiries.sql) | Contact form messages, custom furniture quotes, and workshop visit requests |
| [`0008_settings_and_seo.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0008_settings_and_seo.sql) | Store configuration (workshop address, WhatsApp, phone, GST) and SEO meta tags per page |
| [`0009_media_assets.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0009_media_assets.sql) | Catalog photo assets metadata (36 authentic photos), file paths, dimensions, and categories |
| [`0010_admin_users.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0010_admin_users.sql) | Admin dashboard authentication, role permissions, and active session tokens |
| [`0011_seed_initial_data.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/0011_seed_initial_data.sql) | Complete authentic initial seed data (all 36 products, orders, customers, reviews, coupons, SEO) |
| [`schema_complete.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/schema_complete.sql) | Consolidated single-file schema containing all tables, indexes, constraints, and triggers |
| [`queries_reference.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/queries_reference.sql) | Ready-to-use parameterized SQL queries for Workers / Pages (filtering, search, orders, stats) |

---

## 🚀 Step-by-Step Deployment Instructions

### Prerequisites
Make sure Node.js (v18+) is installed on your machine.

### Step 1: Login to Cloudflare via Wrangler CLI
```bash
npx wrangler login
```

### Step 2: Create Your Cloudflare D1 Database
Run the following command to provision your database on Cloudflare's edge:
```bash
npx wrangler d1 create varsha_furniture_prod
```
Cloudflare will output a configuration block similar to this:
```toml
[[d1_databases]]
binding = "DB"
database_name = "varsha_furniture_prod"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```
Copy that block into your `wrangler.toml` file (see [`wrangler.toml.example`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/wrangler.toml.example)).

---

### Step 3: Apply Migrations

You have **two deployment methods** to choose from:

#### Option A: Apply Step-by-Step Migrations (Recommended for Production)
This tracks migrations in Cloudflare D1's migration table:

1. **Test locally (Local D1 SQLite simulator):**
   ```bash
   npx wrangler d1 migrations apply varsha_furniture_prod --local
   ```

2. **Deploy to Cloudflare Cloud (Remote Live Database):**
   ```bash
   npx wrangler d1 migrations apply varsha_furniture_prod --remote
   ```

#### Option B: 1-Click Single Command Execution
If you prefer to execute the full schema directly in a single pass:

1. **Apply entire schema:**
   ```bash
   npx wrangler d1 execute varsha_furniture_prod --remote --file=./migrations/schema_complete.sql
   ```

2. **Seed all 36 authentic catalog items & initial data:**
   ```bash
   npx wrangler d1 execute varsha_furniture_prod --remote --file=./migrations/0011_seed_initial_data.sql
   ```

---

### Step 4: Verify Deployment & Inspect Tables
Run a test query remotely to verify your tables and products:
```bash
npx wrangler d1 execute varsha_furniture_prod --remote --command="SELECT category, COUNT(*) as count FROM products GROUP BY category;"
```

You should see output like:
```text
┌───────────────────────┬───────┐
│ category              │ count │
├───────────────────────┼───────┤
│ Accent & Lounge       │ 4     │
│ Dining Chairs         │ 10    │
│ Dining Sets           │ 2     │
│ Ergonomic Workstations│ 8     │
│ Executive Chairs      │ 12    │
└───────────────────────┴───────┘
```

---

## 💻 Accessing Cloudflare D1 in Cloudflare Pages / Workers

In your Cloudflare Pages Function or Worker (e.g. `/functions/api/products.js`):

```javascript
export async function onRequestGet(context) {
  const { env } = context;
  
  // Query Cloudflare D1
  const { results } = await env.DB.prepare(
    "SELECT id, title, price, original_price, image, badge, status FROM products WHERE status != 'Discontinued' ORDER BY created_at DESC"
  ).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
```
Refer to [`migrations/queries_reference.sql`](file:///c:/Users/Bhavsar%20Prathmesh/OneDrive/Documents/Projects/varsha_furniture_demo/migrations/queries_reference.sql) for all other prepared queries!
