const { Client } = require('pg');

// Connection string for Supabase PostgreSQL
const connectionString = 'postgresql://postgres.vyavdcyidnqedtnvgxlk:RYANDANNYRYAN98@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

async function runMigration() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Connecting to Supabase database...\n');
    await client.connect();
    console.log('✅ Connected!\n');

    // Step 1: Add is_admin column
    console.log('1️⃣  Adding is_admin column...');
    await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;');
    console.log('✅ Column added\n');

    // Step 2: Update trigger for new users
    console.log('2️⃣  Updating handle_new_user trigger...');
    await client.query(`
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
    `);
    console.log('✅ Trigger updated\n');

    // Step 3: Make your 3 team members admins
    console.log('3️⃣  Setting admin users...');

    const emails = [
      'kerrco@live.ca',
      'rhroofer98@gmail.com',
      'ryanthetechguy@gmail.com'
    ];

    for (const email of emails) {
      const result = await client.query(
        'UPDATE users SET is_admin = true WHERE email = $1 RETURNING email',
        [email]
      );

      if (result.rowCount > 0) {
        console.log(`   ✅ ${email} - set as admin`);
      } else {
        console.log(`   ⚠️  ${email} - user not found (they need to sign up first)`);
      }
    }

    console.log('');

    // Step 4: Verify
    console.log('4️⃣  Verifying admin users...\n');
    const result = await client.query(
      'SELECT email, is_admin FROM users WHERE is_admin = true ORDER BY email'
    );

    if (result.rows.length > 0) {
      console.log('✅ Admin users confirmed:');
      result.rows.forEach(user => {
        console.log(`   • ${user.email}`);
      });
    } else {
      console.log('⚠️  No admin users found yet. Make sure they sign up first.');
    }

    console.log('\n🎉 Admin setup complete!');
    console.log('\n📋 Summary:');
    console.log('   • is_admin column added to users table');
    console.log('   • handle_new_user() trigger updated');
    console.log('   • Admin users configured');
    console.log('\n🔒 Only these admins can access /dashboard/products now!');

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error('\nFull error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
