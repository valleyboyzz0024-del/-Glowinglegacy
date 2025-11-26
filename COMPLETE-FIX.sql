-- Add your actual email as admin
UPDATE users SET is_admin = true WHERE email = 'valleyboyzz0024@gmail.com';

-- Verify admins
SELECT email, is_admin FROM users WHERE is_admin = true ORDER BY email;

-- Add last_login column if it doesn't exist (login page needs this)
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Fix the trigger with better error handling and auto-admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, is_admin, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE
      WHEN NEW.email IN (
        'kerrco@live.ca',
        'rhroofer98@gmail.com',
        'ryanthetechguy@gmail.com',
        'valleyboyzz0024@gmail.com'
      ) THEN true
      ELSE false
    END,
    NEW.created_at
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    is_admin = EXCLUDED.is_admin,
    full_name = EXCLUDED.full_name;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check RLS policies aren't blocking updates
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users';
