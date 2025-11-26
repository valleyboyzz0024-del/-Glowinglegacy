-- Fix "request path is invalid" error by updating auth configuration

-- Update site URL configuration
UPDATE auth.config
SET site_url = 'https://glowinglegacy.com'
WHERE id = 1;

-- Update allowed redirect URLs
UPDATE auth.config
SET uri_allow_list = 'https://glowinglegacy.com/**,https://www.glowinglegacy.com/**,http://localhost:3000/**'
WHERE id = 1;

-- Verify the configuration
SELECT id, site_url, uri_allow_list FROM auth.config;
