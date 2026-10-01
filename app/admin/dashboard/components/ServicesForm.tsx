'use client';

import { useState, useEffect } from 'react';
import { ProfileData, ServiceItem } from '@/lib/types';

const ICON_OPTIONS = [
  { value: 'briefcase', label: '💼 Briefcase' },
  { value: 'code', label: '💻 Code' },
  { value: 'palette', label: '🎨 Design' },
  { value: 'globe', label: '🌐 Web' },
  { value: 'chart', label: '📊 Analytics' },
  { value: 'star', label: '⭐ Star' },
  { value: 'camera', label: '📷 Camera' },
  { value: 'megaphone', label: '📢 Marketing' },
  { value: 'shield', label: '🛡️ Security' },
  { value: 'zap', label: '⚡ Fast' },
];

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function ServicesForm() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<ServiceItem>>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data: ProfileData) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (updatedServices: ServiceItem[]) => {
    setStatus('saving');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedServices }),
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

  const startAdd = () => {
    const newId = generateId();
    setEditingId(newId);
    setDraft({ id: newId, title: '', description: '', icon: 'briefcase' });
  };

  const startEdit = (item: ServiceItem) => {
    setEditingId(item.id);
    setDraft({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({});
  };

  const saveItem = () => {
    if (!draft.title) return;

    const item: ServiceItem = {
      id: draft.id || generateId(),
      title: draft.title || '',
      description: draft.description || '',
      icon: draft.icon || 'briefcase',
    };

    const exists = services.find((s) => s.id === item.id);
    let updated: ServiceItem[];
    if (exists) {
      updated = services.map((s) => (s.id === item.id ? item : s));
    } else {
      updated = [...services, item];
    }

    setServices(updated);
    setEditingId(null);
    setDraft({});
    handleSave(updated);
  };

  const deleteItem = (id: string) => {
    if (!confirm('Delete this service?')) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    handleSave(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-6">Services</h2>

      <div className="space-y-3 mb-4">
        {services.map((item) =>
          editingId === item.id ? (
            <div key={item.id} className="bg-white border border-accent/30 rounded-xl p-5 space-y-4">
              <input
                type="text"
                placeholder="Service title"
                value={draft.title || ''}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={draft.description || ''}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm resize-y focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
              />
              <select
                value={draft.icon || 'briefcase'}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none bg-white"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={saveItem}
                  className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-secondary hover:text-primary rounded-lg px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {ICON_OPTIONS.find((o) => o.value === item.icon)?.label.split(' ')[0] || '💼'}
                </span>
                <div>
                  <h4 className="font-medium text-sm text-primary">{item.title}</h4>
                  {item.description && (
                    <p className="text-xs text-secondary mt-0.5 line-clamp-1">{item.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="text-xs text-accent hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {editingId && !services.find((s) => s.id === editingId) && (
        <div className="bg-white border border-accent/30 rounded-xl p-5 space-y-4 mb-4">
          <input
            type="text"
            placeholder="Service title"
            value={draft.title || ''}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={draft.description || ''}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            rows={2}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm resize-y focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
          <select
            value={draft.icon || 'briefcase'}
            onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none bg-white"
          >
            {ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={saveItem}
              className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-secondary hover:text-primary rounded-lg px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!editingId && (
        <button
          onClick={startAdd}
          className="w-full border border-dashed border-gray-300 rounded-xl p-4 text-sm text-secondary hover:border-accent hover:text-accent transition-colors"
        >
          + Add Service
        </button>
      )}

      {status === 'saved' && (
        <p className="text-sm text-green-600 mt-4">Saved successfully</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-4">Failed to save</p>
      )}
    </div>
  );
}
