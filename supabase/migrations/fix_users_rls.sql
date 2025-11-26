-- Fix Users Table RLS Policies
-- This ensures only authenticated users can access their own data

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Make sure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can only view their own data (must be authenticated)
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy 2: Users can only update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 3: Allow profile insertion (needed for the trigger that auto-creates profiles)
-- This policy allows the system to insert profiles when users sign up
CREATE POLICY "Enable insert for authenticated users only"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Users table RLS policies fixed! Only authenticated users can access their own data.';
END $$;
