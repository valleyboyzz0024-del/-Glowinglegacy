'use client';

import { useState, useEffect } from 'react';
import { User2, Mail, Phone, Upload, Check, X } from 'lucide-react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { getSupabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface ProfileData {
  email: string;
  full_name?: string;
  phone?: string;
  created_at?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      const profile = {
        email: user.email || '',
        full_name: userData?.full_name || '',
        phone: userData?.phone_number || '',
        created_at: user.created_at,
      };

      setProfile(profile);
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setErrorMessage('Failed to load profile data');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone,
        })
        .eq('id', user.id);

      if (error) throw error;

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      loadProfile();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
    });
    setIsEditing(false);
    setErrorMessage('');
  };

  const displayName = profile?.full_name || profile?.email?.split('@')[0] || 'User';
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-heading text-gold mb-2">My Profile</h1>
          <p className="text-text-secondary">Manage your personal information and account details</p>
        </div>

        {successMessage && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 flex items-center gap-3">
            <Check className="h-5 w-5 text-green-400" />
            <span className="text-green-400">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
            <X className="h-5 w-5 text-red-400" />
            <span className="text-red-400">{errorMessage}</span>
          </div>
        )}

        <div className="rounded-xl border border-gold/20 bg-background-card/60 overflow-hidden">
          <div className="border-b border-gold/20 bg-gradient-to-r from-gold/5 to-gold/10 p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gold/10 ring-2 ring-gold/30 flex items-center justify-center">
                <span className="text-2xl font-semibold text-gold">{initials}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{displayName}</h2>
                <p className="text-text-secondary">{profile?.email}</p>
                {profile?.created_at && (
                  <p className="text-sm text-text-secondary mt-1">
                    Member since {new Date(profile.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                )}
              </div>
              <button
                onClick={() => {}}
                className="ml-auto px-4 py-2 rounded-md border border-gold/20 hover:bg-gold/10 transition-colors flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span className="text-sm">Change Photo</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User2 className="h-4 w-4 text-gold" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="px-4 py-2.5 rounded-lg border border-gold/20 bg-background/50">
                    {profile?.full_name || <span className="text-text-secondary italic">Not set</span>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gold" />
                  Email Address
                </label>
                <div className="px-4 py-2.5 rounded-lg border border-gold/20 bg-background/30 text-text-secondary">
                  {profile?.email}
                  <span className="ml-2 text-xs">(cannot be changed)</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <div className="px-4 py-2.5 rounded-lg border border-gold/20 bg-background/50">
                    {profile?.phone || <span className="text-text-secondary italic">Not set</span>}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gold/20">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                      "px-6 py-2.5 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                      "shadow-glow"
                    )}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg border border-gold/20 hover:bg-background-card/60 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 transition-colors font-medium shadow-glow"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}