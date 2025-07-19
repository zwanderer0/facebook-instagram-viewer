export interface FacebookComment {
  id: string;
  message: string;
  created_time: string;
  from: {
    name: string;
    id: string;
  };
  like_count: number;
  comment_count: number;
}

export interface InstagramComment {
  id: string;
  text: string;
  timestamp: string;
  username: string;
  like_count: number;
  replies_count: number;
}

export interface FacebookMessage {
  id: string;
  message: string;
  created_time: string;
  from: {
    name: string;
    id: string;
  };
}

export interface ApiResponse<T> {
  data: T[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}