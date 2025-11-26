-- ====================================================================
-- FIX ADMIN EMAIL + CHECK AUTH ISSUES
-- ====================================================================

-- 1. Make your actual email an admin
UPDATE users SET is_admin = true WHERE email = 'valleyboyzz0024@gmail.com';

-- 2. Also add the other email for when you use it
UPDATE users SET is_admin = true WHERE email = 'rhroofer98@gmail.com';

-- 3. Verify all admins
SELECT email, is_admin FROM users WHERE is_admin = true;

-- 4. Check if the handle_new_user trigger is causing issues
-- Let's see recent auth users
SELECT email, created_at, confirmed_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check for any errors in users table
SELECT id, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- 6. If signup is timing out, the trigger might be failing
-- Let's make the trigger more robust with error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, is_admin, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE
      WHEN NEW.email IN ('kerrco@live.ca', 'rhroofer98@gmail.com', 'ryanthetechguy@gmail.com', 'valleyboyzz0024@gmail.com')
      THEN true
      ELSE false
    END,
    NEW.created_at
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    is_admin = EXCLUDED.is_admin;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block signup
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
