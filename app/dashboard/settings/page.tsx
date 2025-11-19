'use client';

import { useState, useEffect } from 'react';
import { Settings, Bell, Lock, Shield, Trash2, Check, X, Eye, EyeOff } from 'lucide-react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { getSupabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    delivery_reminders: true,
    marketing_emails: false,
    sms_notifications: false,
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('email_notifications, delivery_reminders, marketing_emails, sms_notifications')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setNotifications({
          email_notifications: profileData.email_notifications ?? true,
          delivery_reminders: profileData.delivery_reminders ?? true,
          marketing_emails: profileData.marketing_emails ?? false,
          sms_notifications: profileData.sms_notifications ?? false,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update(notifications)
        .eq('id', user.id);

      if (error) throw error;

      setSuccessMessage('Notification settings updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Failed to update settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setIsSaving(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setIsSaving(false);
      return;
    }

    try {
      const supabase = getSupabase();
      
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setSuccessMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      setErrorMessage(error.message || 'Failed to change password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-heading text-gold mb-2">Settings</h1>
          <p className="text-text-secondary">Manage your account preferences and security</p>
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

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                      activeTab === tab.id
                        ? "bg-gold/15 text-gold border border-gold/30 shadow-glow"
                        : "hover:bg-background-card/60 border border-transparent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-gold/20 bg-background-card/60 p-6">
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      <Bell className="h-5 w-5 text-gold" />
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Choose how you want to be notified about activity
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 rounded-lg border border-gold/20 hover:bg-background-card/40 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-text-secondary">Receive updates via email</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email_notifications}
                        onChange={(e) => setNotifications({ ...notifications, email_notifications: e.target.checked })}
                        className="h-5 w-5 rounded border-gold/30 text-gold focus:ring-gold/50"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-lg border border-gold/20 hover:bg-background-card/40 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium">Delivery Reminders</div>
                        <div className="text-sm text-text-secondary">Get notified before scheduled deliveries</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.delivery_reminders}
                        onChange={(e) => setNotifications({ ...notifications, delivery_reminders: e.target.checked })}
                        className="h-5 w-5 rounded border-gold/30 text-gold focus:ring-gold/50"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-lg border border-gold/20 hover:bg-background-card/40 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-text-secondary">Receive text message alerts</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.sms_notifications}
                        onChange={(e) => setNotifications({ ...notifications, sms_notifications: e.target.checked })}
                        className="h-5 w-5 rounded border-gold/30 text-gold focus:ring-gold/50"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-lg border border-gold/20 hover:bg-background-card/40 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-text-secondary">Receive news and special offers</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.marketing_emails}
                        onChange={(e) => setNotifications({ ...notifications, marketing_emails: e.target.checked })}
                        className="h-5 w-5 rounded border-gold/30 text-gold focus:ring-gold/50"
                      />
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveNotifications}
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 transition-colors font-medium shadow-glow disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-gold" />
                      Security Settings
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Keep your account secure
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-gold"
                        >
                          {showPassword.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-gold"
                        >
                          {showPassword.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">Minimum 8 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-gold"
                        >
                          {showPassword.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleChangePassword}
                      disabled={isSaving || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="px-6 py-2.5 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 transition-colors font-medium shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gold" />
                      Privacy & Data
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Control your data and privacy settings
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gold/20 bg-background/50">
                      <h3 className="font-medium mb-2">Data Export</h3>
                      <p className="text-sm text-text-secondary mb-3">
                        Download a copy of your data including videos, messages, and account information
                      </p>
                      <button className="px-4 py-2 rounded-lg border border-gold/20 hover:bg-gold/10 transition-colors text-sm">
                        Request Data Export
                      </button>
                    </div>

                    <div className="p-4 rounded-lg border border-gold/20 bg-background/50">
                      <h3 className="font-medium mb-2">Account Visibility</h3>
                      <p className="text-sm text-text-secondary mb-3">
                        Control who can see your profile and activity
                      </p>
                      <select className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50">
                        <option>Private - Only me</option>
                        <option>Friends & Family</option>
                        <option>Public</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                      <h3 className="font-medium mb-2 flex items-center gap-2 text-red-400">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </h3>
                      <p className="text-sm text-text-secondary mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors text-sm">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}