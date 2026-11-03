import { Feedback, FeedbackCategory, FeedbackStatus } from '@/types/feedback';

export function computeAnalytics(feedbackList: Feedback[]) {
  const totalCount = feedbackList.length;
  const averageRating =
    totalCount > 0
      ? feedbackList.reduce((sum, f) => sum + f.rating, 0) / totalCount
      : 0;

  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  feedbackList.forEach((f) => {
    ratingDistribution[f.rating] = (ratingDistribution[f.rating] || 0) + 1;
  });

  const categoryDistribution: Record<FeedbackCategory, number> = {
    bug: 0,
    feature: 0,
    ui_ux: 0,
    performance: 0,
    security: 0,
    other: 0,
  };
  feedbackList.forEach((f) => {
    categoryDistribution[f.category] = (categoryDistribution[f.category] || 0) + 1;
  });

  const statusDistribution: Record<FeedbackStatus, number> = {
    received: 0,
    triaged: 0,
    planned: 0,
    in_progress: 0,
    shipped: 0,
    closed: 0,
  };
  feedbackList.forEach((f) => {
    statusDistribution[f.status] = (statusDistribution[f.status] || 0) + 1;
  });

  const sentimentTrend = feedbackList
    .filter((f) => f.sentimentScore !== undefined)
    .map((f) => ({ date: f.createdAt, score: f.sentimentScore! }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const topFeatureRequests = feedbackList
    .filter((f) => f.category === 'feature')
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 10)
    .map((f) => ({
      id: f.id,
      title: f.title,
      voteCount: f.voteCount,
      status: f.status,
    }));

  return {
    totalCount,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
    categoryDistribution,
    statusDistribution,
    sentimentTrend,
    topFeatureRequests,
  };
}

export function exportToCSV(feedbackList: Feedback[]): string {
  const headers = ['id', 'title', 'category', 'rating', 'status', 'voteCount', 'createdAt'];
  const rows = feedbackList.map((f) => [
    f.id,
    `"${f.title.replace(/\"/g, '\"\"')}"`,
    f.category,
    f.rating,
    f.status,
    f.voteCount,
    f.createdAt,
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}