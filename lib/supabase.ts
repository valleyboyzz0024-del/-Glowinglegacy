import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Handle empty strings and missing values
  const hasValidConfig = url && anon && url.trim() !== '' && anon.trim() !== '';
  
  if (!hasValidConfig) {
    // During build time or when env vars are missing, return a safe placeholder client
    if (typeof window === 'undefined') {
      // Use a valid dummy URL that won't cause validation errors
      return createClient(
        'https://xyzcompany.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.placeholder'
      );
    }
    throw new Error('Supabase env not configured');
  }
  
  return createClient(url, anon);
}

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const hasValidConfig = url && service && url.trim() !== '' && service.trim() !== '';
  
  if (!hasValidConfig) {
    if (typeof window === 'undefined') {
      // Return a safe placeholder for build time
      return createClient(
        'https://xyzcompany.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjIwMDAwMDAwMDB9.placeholder'
      );
    }
    throw new Error('Supabase admin env not configured');
  }
  
  return createClient(url, service);
}
