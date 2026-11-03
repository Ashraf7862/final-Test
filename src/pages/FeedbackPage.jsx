import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import {
  RatingDistributionChart,
  CategoryPieChart,
  SentimentTrendChart,
  TopFeatureRequestsTable,
} from '@/components/FeedbackCharts';
import PageHeader from '@/components/PageHeader';

const MOCK_FEEDBACK = [
  {
    id: 'fb-1',
    title: 'Dark mode toggle',
    category: 'feature',
    rating: 5,
    description: 'Please add a dark mode option for better nighttime readability.',
    status: 'planned',
    userEmail: 'user@example.com',
    userName: 'Ashraf',
    voteCount: 42,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    sentimentScore: 0.8,
  },
  {
    id: 'fb-2',
    title: 'Export to CSV',
    category: 'feature',
    rating: 4,
    description: 'Allow users to export their feedback data as CSV.',
    status: 'in_progress',
    voteCount: 28,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    sentimentScore: 0.6,
  },
  {
    id: 'fb-3',
    title: 'Mobile app crashes on startup',
    category: 'bug',
    rating: 2,
    description: 'The mobile app crashes immediately after opening on iOS 17.',
    status: 'triaged',
    voteCount: 15,
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
    sentimentScore: -0.7,
  },
];

export default function FeedbackPage() {
  const totalCount = MOCK_FEEDBACK.length;
  const averageRating =
    totalCount > 0
      ? MOCK_FEEDBACK.reduce((sum, f) => sum + f.rating, 0) / totalCount
      : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader title="Feedback Analytics Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Total Feedback</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Average Rating</p>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(averageRating * 10) / 10} / 5
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RatingDistributionChart data={{ 5: 20, 4: 15, 3: 10, 2: 5, 1: 2 }} />
        <CategoryPieChart data={{ feature: 30, bug: 20, ui_ux: 15, performance: 10, security: 5, other: 5 }} />
        <SentimentTrendChart data={[]} />
        <TopFeatureRequestsTable data={[]} />
      </div>
    </div>
  );
}