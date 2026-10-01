'use client';
import { motion } from 'framer-motion';
import { SocialLinks } from '@/lib/types';

export default function SocialButtons({ social, email }: { social: SocialLinks; email?: string }) {
  const buttons = [];

  if (social?.whatsapp) {
    buttons.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      url: `https://wa.me/${social.whatsapp.replace(/\D/g, '')}`,
      bg: 'bg-[#25D366]',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
      )
    });
  }

  if (social?.instagram) {
    buttons.push({
      id: 'instagram',
      label: 'Instagram',
      url: social.instagram,
      bg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      )
    });
  }

  if (social?.linkedin) {
    buttons.push({
      id: 'linkedin',
      label: 'LinkedIn',
      url: social.linkedin,
      bg: 'bg-[#0A66C2]',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    });
  }

  if (email) {
    buttons.push({
      id: 'email',
      label: 'Email',
      url: `mailto:${email}`,
      bg: 'bg-accent',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      )
    });
  }

  if (buttons.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {buttons.map((btn) => (
        <motion.a
          key={btn.id}
          href={btn.url}
          target={btn.id === 'email' ? undefined : "_blank"}
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${btn.bg} text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow font-medium text-sm`}
        >
          {btn.icon}
          {btn.label}
        </motion.a>
      ))}
    </div>
  );
}
