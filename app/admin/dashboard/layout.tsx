'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BioForm from './components/BioForm';
import MediaForm from './components/MediaForm';
import PortfolioForm from './components/PortfolioForm';
import ServicesForm from './components/ServicesForm';
import SocialForm from './components/SocialForm';
import SettingsForm from './components/SettingsForm';

const TABS = [
  { id: 'bio', label: 'Biodata', component: BioForm },
  { id: 'media', label: 'Media', component: MediaForm },
  { id: 'portfolio', label: 'Portfolio', component: PortfolioForm },
  { id: 'services', label: 'Services', component: ServicesForm },
  { id: 'social', label: 'Social Media', component: SocialForm },
  { id: 'settings', label: 'Settings', component: SettingsForm },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('bio');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        if (!res.ok) {
          router.push('/admin');
        } else {
          setLoading(false);
        }
      } catch (err) {
        router.push('/admin');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface"><div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div></div>;
  }

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || BioForm;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <aside className="w-full md:w-60 md:fixed md:left-0 md:h-screen bg-white border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col overflow-y-auto z-10">
        <h1 className="text-lg font-semibold mb-6 text-primary">Dashboard</h1>
        
        <nav className="flex-1 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 mb-6 md:mb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap md:whitespace-normal text-sm text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-accent font-medium bg-accent/5'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent font-medium hover:underline flex items-center gap-1"
          >
            View Card →
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-secondary hover:text-red-500 text-left transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-60 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
