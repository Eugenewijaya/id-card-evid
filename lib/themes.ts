import { CardThemeId } from './types';

export interface CardThemeConfig {
  id: CardThemeId;
  name: string;
  tagline: string;
  badge: string;
  swatch: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  textColor: string;        // Primary headings, names, values (high contrast)
  subtextColor: string;     // Secondary labels, categories (must be bright & clear)
  accentText: string;       // Titles, highlights, badges (vivid & pop)
  labelBadgeBg: string;     // Pill background for labels (e.g. EMAIL, PHONE)
  chipType: 'gold' | 'silver';
  chipGlow: string;
  signatureStripBg: string;
  signatureTextColor: string;
  magneticStripe: string;
  hologramType: 'rainbow' | 'gold' | 'silver' | 'neon';
  networkEmblem: 'master' | 'visa' | 'vip';
  patternType: 'carbon' | 'metallic' | 'waves' | 'guilloche' | 'prismatic';
}

export const CARD_THEMES: Record<CardThemeId, CardThemeConfig> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Black',
    tagline: 'Onyx Black Matte Pass',
    badge: 'OFFICIAL PASS',
    swatch: '#161618',
    cardBg: 'linear-gradient(135deg, #18181b 0%, #09090b 55%, #1c1917 100%)',
    cardBorder: 'border-2 border-amber-400/60',
    cardShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 158, 11, 0.25)',
    textColor: 'text-white',
    subtextColor: 'text-zinc-200',
    accentText: 'text-amber-300',
    labelBadgeBg: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
    chipType: 'gold',
    chipGlow: 'rgba(245, 158, 11, 0.4)',
    signatureStripBg: 'bg-white',
    signatureTextColor: 'text-zinc-950',
    magneticStripe: 'bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-zinc-700',
    hologramType: 'gold',
    networkEmblem: 'vip',
    patternType: 'carbon',
  },
  titanium: {
    id: 'titanium',
    name: 'Apple Titanium',
    tagline: 'Frosted Laser-Etched Platinum',
    badge: 'TITANIUM PASS',
    swatch: '#E5E7EB',
    cardBg: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 45%, #E2E8F0 100%)',
    cardBorder: 'border-2 border-slate-400/80',
    cardShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18), 0 0 20px rgba(255, 255, 255, 0.8)',
    textColor: 'text-slate-950',
    subtextColor: 'text-slate-700',
    accentText: 'text-blue-700',
    labelBadgeBg: 'bg-slate-200 text-slate-900 border border-slate-300',
    chipType: 'silver',
    chipGlow: 'rgba(100, 116, 139, 0.3)',
    signatureStripBg: 'bg-slate-100',
    signatureTextColor: 'text-slate-950',
    magneticStripe: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-600',
    hologramType: 'silver',
    networkEmblem: 'master',
    patternType: 'metallic',
  },
  holographic: {
    id: 'holographic',
    name: 'Cyber Hologram',
    tagline: 'Prismatic Iridescent Fintech Pass',
    badge: 'HOLO DIGITAL',
    swatch: '#6366F1',
    cardBg: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #0f172a 100%)',
    cardBorder: 'border-2 border-cyan-300/70',
    cardShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.5), 0 0 30px rgba(6, 182, 212, 0.35)',
    textColor: 'text-white',
    subtextColor: 'text-cyan-100',
    accentText: 'text-cyan-300',
    labelBadgeBg: 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50',
    chipType: 'silver',
    chipGlow: 'rgba(6, 182, 212, 0.5)',
    signatureStripBg: 'bg-white',
    signatureTextColor: 'text-indigo-950',
    magneticStripe: 'bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 border-indigo-800',
    hologramType: 'rainbow',
    networkEmblem: 'master',
    patternType: 'prismatic',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Royal Sapphire',
    tagline: 'Prestige Executive Navy Pass',
    badge: 'EXECUTIVE PASS',
    swatch: '#1E3A8A',
    cardBg: 'linear-gradient(135deg, #091326 0%, #1e3a8a 55%, #172554 100%)',
    cardBorder: 'border-2 border-amber-300/70',
    cardShadow: '0 25px 50px -12px rgba(30, 58, 138, 0.6), 0 0 25px rgba(245, 158, 11, 0.25)',
    textColor: 'text-white',
    subtextColor: 'text-sky-100',
    accentText: 'text-amber-300',
    labelBadgeBg: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
    chipType: 'gold',
    chipGlow: 'rgba(245, 158, 11, 0.4)',
    signatureStripBg: 'bg-white',
    signatureTextColor: 'text-blue-950',
    magneticStripe: 'bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-blue-900',
    hologramType: 'gold',
    networkEmblem: 'visa',
    patternType: 'waves',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Wealth',
    tagline: 'Private Reserve Sovereign Pass',
    badge: 'PREMIER PASS',
    swatch: '#064E3B',
    cardBg: 'linear-gradient(135deg, #022019 0%, #064e3b 55%, #065f46 100%)',
    cardBorder: 'border-2 border-amber-300/70',
    cardShadow: '0 25px 50px -12px rgba(6, 78, 59, 0.6), 0 0 25px rgba(217, 119, 6, 0.25)',
    textColor: 'text-white',
    subtextColor: 'text-emerald-100',
    accentText: 'text-amber-300',
    labelBadgeBg: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
    chipType: 'gold',
    chipGlow: 'rgba(245, 158, 11, 0.4)',
    signatureStripBg: 'bg-white',
    signatureTextColor: 'text-emerald-950',
    magneticStripe: 'bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-950 border-emerald-900',
    hologramType: 'gold',
    networkEmblem: 'vip',
    patternType: 'guilloche',
  },
};

export const DEFAULT_THEME_ID: CardThemeId = 'obsidian';

export function getCardTheme(id?: CardThemeId): CardThemeConfig {
  if (id && CARD_THEMES[id]) {
    return CARD_THEMES[id];
  }
  return CARD_THEMES[DEFAULT_THEME_ID];
}
