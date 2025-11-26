const https = require('https');

const projectRef = 'vyavdcyidnqedtnvgxlk';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YXZkY3lpZG5xZWR0bnZneGxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTg4MjczOCwiZXhwIjoyMDc3NDU4NzM4fQ.tvm-Ens-cCdjjix9pkclxrVPH8FYoMBF2v1hHNv6Exc';

const authConfig = {
  SITE_URL: 'https://glowinglegacy.com',
  URI_ALLOW_LIST: [
    'https://glowinglegacy.com/**',
    'https://www.glowinglegacy.com/**',
    'https://glowinglegacy.com/auth/callback',
    'https://www.glowinglegacy.com/auth/callback',
    'http://localhost:3000/**',
    'http://localhost:3000/auth/callback'
  ].join(',')
};

const data = JSON.stringify(authConfig);

const options = {
  hostname: `${projectRef}.supabase.co`,
  port: 443,
  path: '/auth/v1/config',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'apikey': serviceRoleKey,
    'Authorization': `Bearer ${serviceRoleKey}`
  }
};

console.log('🔧 Updating Supabase Auth Configuration...\n');
console.log('Site URL:', authConfig.SITE_URL);
console.log('Allowed Redirect URLs:', authConfig.URI_ALLOW_LIST.split(',').join('\n  - '));
console.log('');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 204) {
      console.log('✅ Auth configuration updated successfully!');
      console.log('\n📋 Next steps:');
      console.log('1. Test signup at: https://glowinglegacy.com/signup');
      console.log('2. Check if confirmation email is sent');
      console.log('3. Verify email link redirects correctly');
    } else {
      console.log('❌ Failed to update configuration');
      console.log('Status:', res.statusCode);
      console.log('Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(data);
req.end();
