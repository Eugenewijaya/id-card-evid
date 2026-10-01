'use client';

import { ProfileData } from '@/lib/types';
import { CardThemeConfig } from '@/lib/themes';
import CardPatterns from './CardPatterns';

interface CardBackProps {
  profile: ProfileData;
  theme: CardThemeConfig;
}

export default function CardBack({ profile, theme }: CardBackProps) {
  const { personal } = profile;

  return (
    <div
      className={`absolute inset-0 rounded-2xl ${theme.cardBorder} flex flex-col justify-between overflow-hidden backface-hidden select-none`}
      style={{
        background: theme.cardBg,
        boxShadow: theme.cardShadow,
        transform: 'rotateY(180deg)',
      }}
    >
      <CardPatterns type={theme.patternType} />

      {/* Top: Smart Card Magnetic Encoding Stripe */}
      <div className="relative z-10 w-full pt-4">
        <div className={`w-full h-8 sm:h-9 ${theme.magneticStripe} shadow-inner border-y relative flex items-center justify-between px-4`}>
          <span className="text-[8px] font-mono font-bold tracking-widest text-amber-300 uppercase">
            SMART RFID PROTOCOL
          </span>
          <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
            OFFICIAL DIGITAL CREDENTIAL
          </span>
        </div>
      </div>

      {/* Middle: Signature Panel & Official Contact Channels */}
      <div className="relative z-10 px-5 sm:px-6 my-auto">
        {/* Signature Strip */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex-1 h-7 sm:h-8 rounded-sm ${theme.signatureStripBg} px-3 flex items-center justify-between shadow-inner relative overflow-hidden border border-gray-300`}>
            <span className="text-[8px] font-mono font-bold tracking-tight text-gray-500 uppercase truncate select-none pointer-events-none">
              CARDHOLDER SIGNATURE
            </span>
            <span
              className={`text-sm italic font-serif ${theme.signatureTextColor} font-black select-none pr-2`}
              style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-2deg)' }}
            >
              {personal.fullName || 'Evid Wijaya'}
            </span>
          </div>

          {/* Security Hologram Seal */}
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex-shrink-0 flex items-center justify-center shadow-md relative overflow-hidden border-2 border-white/60"
            style={{
              background:
                theme.hologramType === 'gold'
                  ? 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #B45309 100%)'
                  : theme.hologramType === 'silver'
                  ? 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #475569 100%)'
                  : 'linear-gradient(135deg, #06B6D4 0%, #EC4899 50%, #F59E0B 100%)',
            }}
            title="Official Security Hologram"
          >
            <span className="text-xs font-black text-black drop-shadow">✦</span>
          </div>
        </div>

        {/* Contact Coordinates with High-Contrast Badges */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] sm:text-xs">
          {personal.email && (
            <div className="flex items-center gap-2 truncate">
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${theme.labelBadgeBg}`}>
                EMAIL
              </span>
              <span className={`truncate font-semibold ${theme.textColor}`}>
                {personal.email}
              </span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2 truncate">
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${theme.labelBadgeBg}`}>
                PHONE
              </span>
              <span className={`truncate font-semibold ${theme.textColor}`}>
                {personal.phone}
              </span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2 truncate">
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${theme.labelBadgeBg}`}>
                WEB
              </span>
              <span className={`truncate font-semibold ${theme.textColor}`}>
                {personal.website.replace(/^https?:\/\//, '')}
              </span>
            </div>
          )}
          {personal.address && (
            <div className="flex items-center gap-2 truncate">
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${theme.labelBadgeBg}`}>
                OFFICE
              </span>
              <span className={`truncate font-semibold ${theme.textColor}`}>
                {personal.address}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Official Certification Note & Flip Indicator */}
      <div className="relative z-10 px-5 sm:px-6 pb-3 pt-2 border-t border-white/20 flex items-center justify-between text-[8px] sm:text-[9px]">
        <div className={`tracking-wider uppercase font-bold truncate max-w-[75%] ${theme.subtextColor}`}>
          PROPERTY OF {personal.company ? personal.company.toUpperCase() : 'VERIFIED HOLDER'} • VERIFIED ID
        </div>
        <div className={`flex items-center gap-1 font-extrabold uppercase tracking-widest ${theme.accentText}`}>
          <span>BALIK KARTU</span>
          <span>↺</span>
        </div>
      </div>
    </div>
  );
}
