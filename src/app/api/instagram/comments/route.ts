import { NextRequest, NextResponse } from 'next/server';
import FacebookGraphAPI from '@/lib/facebook-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    
    if (!accountId) {
      return NextResponse.json({ error: 'Instagram account ID is required' }, { status: 400 });
    }

    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Facebook access token not configured' }, { status: 500 });
    }

    const facebookAPI = new FacebookGraphAPI(accessToken);
    
    // Get all media posts first
    const mediaResponse = await facebookAPI.getInstagramMedia(accountId);
    const allComments = [];

    // Fetch comments for each media post
    for (const media of mediaResponse.data) {
      try {
        const commentsResponse = await facebookAPI.getInstagramComments(media.id);
        allComments.push(...commentsResponse.data);
      } catch (error) {
        console.error(`Error fetching comments for media ${media.id}:`, error);
      }
    }

    return NextResponse.json({ comments: allComments });
  } catch (error) {
    console.error('Error fetching Instagram comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram comments' },
      { status: 500 }
    );
  }
}