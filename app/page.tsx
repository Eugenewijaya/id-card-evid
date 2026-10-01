import { getProfile } from '@/lib/storage';
import BusinessCard from '@/components/BusinessCard';
import DetailSheet from '@/components/DetailSheet';

export default function Page() {
  const profile = getProfile();

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-surface">
      <main>
        <section className="flex flex-col items-center justify-center min-h-[78vh] relative pt-8 pb-12">
          <BusinessCard profile={profile} />
          
          <div className="mt-8 flex flex-col items-center justify-center animate-bounce text-secondary text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mb-1">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            Scroll to view details & portfolio
          </div>
        </section>

        <section className="pb-20">
          <DetailSheet profile={profile} />
        </section>
      </main>

      <footer className="text-center py-8 text-xs text-secondary border-t border-gray-100 mt-10">
        Powered by Digital Business Card
      </footer>
    </div>
  );
}
