# Facebook/Instagram Comments Viewer

A simple web application to view and manage comments from Facebook pages and Instagram business accounts using the Facebook Graph API.

## Features

- View all Facebook page comments in one place
- View all Instagram business account comments
- Simple dropdown selection for multiple pages
- Direct browser-based API calls (no backend required for the HTML version)
- Next.js backend API for advanced features

## Files

### Standalone HTML Version (Recommended)
- `facebook-viewer-final.html` - Working standalone version that pulls comments directly from Facebook/Instagram

### Full Application
- Next.js application with API routes
- TypeScript support
- Tailwind CSS styling

## Setup

### For Standalone HTML Version

1. Get a Facebook User Access Token with these permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_read_user_content`
   - `instagram_basic`
   - `instagram_manage_comments`

2. Open `facebook-viewer-final.html` in your browser
3. Paste your access token
4. Click "Load My Pages"

### For Full Next.js Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` file with your Facebook API credentials:
   ```
   FACEBOOK_APP_ID=your_app_id
   FACEBOOK_APP_SECRET=your_app_secret
   FACEBOOK_ACCESS_TOKEN=your_user_access_token
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Getting a Facebook Access Token

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Click "Generate Access Token"
4. Select the required permissions
5. Copy the generated token

## Notes

- User access tokens expire after a certain period
- For production use, implement token refresh or use long-lived tokens
- The `pages_messaging` permission is required for reading Facebook messages (not included in basic version)