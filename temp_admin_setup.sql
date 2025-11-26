-- Step 1: Add is_admin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Step 2: Update trigger for new users to include is_admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, is_admin, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    false,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Make your 3 team members admins
UPDATE users SET is_admin = true WHERE email = 'kerrco@live.ca';
UPDATE users SET is_admin = true WHERE email = 'rhroofer98@gmail.com';
UPDATE users SET is_admin = true WHERE email = 'ryanthetechguy@gmail.com';

-- Step 4: Verify
SELECT email, is_admin FROM users WHERE is_admin = true;
