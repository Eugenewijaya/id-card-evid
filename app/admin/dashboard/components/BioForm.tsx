'use client';

import { useState, useEffect } from 'react';
import type { ProfileData, PersonalInfo } from '@/lib/types';

export default function BioForm() {
  const [data, setData] = useState<PersonalInfo>({
    fullName: '', title: '', company: '', tagline: '',
    about: '', phone: '', email: '', website: '', address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then((profile: ProfileData) => {
        if (profile?.personal) setData(profile.personal);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const currentProfile = await fetch('/api/profile').then(res => res.json());
      const updatedProfile = { ...currentProfile, personal: data };
      
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Saved successfully' });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus({ type: 'error', msg: 'Failed to save' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-gray-200 rounded"></div></div></div></div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary">Biodata</h2>
        {status && (
          <span className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {status.msg}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Full Name *</label>
          <input required name="fullName" value={data.fullName} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Title</label>
          <input name="title" value={data.title} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Company</label>
          <input name="company" value={data.company} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Email *</label>
          <input required type="email" name="email" value={data.email} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Phone</label>
          <input name="phone" value={data.phone} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Website</label>
          <input type="url" name="website" value={data.website} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-1.5">Address</label>
          <input name="address" value={data.address} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-1.5">Tagline</label>
          <textarea name="tagline" value={data.tagline} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors min-h-[80px] resize-y" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-1.5">About</label>
          <textarea name="about" value={data.about} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors min-h-[120px] resize-y" />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-white rounded-xl px-6 py-2.5 font-medium hover:bg-accent/90 transition-colors disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
