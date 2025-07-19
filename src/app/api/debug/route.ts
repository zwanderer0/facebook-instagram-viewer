import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Facebook access token not configured' }, { status: 500 });
    }

    // Debug token to see permissions
    const debugUrl = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`;
    const debugResponse = await axios.get(debugUrl);

    // Try to get app info
    let appInfo = null;
    try {
      const appResponse = await axios.get(`https://graph.facebook.com/v19.0/${process.env.FACEBOOK_APP_ID}?access_token=${accessToken}`);
      appInfo = appResponse.data;
    } catch (e) {
      appInfo = { error: 'Could not fetch app info' };
    }

    return NextResponse.json({
      tokenInfo: debugResponse.data,
      appInfo: appInfo,
      tokenType: accessToken.includes('|') ? 'App Token' : 'User Token',
      note: 'App tokens cannot access user data. You need a User Access Token with pages_show_list and instagram_basic permissions.'
    });
  } catch (error: any) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: 'Debug failed',
      details: error.response?.data || error.message
    }, { status: 500 });
  }
}