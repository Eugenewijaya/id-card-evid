'use client';

import { useState, useEffect } from 'react';
import type { ProfileData, PortfolioItem } from '@/lib/types';

export default function PortfolioForm() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PortfolioItem>({ id: '', title: '', description: '', imageUrl: '', projectUrl: '', year: '' });

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const profile: ProfileData = await res.json();
      if (profile?.portfolio) setItems(profile.portfolio);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const saveProfile = async (newItems: PortfolioItem[]) => {
    setSaving(true);
    setStatus(null);
    try {
      const currentProfile = await fetch('/api/profile').then(res => res.json());
      const updatedProfile = { ...currentProfile, portfolio: newItems };
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (res.ok) {
        setItems(newItems);
        setStatus({ type: 'success', msg: 'Saved successfully' });
        setTimeout(() => setStatus(null), 3000);
        setEditingId(null);
      } else {
        setStatus({ type: 'error', msg: 'Failed to save' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditForm({ id: crypto.randomUUID(), title: '', description: '', imageUrl: '', projectUrl: '', year: '' });
    setEditingId('new');
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditForm({ ...item });
    setEditingId(item.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      saveProfile(items.filter(item => item.id !== id));
    }
  };

  const handleSaveItem = () => {
    if (!editForm.title) {
      alert('Title is required');
      return;
    }
    const newItems = editingId === 'new' 
      ? [...items, editForm] 
      : items.map(item => item.id === editingId ? editForm : item);
    saveProfile(newItems);
  };

  if (loading) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary">Portfolio</h2>
        {status && <span className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{status.msg}</span>}
      </div>

      {editingId && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
          <h3 className="font-medium text-primary mb-4">{editingId === 'new' ? 'Add New Project' : 'Edit Project'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1">Title *</label>
              <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Year</label>
              <input value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Project URL</label>
              <input type="url" value={editForm.projectUrl} onChange={e => setEditForm({...editForm, projectUrl: e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent" placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1">Image URL</label>
              <input type="url" value={editForm.imageUrl} onChange={e => setEditForm({...editForm, imageUrl: e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent mb-2" placeholder="https://..." />
              {editForm.imageUrl && <img src={editForm.imageUrl} alt="Preview" className="h-20 object-cover rounded-lg border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1">Description</label>
              <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent min-h-[80px]" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-secondary hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSaveItem} disabled={saving} className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-accent hover:bg-accent/90 transition-colors disabled:opacity-70">{saving ? 'Saving...' : 'Save Project'}</button>
          </div>
        </div>
      )}

      {!editingId && (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">No img</div>
                )}
                <div className="truncate">
                  <h4 className="font-medium text-primary truncate">{item.title}</h4>
                  <p className="text-xs text-secondary truncate">{item.year || 'No year'} • {item.description || 'No description'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(item)} className="text-sm font-medium text-accent hover:underline px-2 py-1">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm font-medium text-red-500 hover:underline px-2 py-1">Delete</button>
              </div>
            </div>
          ))}

          <button onClick={handleAdd} className="w-full border border-dashed border-gray-300 rounded-xl p-4 text-secondary hover:border-accent hover:text-accent transition-colors font-medium text-sm flex items-center justify-center gap-2 mt-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Project
          </button>
        </div>
      )}
    </div>
  );
}
