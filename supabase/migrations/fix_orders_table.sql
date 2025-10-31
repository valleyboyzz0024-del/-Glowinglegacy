-- Fix Orders Table - Add Missing Columns
-- Run this if you get "column does not exist" errors

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Now run the full orders setup
-- Copy and paste the ENTIRE contents of:
-- glowing-legacy/supabase/migrations/20251031130000_create_orders_tables.sql

-- OR just add the missing columns if table exists:
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'refunded'));