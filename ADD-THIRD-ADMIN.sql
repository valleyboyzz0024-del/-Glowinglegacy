-- ====================================================================
-- ADD THIRD ADMIN (rhroofer98@gmail.com)
-- Run this AFTER they sign up to your app
-- ====================================================================

-- Option 1: If they've signed up, just run this:
UPDATE users SET is_admin = true WHERE email = 'rhroofer98@gmail.com';

-- Verify all admins:
SELECT email, is_admin, created_at FROM users WHERE is_admin = true;

-- ====================================================================
-- Option 2: Check if they exist in the users table:
SELECT email, created_at FROM users WHERE email = 'rhroofer98@gmail.com';
-- If this returns nothing, they need to sign up first at your app!
