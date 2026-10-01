import { NextRequest, NextResponse } from 'next/server';
import { sendBusinessCard } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Rate limiting note: In production, you'd want rate limiting here.
    
    // Get the origin URL from request headers (for the "View Full Card" link in email)
    const originUrl = request.headers.get('origin') || request.nextUrl.origin || 'http://localhost:3000';

    await sendBusinessCard(email, originUrl);

    return NextResponse.json({ success: true, message: 'Card sent successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send card' }, { status: 500 });
  }
}
