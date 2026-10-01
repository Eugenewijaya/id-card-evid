'use client';

import { ProfileData } from '@/lib/types';
import { CardThemeConfig } from '@/lib/themes';
import EmvChip from './EmvChip';
import ContactlessIcon from './ContactlessIcon';
import CardPatterns from './CardPatterns';
import Image from 'next/image';

interface CardFrontProps {
  profile: ProfileData;
  theme: CardThemeConfig;
}

export default function CardFront({ profile, theme }: CardFrontProps) {
  const { personal, media } = profile;

  // Format clean ID number from phone / year
  const cleanPhone = personal.phone ? personal.phone.replace(/\D/g, '') : '903';
  const idSuffix = cleanPhone.slice(-4).padStart(4, '0');
  const memberId = `ID: SC-2026-${idSuffix}`;

  // Member initials for fallback monogram
  const initials = personal.fullName
    ? personal.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ID';

  return (
    <div
      className={`absolute inset-0 rounded-2xl ${theme.cardBorder} p-5 sm:p-6 flex flex-col justify-between overflow-hidden backface-hidden select-none`}
      style={{
        background: theme.cardBg,
        boxShadow: theme.cardShadow,
      }}
    >
      {/* Background Pattern Overlay */}
      <CardPatterns type={theme.patternType} />

      {/* Top Header: Company / Organization + Smart Pass Status */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2.5 max-w-[70%]">
          {media.logoUrl ? (
            <div className="h-7 w-auto max-w-[110px] flex items-center">
              <img
                src={media.logoUrl}
                alt={personal.company || 'Company'}
                className="max-h-7 object-contain drop-shadow"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 to-amber-200 text-zinc-950 font-black text-[10px] flex items-center justify-center shadow-md">
                ✦
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`text-xs sm:text-sm font-extrabold tracking-[0.14em] uppercase truncate ${theme.textColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}>
                  {personal.company || 'DIGITAL IDENTITY'}
                </span>
                <span className={`text-[8px] font-bold tracking-widest uppercase ${theme.accentText}`}>
                  OFFICIAL EXECUTIVE PASS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Header: NFC Contactless & Active Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-400/50 bg-black/40 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-emerald-300">
              ACTIVE
            </span>
          </div>
          <div className={`${theme.accentText}`}>
            <ContactlessIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Middle Section: Photo Badge + Smart Chip + Executive Identity Block */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-5 my-auto">
        {/* Left Column: Executive Photo & Smart Chip */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          {media.photoUrl ? (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-amber-300/80 shadow-lg overflow-hidden relative bg-black/30">
              <Image
                src={media.photoUrl}
                alt={personal.fullName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-amber-300/70 bg-gradient-to-tr from-amber-500/20 to-amber-300/30 backdrop-blur-sm shadow-md flex items-center justify-center">
              <span className={`font-black text-xl tracking-wider ${theme.textColor} drop-shadow`}>
                {initials}
              </span>
            </div>
          )}
          {/* Smart Chip */}
          <EmvChip type={theme.chipType} className="scale-90 shadow-md" />
        </div>

        {/* Right Column: Name, Title, Tagline, & ID */}
        <div className="flex-1 min-w-0 pr-1">
          <div className={`text-[8px] sm:text-[9px] font-extrabold tracking-[0.16em] uppercase mb-0.5 ${theme.accentText}`}>
            CREATIVE PROFESSIONAL
          </div>
          <h2 className={`font-black text-base sm:text-xl tracking-tight uppercase truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] ${theme.textColor}`}>
            {personal.fullName || 'YOUR NAME'}
          </h2>
          <p className={`text-xs sm:text-sm font-bold tracking-wide truncate ${theme.accentText}`}>
            {personal.title || 'Professional Title'}
          </p>

          {personal.tagline && (
            <p className={`text-[11px] sm:text-xs italic truncate mt-1.5 font-medium ${theme.subtextColor}`}>
              &ldquo;{personal.tagline}&rdquo;
            </p>
          )}

          <div className="mt-2.5 flex items-center gap-2.5">
            <span className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-black/50 border border-white/20 ${theme.textColor} shadow-sm`}>
              {memberId}
            </span>
            <span className={`text-[8px] font-mono font-bold tracking-wider uppercase ${theme.accentText}`}>
              RFID ENCODED
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Verification Metadata & Barcode Aesthetic */}
      <div className="relative z-10 flex items-end justify-between pt-1.5 border-t border-white/20">
        <div>
          <div className={`text-[8px] font-extrabold tracking-widest uppercase ${theme.accentText}`}>
            CREDENTIAL VALIDITY
          </div>
          <div className={`font-mono text-[10px] sm:text-xs font-bold tracking-wide ${theme.textColor}`}>
            ISSUED: 2024 • EXPIRES: 2028
          </div>
        </div>

        {/* Smart Barcode representation */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-end gap-0.5 h-4" title="Digital Barcode ID">
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1 h-3 bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1.5 h-2 bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1 h-3 bg-white" />
            <span className="w-0.5 h-full bg-white" />
          </div>
          <span className={`text-[8px] font-mono font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shadow-sm ${theme.labelBadgeBg}`}>
            {theme.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
