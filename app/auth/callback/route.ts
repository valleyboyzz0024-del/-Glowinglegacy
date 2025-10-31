import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = getSupabase();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to onboarding after confirmation
  return NextResponse.redirect(new URL('/onboarding', requestUrl.origin));
}