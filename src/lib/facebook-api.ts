import axios from 'axios';
import { FacebookComment, InstagramComment, FacebookMessage, ApiResponse } from '@/types/facebook';

const GRAPH_API_BASE_URL = 'https://graph.facebook.com/v19.0';

class FacebookGraphAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${GRAPH_API_BASE_URL}${endpoint}`, {
        params: {
          access_token: this.accessToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Facebook API Error:', error);
      throw new Error(`Failed to fetch data from Facebook API: ${endpoint}`);
    }
  }

  async getPagePosts(pageId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/${pageId}/posts?fields=id,message,created_time,comments{id,message,created_time,from,like_count,comment_count}`);
  }

  async getPageComments(pageId: string): Promise<ApiResponse<FacebookComment>> {
    return this.makeRequest(`/${pageId}/feed?fields=comments{id,message,created_time,from,like_count,comment_count}`);
  }

  async getInstagramComments(mediaId: string): Promise<ApiResponse<InstagramComment>> {
    return this.makeRequest(`/${mediaId}/comments?fields=id,text,timestamp,username,like_count,replies_count`);
  }

  async getPageMessages(pageId: string): Promise<ApiResponse<FacebookMessage>> {
    return this.makeRequest(`/${pageId}/conversations?fields=messages{id,message,created_time,from}`);
  }

  async getInstagramMedia(accountId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/${accountId}/media?fields=id,caption,media_type,media_url,timestamp,comments_count,like_count`);
  }

  async getAllCommentsFromPosts(pageId: string): Promise<FacebookComment[]> {
    try {
      const postsResponse = await this.getPagePosts(pageId);
      const allComments: FacebookComment[] = [];

      for (const post of postsResponse.data) {
        if (post.comments && post.comments.data) {
          allComments.push(...post.comments.data);
        }
      }

      return allComments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async getUserPages(): Promise<any> {
    return this.makeRequest('/me/accounts?fields=id,name,access_token,instagram_business_account');
  }

  async getInstagramAccounts(): Promise<any[]> {
    try {
      const pagesResponse = await this.getUserPages();
      const instagramAccounts = [];

      for (const page of pagesResponse.data) {
        if (page.instagram_business_account) {
          const igAccount = await this.makeRequest(`/${page.instagram_business_account.id}?fields=id,username,profile_picture_url`);
          instagramAccounts.push({
            ...igAccount,
            page_name: page.name,
            page_id: page.id
          });
        }
      }

      return instagramAccounts;
    } catch (error) {
      console.error('Error fetching Instagram accounts:', error);
      return [];
    }
  }
}

export default FacebookGraphAPI;