'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/lib/types';

export default function SocialForm() {
  const [social, setSocial] = useState({
    whatsapp: '',
    instagram: '',
    linkedin: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data: ProfileData) => {
        setSocial(data.social || { whatsapp: '', instagram: '', linkedin: '', email: '' });
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
        body: JSON.stringify({ social }),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const fields = [
    {
      key: 'whatsapp' as const,
      label: 'WhatsApp Number',
      placeholder: '+6281234567890',
      type: 'tel',
      icon: '💬',
      hint: 'Include country code, e.g. +62 for Indonesia',
    },
    {
      key: 'instagram' as const,
      label: 'Instagram URL',
      placeholder: 'https://instagram.com/username',
      type: 'url',
      icon: '📸',
      hint: 'Full URL to your Instagram profile',
    },
    {
      key: 'linkedin' as const,
      label: 'LinkedIn URL',
      placeholder: 'https://linkedin.com/in/username',
      type: 'url',
      icon: '💼',
      hint: 'Full URL to your LinkedIn profile',
    },
    {
      key: 'email' as const,
      label: 'Email',
      placeholder: 'you@example.com',
      type: 'email',
      icon: '📧',
      hint: 'Contact email displayed on your card',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-6">Social Media</h2>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-primary mb-1.5 flex items-center gap-2">
              <span>{field.icon}</span>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={social[field.key]}
              onChange={(e) => setSocial({ ...social, [field.key]: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-input focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
            />
            <p className="text-xs text-secondary mt-1">{field.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="bg-accent text-white rounded-xl px-6 py-2.5 font-medium text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
        >
          {status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        {status === 'saved' && (
          <span className="text-sm text-green-600">Saved successfully</span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-500">Failed to save</span>
        )}
      </div>
    </div>
  );
}
