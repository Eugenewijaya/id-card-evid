import fs from 'fs';
import path from 'path';
import { ProfileData } from './types';

const DATA_PATH = path.join(process.cwd(), 'data', 'profile.json');

export function getProfile(): ProfileData {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function saveProfile(data: ProfileData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
