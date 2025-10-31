'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Password reset link has been sent to your email. Please check your inbox.');
      setEmail('');
    } catch (error: any) {
      console.error('Password reset error:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center glow-gold">
              <span className="text-4xl">✨</span>
            </div>
          </div>
          <h1 className="text-3xl font-heading text-gold mb-2">Glowing Legacy</h1>
          <p className="text-text-secondary">Reset Your Password</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            {status === 'success' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-green-500 text-sm">{message}</div>
                </div>
                <div className="text-sm text-text-secondary text-center">
                  <p>Didn&apos;t receive the email?</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-gold hover:underline mt-2"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="text-destructive text-sm">{message}</div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors text-lg"
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex-col space-y-4">
            <div className="w-full border-t border-gold/20 pt-4">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-gold hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Log In
              </Link>
            </div>

            <div className="text-sm text-center text-text-secondary">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-gold hover:underline font-semibold">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary mb-2">Need help?</p>
          <a
            href="mailto:support@glowinglegacy.com"
            className="text-gold hover:underline text-sm"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}