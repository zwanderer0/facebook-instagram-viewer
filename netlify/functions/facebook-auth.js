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

  const APP_ID = process.env.FACEBOOK_APP_ID;
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Missing Facebook app configuration' }),
    };
  }
  const REDIRECT_URI = process.env.URL ? `${process.env.URL}/.netlify/functions/facebook-auth` : 'http://localhost:8888/.netlify/functions/facebook-auth';

  // Debug logging
  console.log('Environment debug:', {
    URL: process.env.URL,
    REDIRECT_URI,
    APP_ID,
    hasSecret: !!process.env.FACEBOOK_APP_SECRET,
    httpMethod,
    hasCode: !!queryStringParameters?.code
  });

  // Step 1: Redirect to Facebook OAuth
  if (httpMethod === 'GET' && !queryStringParameters?.code) {
    const scopes = [
      'pages_show_list',
      'pages_read_engagement',
      'pages_read_user_content'
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
      console.error('OAuth error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: error.message,
          debug: {
            APP_ID,
            REDIRECT_URI,
            hasSecret: !!APP_SECRET
          }
        }),
      };
    }
  }

  // Debug endpoint
  if (httpMethod === 'GET' && queryStringParameters?.debug === 'true') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        environment: {
          URL: process.env.URL,
          REDIRECT_URI,
          APP_ID,
          hasSecret: !!process.env.FACEBOOK_APP_SECRET,
          hasAppId: !!process.env.FACEBOOK_APP_ID,
          netlifyUrl: process.env.NETLIFY_URL || 'Not set'
        }
      }),
    };
  }

  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ error: 'Invalid request' }),
  };
};