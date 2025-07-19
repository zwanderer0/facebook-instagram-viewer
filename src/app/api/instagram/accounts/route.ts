import { NextRequest, NextResponse } from 'next/server';
import FacebookGraphAPI from '@/lib/facebook-api';

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Facebook access token not configured' }, { status: 500 });
    }

    const facebookAPI = new FacebookGraphAPI(accessToken);
    
    // Get Instagram business accounts
    const response = await facebookAPI.getInstagramAccounts();

    return NextResponse.json({ accounts: response });
  } catch (error) {
    console.error('Error fetching Instagram accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram accounts' },
      { status: 500 }
    );
  }
}