import { NextRequest, NextResponse } from 'next/server';
import FacebookGraphAPI from '@/lib/facebook-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    
    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Facebook access token not configured' }, { status: 500 });
    }

    const facebookAPI = new FacebookGraphAPI(accessToken);
    const comments = await facebookAPI.getAllCommentsFromPosts(pageId);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching Facebook comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Facebook comments' },
      { status: 500 }
    );
  }
}