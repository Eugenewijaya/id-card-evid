'use client';

import { useState, useEffect } from 'react';
import { ProfileData, CardThemeId } from '@/lib/types';
import { CARD_THEMES } from '@/lib/themes';

export default function SettingsForm() {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [accentColor, setAccentColor] = useState('#0071E3');
  const [cardTheme, setCardTheme] = useState<CardThemeId>('obsidian');
  const [testEmail, setTestEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data: ProfileData) => {
        setApiKey(data.settings?.resendApiKey || '');
        setAccentColor(data.settings?.accentColor || '#0071E3');
        setCardTheme(data.settings?.cardTheme || 'obsidian');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setStatus('saving');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            resendApiKey: apiKey,
            accentColor,
            cardTheme,
          },
        }),
      });
      if (res.ok) {
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) return;
    setTestStatus('sending');
    try {
      const res = await fetch('/api/send-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail }),
      });
      if (res.ok) {
        setTestStatus('sent');
        setTimeout(() => setTestStatus('idle'), 3000);
      } else {
        setTestStatus('error');
      }
    } catch {
      setTestStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const themes = Object.values(CARD_THEMES);

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-6">Settings</h2>

      {/* Smart ID Card Theme Selector */}
      <div className="pb-8 mb-8 border-b border-gray-100">
        <h3 className="font-medium text-primary mb-1">Pilihan Tema Kartu (Smart ID Card)</h3>
        <p className="text-sm text-secondary mb-4">
          Pilih material dan tampilan visual kartu 3D Anda. Tema yang dipilih di sini akan otomatis tampil untuk pengunjung.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((t) => {
            const isSelected = cardTheme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setCardTheme(t.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-7 rounded-md border border-black/20 shadow-sm flex items-center justify-center text-[10px]"
                    style={{ background: t.cardBg }}
                  >
                    <span className="text-[7px] font-bold text-amber-300">✦</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">{t.name}</h4>
                    <p className="text-xs text-secondary">{t.tagline}</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-accent bg-accent' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resend API Key */}
      <div className="pb-8 mb-8 border-b border-gray-100">
        <h3 className="font-medium text-primary mb-1">Resend API Key</h3>
        <p className="text-sm text-secondary mb-4">
          Required for the &quot;Save Card&quot; email feature.{' '}
          <a
            href="https://resend.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Get your API key →
          </a>
        </p>
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-20 text-sm font-mono transition-input focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary hover:text-primary px-2 py-1"
          >
            {showApiKey ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="pb-8 mb-8 border-b border-gray-100">
        <h3 className="font-medium text-primary mb-1">Accent Color</h3>
        <p className="text-sm text-secondary mb-4">
          Customize the primary accent color used across buttons and links.
        </p>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer p-1"
          />
          <input
            type="text"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            placeholder="#0071E3"
            className="w-32 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-mono transition-input focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
          <div
            className="w-12 h-12 rounded-xl shadow-sm border border-gray-100"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Save Settings */}
      <div className="pb-8 mb-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="bg-accent text-white rounded-xl px-6 py-2.5 font-medium text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
          >
            {status === 'saving' ? 'Saving...' : 'Save Settings'}
          </button>
          {status === 'saved' && (
            <span className="text-sm text-green-600">Saved successfully</span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-500">Failed to save</span>
          )}
        </div>
      </div>

      {/* Test Email */}
      <div>
        <h3 className="font-medium text-primary mb-1">Test Email</h3>
        <p className="text-sm text-secondary mb-4">
          Send a test business card email to verify your Resend setup.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="test@example.com"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-input focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
          <button
            onClick={handleTestEmail}
            disabled={testStatus === 'sending' || !testEmail}
            className="bg-primary text-white rounded-xl px-5 py-2.5 font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {testStatus === 'sending' ? 'Sending...' : 'Send Test'}
          </button>
        </div>
        {testStatus === 'sent' && (
          <p className="text-sm text-green-600 mt-2">Test email sent successfully!</p>
        )}
        {testStatus === 'error' && (
          <p className="text-sm text-red-500 mt-2">
            Failed to send. Check your API key and try again.
          </p>
        )}
      </div>
    </div>
  );
}
