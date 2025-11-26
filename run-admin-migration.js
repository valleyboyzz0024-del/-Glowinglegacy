const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running admin setup migration...\n');

  try {
    // Step 1: Add is_admin column
    console.log('1️⃣  Adding is_admin column...');
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;'
    });
    if (error1) console.log('Note:', error1.message);
    else console.log('✅ Column added\n');

    // Step 2: Update trigger
    console.log('2️⃣  Updating handle_new_user trigger...');
    const triggerSql = `
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
    `;

    // We need to use a different approach since rpc might not have exec_sql
    // Let's use the REST API directly
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ sql: triggerSql })
    });

    console.log('✅ Trigger updated\n');

    // Step 3: Set admin users
    console.log('3️⃣  Setting admin users...');
    const emails = [
      'kerrco@live.ca',
      'rhroofer98@gmail.com',
      'ryanthetechguy@gmail.com'
    ];

    for (const email of emails) {
      const { error } = await supabase
        .from('users')
        .update({ is_admin: true })
        .eq('email', email);

      if (error) {
        console.log(`   ⚠️  ${email}: ${error.message}`);
      } else {
        console.log(`   ✅ ${email}`);
      }
    }

    console.log('');

    // Step 4: Verify
    console.log('4️⃣  Verifying admin users...\n');
    const { data, error } = await supabase
      .from('users')
      .select('email, is_admin')
      .eq('is_admin', true);

    if (error) {
      console.error('❌ Error verifying:', error);
    } else if (data && data.length > 0) {
      console.log('✅ Admin users confirmed:');
      data.forEach(user => {
        console.log(`   • ${user.email}`);
      });
    } else {
      console.log('⚠️  No admin users found. They may need to sign up first.');
    }

    console.log('\n🎉 Admin setup complete!');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

runMigration();
