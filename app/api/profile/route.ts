import { NextRequest, NextResponse } from 'next/server';
import { getProfile, saveProfile } from '@/lib/storage';
import { verifyToken, getTokenCookieName } from '@/lib/auth';
import { cookies } from 'next/headers';
import { ProfileData } from '@/lib/types';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getTokenCookieName())?.value;
  if (!token) return false;
  try {
    return verifyToken(token);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const profile = getProfile();
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      if (profile.settings) {
        profile.settings.resendApiKey = ''; // Mask the API key for public access
      }
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const currentProfile = getProfile();

    // Merge incoming data with existing profile
    const updatedProfile: ProfileData = {
      ...currentProfile,
      ...body,
      personal: { ...currentProfile.personal, ...body.personal },
      media: { ...currentProfile.media, ...body.media },
      social: { ...currentProfile.social, ...body.social },
      portfolio: body.portfolio !== undefined ? body.portfolio : currentProfile.portfolio,
      services: body.services !== undefined ? body.services : currentProfile.services,
      settings: { ...currentProfile.settings, ...body.settings },
    };

    saveProfile(updatedProfile);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
