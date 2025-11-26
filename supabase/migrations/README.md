# Database Migrations

## Migration Order

These migrations should be applied in the following order:

### 1. Initial Setup
Run the main schema first (if starting fresh):
```sql
-- File: ../schema.sql
-- This creates all base tables, RLS policies, and functions
```

### 2. Products Setup
```sql
-- File: FULL_E_COMMERCE_SETUP.sql
-- Creates products table with proper structure
-- Seeds 11 products
-- Status: ✅ APPLIED (11 products in database)
```

### 3. Orders Tables
```sql
-- File: 20251031130000_create_orders_tables.sql
-- Creates comprehensive orders and order_items tables
-- Includes shipping/billing addresses
-- Status: ✅ APPLIED (tables exist)
```

### 4. User Profile Auto-Creation
```sql
-- File: 20251031_auto_create_user_profile.sql
-- Creates trigger to auto-create user profiles on signup
-- Status: ✅ APPLIED (trigger exists)
```

### 5. Profile Insert Policy
```sql
-- File: 20251030213144_policy_profile_insert.sql
-- Adds policy for profile insertion
-- Status: ✅ APPLIED
```

### 6. Product Creation (Duplicate - Skip)
```sql
-- File: 20251031120000_create_products_table.sql
-- SKIP THIS - products already created in FULL_E_COMMERCE_SETUP.sql
```

### 7. Image Fixes
```sql
-- File: fix_memorial_images.sql
-- Updates memorial product images
-- Status: ✅ APPLIED (can run anytime)
```

### 8. RLS Security Fix
```sql
-- File: fix_users_rls.sql
-- Fixes users table RLS policies for proper security
-- Status: ⏳ NEEDS TO BE APPLIED
-- Action: Run this in Supabase SQL Editor
```

### 9. Orders Fix (Incomplete)
```sql
-- File: fix_orders_table.sql
-- Status: ⚠️ INCOMPLETE - Just drops tables
-- Action: IGNORE this file, use 20251031130000_create_orders_tables.sql instead
```

## Current Database State

✅ **Applied Migrations:**
- Products table (11 products)
- Orders tables (comprehensive structure)
- User profile auto-creation trigger
- Product variants table
- Video purchases table
- Storage subscriptions table
- Deliveries table

⏳ **Pending:**
- fix_users_rls.sql (security fix)

⚠️ **To Remove:**
- fix_orders_table.sql (incomplete)
- 20251031120000_create_products_table.sql (duplicate)

## How to Apply Migrations

1. Go to Supabase SQL Editor:
   https://supabase.com/dashboard/project/vyavdcyidnqedtnvgxlk/sql/new

2. Copy the SQL from the migration file

3. Paste and run it

4. Test with: `node test-rls.js` (from project root)

## Rollback

If you need to start fresh:
```sql
-- WARNING: This deletes ALL data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- Then run schema.sql and all migrations in order
```
