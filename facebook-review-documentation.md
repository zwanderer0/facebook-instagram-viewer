# Facebook App Review Documentation - SocialPull

## App Overview

**App Name:** SocialPull  
**App ID:** 1068046521647182  
**Website:** https://socialpull.netlify.app/  
**Privacy Policy:** https://socialpull.netlify.app/privacy-policy.html  
**Terms of Service:** https://socialpull.netlify.app/terms-of-service.html  

## App Description

SocialPull is a social media management tool that helps businesses and content creators efficiently monitor and manage comments across their Facebook pages and connected Instagram business accounts. The application provides a centralized dashboard to view, organize, and respond to audience engagement in real-time.

## Requested Permissions

### 1. pages_show_list
**Purpose:** To display a list of Facebook pages that the user manages or has admin access to.  
**Use Case:** Users need to select which of their pages they want to monitor for comments and engagement.  
**Data Usage:** Page names, IDs, fan counts, and profile pictures are displayed in a selection interface.

### 2. pages_read_engagement
**Purpose:** To read comments, likes, and other engagement metrics from the user's Facebook pages.  
**Use Case:** The core functionality of displaying comments from page posts so users can monitor customer feedback and engagement.  
**Data Usage:** Comment text, author names, timestamps, and like counts are displayed in an organized feed.

### 3. pages_read_user_content
**Purpose:** To access posts and content from the user's Facebook pages.  
**Use Case:** To provide context for comments by showing which post each comment belongs to.  
**Data Usage:** Post text and metadata are displayed alongside comments to provide full context.

## How the App Works

1. **Authentication:** Users log in with Facebook OAuth
2. **Page Selection:** Users see a list of their managed pages and select one to monitor
3. **Comment Dashboard:** The app displays comments from recent posts on the selected page
4. **Real-time Updates:** Users can refresh to see new comments and engagement
5. **Multi-platform View:** If Instagram is connected, users can switch between Facebook and Instagram comments

## Data Handling

- **No Data Storage:** We do not store user data on our servers
- **Real-time Fetching:** All data is fetched directly from Facebook's API in real-time
- **Local Storage Only:** Access tokens are stored locally in the user's browser for session management
- **No Posting:** The app is read-only and never posts content on behalf of users

## User Benefits

- **Centralized Management:** Monitor all page comments in one place
- **Improved Response Time:** Quick access to customer feedback and questions
- **Better Engagement:** Easier to track and respond to audience interactions
- **Time Saving:** No need to check multiple platforms individually

## Technical Implementation

- **Frontend:** Pure HTML/CSS/JavaScript hosted on Netlify
- **Backend:** Serverless functions for OAuth handling
- **Security:** HTTPS encryption, secure token handling
- **Compliance:** Follows Facebook Platform Policy guidelines

## Review Submission Details

**Business Verification:** Not applicable (personal/small business use)  
**Platform:** Web application  
**User Base:** Small to medium businesses, content creators, social media managers  
**Geographic Scope:** Global  

## Contact Information

**Developer:** [Your Name/Company]  
**Support:** Via GitHub repository issues  
**Website:** https://socialpull.netlify.app/  

## Demonstration Video Script

For the required screencast demonstration:

1. **Introduction (0-15s):** "This is SocialPull, a tool for managing Facebook page comments"
2. **Login Process (15-30s):** Show Facebook login flow and permission request
3. **Page Selection (30-45s):** Demonstrate selecting a Facebook page from the list
4. **Comment Display (45-60s):** Show how comments are displayed with post context
5. **Features Demo (60-90s):** Show refresh functionality and comment organization
6. **Privacy Focus (90-105s):** Highlight read-only nature and data privacy
7. **Conclusion (105-120s):** Summarize the app's value for page management

## Compliance Statement

SocialPull fully complies with:
- Facebook Platform Policy
- Data Use Policy
- Privacy regulations
- User consent requirements

The application requests only the minimum necessary permissions and operates in a transparent, user-controlled manner.