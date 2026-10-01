'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileData } from '@/lib/types';
import PortfolioSection from './PortfolioSection';
import SocialButtons from './SocialButtons';
import SendCardModal from './SendCardModal';

export default function DetailSheet({ profile }: { profile: ProfileData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const getIcon = (name: string) => {
    // Simple mapping for services
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-6">
      {profile.personal.about && (
        <motion.div 
          className="mt-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-primary">About</h3>
          <p className="text-secondary leading-relaxed">{profile.personal.about}</p>
        </motion.div>
      )}

      {profile.services && profile.services.length > 0 && (
        <motion.div 
          className="mt-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-primary">What I Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.services.map(service => (
              <div key={service.id} className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex flex-shrink-0 items-center justify-center text-accent">
                  {getIcon(service.icon)}
                </div>
                <div>
                  <h4 className="font-medium text-primary">{service.title}</h4>
                  <p className="text-sm text-secondary mt-1">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <PortfolioSection items={profile.portfolio} />

      {(profile.social || profile.personal.email) && (
        <motion.div 
          className="mt-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-primary">Connect</h3>
          <SocialButtons social={profile.social} email={profile.personal.email} />
        </motion.div>
      )}

      <motion.div 
        className="mt-16 flex justify-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border border-gray-200 text-primary font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          Save My Card
        </button>
      </motion.div>

      <SendCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ownerName={profile.personal.fullName} 
      />
    </div>
  );
}
