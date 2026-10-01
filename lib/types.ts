export interface PersonalInfo {
  fullName: string;
  title: string;
  company: string;
  tagline: string;
  about: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface MediaInfo {
  photoUrl: string;
  logoUrl: string;
}

export interface SocialLinks {
  whatsapp: string;
  instagram: string;
  linkedin: string;
  email: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  year: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type CardThemeId = 'obsidian' | 'titanium' | 'holographic' | 'sapphire' | 'emerald';

export interface Settings {
  resendApiKey: string;
  accentColor: string;
  cardTheme?: CardThemeId;
}

export interface ProfileData {
  personal: PersonalInfo;
  media: MediaInfo;
  social: SocialLinks;
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  settings: Settings;
}
