'use client';

import { useState } from 'react';
import { FacebookComment, InstagramComment, FacebookMessage } from '@/types/facebook';

export default function Home() {
  const [pageId, setPageId] = useState('');
  const [instagramAccountId, setInstagramAccountId] = useState('');
  const [facebookComments, setFacebookComments] = useState<FacebookComment[]>([]);
  const [instagramComments, setInstagramComments] = useState<InstagramComment[]>([]);
  const [facebookMessages, setFacebookMessages] = useState<FacebookMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'facebook-comments' | 'instagram-comments' | 'facebook-messages'>('facebook-comments');

  const fetchFacebookComments = async () => {
    if (!pageId.trim()) {
      alert('Please enter a Facebook Page ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/facebook/comments?pageId=${encodeURIComponent(pageId)}`);
      const data = await response.json();
      
      if (response.ok) {
        setFacebookComments(data.comments);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to fetch Facebook comments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstagramComments = async () => {
    if (!instagramAccountId.trim()) {
      alert('Please enter an Instagram Account ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/instagram/comments?accountId=${encodeURIComponent(instagramAccountId)}`);
      const data = await response.json();
      
      if (response.ok) {
        setInstagramComments(data.comments);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to fetch Instagram comments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacebookMessages = async () => {
    if (!pageId.trim()) {
      alert('Please enter a Facebook Page ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/facebook/messages?pageId=${encodeURIComponent(pageId)}`);
      const data = await response.json();
      
      if (response.ok) {
        setFacebookMessages(data.messages);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to fetch Facebook messages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Facebook/Instagram API Dashboard</h1>
      
      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="pageId" className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Page ID
            </label>
            <input
              type="text"
              id="pageId"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Facebook Page ID"
            />
          </div>
          <div>
            <label htmlFor="instagramAccountId" className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Account ID
            </label>
            <input
              type="text"
              id="instagramAccountId"
              value={instagramAccountId}
              onChange={(e) => setInstagramAccountId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Instagram Account ID"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('facebook-comments')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'facebook-comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Facebook Comments
            </button>
            <button
              onClick={() => setActiveTab('instagram-comments')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'instagram-comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Instagram Comments
            </button>
            <button
              onClick={() => setActiveTab('facebook-messages')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'facebook-messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Facebook Messages
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Facebook Comments Tab */}
          {activeTab === 'facebook-comments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Facebook Comments</h3>
                <button
                  onClick={fetchFacebookComments}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Fetch Comments'}
                </button>
              </div>
              <div className="space-y-4">
                {facebookComments.map((comment) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-gray-900">{comment.from.name}</strong>
                      <span className="text-sm text-gray-500">{formatDate(comment.created_time)}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.message}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>👍 {comment.like_count}</span>
                      <span>💬 {comment.comment_count}</span>
                    </div>
                  </div>
                ))}
                {facebookComments.length === 0 && !loading && (
                  <p className="text-gray-500 text-center py-8">No Facebook comments found. Click "Fetch Comments" to load data.</p>
                )}
              </div>
            </div>
          )}

          {/* Instagram Comments Tab */}
          {activeTab === 'instagram-comments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Instagram Comments</h3>
                <button
                  onClick={fetchInstagramComments}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Fetch Comments'}
                </button>
              </div>
              <div className="space-y-4">
                {instagramComments.map((comment) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-gray-900">@{comment.username}</strong>
                      <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.text}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>👍 {comment.like_count}</span>
                      <span>💬 {comment.replies_count}</span>
                    </div>
                  </div>
                ))}
                {instagramComments.length === 0 && !loading && (
                  <p className="text-gray-500 text-center py-8">No Instagram comments found. Click "Fetch Comments" to load data.</p>
                )}
              </div>
            </div>
          )}

          {/* Facebook Messages Tab */}
          {activeTab === 'facebook-messages' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Facebook Messages</h3>
                <button
                  onClick={fetchFacebookMessages}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Fetch Messages'}
                </button>
              </div>
              <div className="space-y-4">
                {facebookMessages.map((message) => (
                  <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-gray-900">{message.from.name}</strong>
                      <span className="text-sm text-gray-500">{formatDate(message.created_time)}</span>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                ))}
                {facebookMessages.length === 0 && !loading && (
                  <p className="text-gray-500 text-center py-8">No Facebook messages found. Click "Fetch Messages" to load data.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}