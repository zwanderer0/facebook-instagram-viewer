import { NextRequest, NextResponse } from 'next/server';
import FacebookGraphAPI from '@/lib/facebook-api';

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Facebook access token not configured' }, { status: 500 });
    }

    const facebookAPI = new FacebookGraphAPI(accessToken);
    
    // Get user's pages
    const response = await facebookAPI.getUserPages();

    return NextResponse.json({ pages: response.data });
  } catch (error) {
    console.error('Error fetching Facebook pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Facebook pages' },
      { status: 500 }
    );
  }
}