# Facebook/Instagram Comments Viewer

A production-ready web application that allows anyone to login with Facebook and view comments from their Facebook pages and Instagram business accounts.

## Features

- **OAuth Login**: Users can login with their own Facebook account
- **Multi-Page Support**: View comments from all your Facebook pages
- **Instagram Integration**: Automatically shows Instagram comments if connected
- **Real-time Updates**: Refresh button to get latest comments
- **Responsive Design**: Works on desktop and mobile devices
- **Secure**: Tokens stored locally, no server-side storage

## Deploy to Netlify

### One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zwanderer0/facebook-instagram-viewer)

### Manual Deployment

1. Fork or clone this repository

2. Create a Facebook App:
   - Go to [Facebook Developers](https://developers.facebook.com/apps/)
   - Create a new app or use existing
   - Add Facebook Login product
   - Set OAuth Redirect URL to: `https://your-site.netlify.app/.netlify/functions/facebook-auth`

3. Deploy to Netlify:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod
   ```

4. Set Environment Variables in Netlify:
   - Go to Site settings > Environment variables
   - Add:
     - `FACEBOOK_APP_ID` - Your Facebook App ID
     - `FACEBOOK_APP_SECRET` - Your Facebook App Secret

### Facebook App Configuration

Your Facebook app needs these permissions (users will be asked to approve):
- `pages_show_list` - List user's pages
- `pages_read_engagement` - Read page posts and comments
- `pages_read_user_content` - Read user content on pages
- `instagram_basic` - Access Instagram account info
- `instagram_manage_comments` - Read Instagram comments

### App Review (For Public Use)

To make the app available to any Facebook user (not just app developers):

1. Submit for App Review in Facebook Developer Dashboard
2. Request the permissions listed above
3. Provide:
   - Screencast showing app functionality
   - Clear description of how permissions are used
   - Privacy Policy URL
   - Terms of Service URL

## Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Facebook app credentials

# Run with Netlify Dev
netlify dev
```

Open http://localhost:8888

## Architecture

- **Frontend**: Vanilla JavaScript with Tailwind CSS
- **Authentication**: OAuth 2.0 flow via Netlify Functions
- **API Calls**: Direct to Facebook Graph API from browser
- **Hosting**: Static site on Netlify with serverless functions

## Privacy & Security

- No user data is stored on servers
- Access tokens are stored in browser localStorage
- All API calls are made directly to Facebook
- Users can revoke access anytime from Facebook settings