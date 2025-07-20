// Netlify serverless function for Facebook OAuth
exports.handler = async (event, context) => {
  const { httpMethod, queryStringParameters, body } = event;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight
  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const APP_ID = process.env.FACEBOOK_APP_ID || '1068046521647182';
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET || '4ef4431231c770c7da966bbd31d3e246';
  const REDIRECT_URI = process.env.URL ? `${process.env.URL}/.netlify/functions/facebook-auth` : 'http://localhost:8888/.netlify/functions/facebook-auth';

  // Step 1: Redirect to Facebook OAuth
  if (httpMethod === 'GET' && !queryStringParameters?.code) {
    const scopes = [
      'pages_show_list',
      'pages_read_engagement',
      'pages_read_user_content',
      'instagram_business_basic',
      'instagram_business_manage_comments'
    ].join(',');

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scopes}&response_type=code`;

    return {
      statusCode: 302,
      headers: {
        Location: authUrl,
      },
      body: '',
    };
  }

  // Step 2: Handle callback with code
  if (httpMethod === 'GET' && queryStringParameters?.code) {
    try {
      // Exchange code for access token
      const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_secret=${APP_SECRET}&code=${queryStringParameters.code}`;
      
      const tokenResponse = await fetch(tokenUrl);
      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error.message);
      }

      // Get user info
      const userResponse = await fetch(`https://graph.facebook.com/v19.0/me?access_token=${tokenData.access_token}`);
      const userData = await userResponse.json();

      // Redirect to frontend with token
      const frontendUrl = process.env.URL || 'http://localhost:8888';
      return {
        statusCode: 302,
        headers: {
          Location: `${frontendUrl}/?token=${tokenData.access_token}&user=${encodeURIComponent(userData.name)}`,
        },
        body: '',
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ error: 'Invalid request' }),
  };
};