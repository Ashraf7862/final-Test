export type FeedbackCategory =
  | 'bug'
  | 'feature'
  | 'ui_ux'
  | 'performance'
  | 'security'
  | 'other';

export type FeedbackStatus =
  | 'received'
  | 'triaged'
  | 'planned'
  | 'in_progress'
  | 'shipped'
  | 'closed';

export interface Feedback {
  id: string;
  title: string;
  category: FeedbackCategory;
  rating: number;
  description: string;
  status: FeedbackStatus;
  userEmail?: string;
  userName?: string;
  sentimentScore?: number;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
  clusterId?: string;
}

export interface FeedbackSubmission {
  title: string;
  category: FeedbackCategory;
  rating: number;
  description: string;
  userEmail?: string;
  userName?: string;
}

export interface FeedbackAnalytics {
  totalCount: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryDistribution: Record<FeedbackCategory, number>;
  statusDistribution: Record<FeedbackStatus, number>;
  sentimentTrend: Array<{ date: string; score: number }>;
  topFeatureRequests: Array<{
    id: string;
    title: string;
    voteCount: number;
    status: FeedbackStatus;
  }>;
}

export interface Vote {
  id: string;
  feedbackId: string;
  userId: string;
  createdAt: string;
}