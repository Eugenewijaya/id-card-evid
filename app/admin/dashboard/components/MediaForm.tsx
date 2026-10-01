'use client';

import { useState, useEffect } from 'react';
import type { ProfileData, MediaInfo } from '@/lib/types';

export default function MediaForm() {
  const [data, setData] = useState<MediaInfo>({ photoUrl: '', logoUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then((profile: ProfileData) => {
        if (profile?.media) setData(profile.media);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const currentProfile = await fetch('/api/profile').then(res => res.json());
      const updatedProfile = { ...currentProfile, media: data };
      
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

  if (loading) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary">Photo & Logo</h2>
        {status && (
          <span className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {status.msg}
          </span>
        )}
      </div>

      <div className="text-sm text-secondary bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
        Use image hosting services like imgbb.com or Cloudinary. Paste the direct image URL here.
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Photo URL</label>
          <input type="url" name="photoUrl" value={data.photoUrl} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors mb-4" placeholder="https://..." />
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary">Preview:</span>
            <div className="w-24 h-24 rounded-full border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
              {data.photoUrl ? (
                <img src={data.photoUrl} alt="Photo Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '')} />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex items-center gap-2 mb-1.5">
            <label className="block text-sm font-medium text-primary">Logo URL</label>
            <span className="text-xs text-secondary">(Optional — leave empty to hide)</span>
          </div>
          <input type="url" name="logoUrl" value={data.logoUrl} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors mb-4" placeholder="https://..." />
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary">Preview:</span>
            <div className="h-16 px-4 min-w-[100px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center">
              {data.logoUrl ? (
                <img src={data.logoUrl} alt="Logo Preview" className="max-h-12 object-contain" onError={(e) => (e.currentTarget.src = '')} />
              ) : (
                <span className="text-xs text-gray-400">No Logo</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" disabled={saving} className="bg-accent text-white rounded-xl px-6 py-2.5 font-medium hover:bg-accent/90 transition-colors disabled:opacity-70">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
