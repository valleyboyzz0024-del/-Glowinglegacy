'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hearAboutUs: '',
    primaryGoal: '',
    videosPerYear: '',
    interests: [] as string[],
  });

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Save onboarding preferences (we can add a preferences table later)
        // For now, just redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          How did you hear about Glowing Legacy?
        </label>
        <div className="space-y-2">
          {['Social Media', 'Friend/Family', 'Search Engine', 'Advertisement', 'Other'].map((option) => (
            <button
              key={option}
              onClick={() => setFormData({ ...formData, hearAboutUs: option })}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                formData.hearAboutUs === option
                  ? 'border-gold bg-gold/10'
                  : 'border-gold/20 hover:border-gold/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {formData.hearAboutUs === option && (
                  <Check className="w-5 h-5 text-gold" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={!formData.hearAboutUs}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          What&apos;s your primary goal with Glowing Legacy?
        </label>
        <div className="space-y-2">
          {[
            'Leave video messages for loved ones',
            'Create a family time capsule',
            'Document life stories',
            'Business succession planning',
            'Other personal reasons',
          ].map((option) => (
            <button
              key={option}
              onClick={() => setFormData({ ...formData, primaryGoal: option })}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                formData.primaryGoal === option
                  ? 'border-gold bg-gold/10'
                  : 'border-gold/20 hover:border-gold/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {formData.primaryGoal === option && (
                  <Check className="w-5 h-5 text-gold" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!formData.primaryGoal}
          className="flex-1"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          What topics interest you? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Life Advice',
            'Family History',
            'Personal Stories',
            'Business Wisdom',
            'Travel Memories',
            'Recipes & Traditions',
            'Skills & Knowledge',
            'Values & Beliefs',
          ].map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`p-4 text-center rounded-lg border-2 transition-all ${
                formData.interests.includes(interest)
                  ? 'border-gold bg-gold/10'
                  : 'border-gold/20 hover:border-gold/40'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm">{interest}</span>
                {formData.interests.includes(interest) && (
                  <Check className="w-4 h-4 text-gold" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setStep(2)}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={loading || formData.interests.length === 0}
          className="flex-1"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up...
            </>
          ) : (
            'Complete Setup'
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center glow-gold">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h1 className="text-3xl font-heading text-gold mb-2">Welcome to Glowing Legacy</h1>
          <p className="text-text-secondary">Let&apos;s personalize your experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Step {step} of 3</span>
            <span className="text-sm text-text-secondary">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gold/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Tell us about yourself'}
              {step === 2 && 'Your goals'}
              {step === 3 && 'Your interests'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Help us understand how you found us'}
              {step === 2 && 'What brings you to Glowing Legacy?'}
              {step === 3 && 'Choose topics that resonate with you'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-text-secondary hover:text-gold transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}