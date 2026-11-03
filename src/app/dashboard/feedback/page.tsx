import FeedbackCharts from '@/components/FeedbackCharts';
import { computeAnalytics } from '@/lib/feedback-analytics';
import { Feedback } from '@/types/feedback';

// Mock data - in production this would be fetched from a database or API
const MOCK_FEEDBACK: Feedback[] = [
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
  {
    id: 'fb-4',
    title: 'Improve dashboard load time',
    category: 'performance',
    rating: 3,
    description: 'The dashboard takes too long to load when there are many records.',
    status: 'planned',
    voteCount: 19,
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
    sentimentScore: -0.2,
  },
  {
    id: 'fb-5',
    title: 'Add keyboard shortcuts',
    category: 'ui_ux',
    rating: 4,
    description: 'Keyboard shortcuts would improve navigation efficiency.',
    status: 'received',
    voteCount: 11,
    createdAt: '2024-02-15T16:45:00Z',
    updatedAt: '2024-02-15T16:45:00Z',
    sentimentScore: 0.4,
  },
];

export default function FeedbackDashboard() {
  const analytics = computeAnalytics(MOCK_FEEDBACK);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Total Feedback</p>
          <p className="text-2xl font-bold text-gray-900">{analytics.totalCount}</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Average Rating</p>
          <p className="text-2xl font-bold text-gray-900">
            {analytics.averageRating} / 5
          </p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Feature Requests</p>
          <p className="text-2xl font-bold text-gray-900">
            {analytics.categoryDistribution.feature}
          </p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Bug Reports</p>
          <p className="text-2xl font-bold text-gray-900">
            {analytics.categoryDistribution.bug}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Rating Distribution</h2>
          <FeedbackCharts.RatingDistributionChart data={analytics.ratingDistribution} />
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Category Distribution</h2>
          <FeedbackCharts.CategoryPieChart data={analytics.categoryDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Sentiment Trend</h2>
          <FeedbackCharts.SentimentTrendChart data={analytics.sentimentTrend} />
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Top Feature Requests</h2>
          <FeedbackCharts.TopFeatureRequestsTable data={analytics.topFeatureRequests} />
        </div>
      </div>
    </div>
  );
}