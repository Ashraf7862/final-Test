"use client";

import { useState } from 'react';

export type FeedbackStatus =
  | 'received'
  | 'triaged'
  | 'planned'
  | 'in_progress'
  | 'shipped'
  | 'closed';

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  received: 'Received',
  triaged: 'Triaged',
  planned: 'Planned',
  in_progress: 'In Progress',
  shipped: 'Shipped',
  closed: 'Closed',
};

const STATUS_COLORS: Record<FeedbackStatus, string> = {
  received: 'bg-gray-100 text-gray-800 border border-gray-300',
  triaged: 'bg-blue-100 text-blue-800 border border-blue-300',
  planned: 'bg-purple-100 text-purple-800 border border-purple-300',
  in_progress: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  shipped: 'bg-green-100 text-green-800 border border-green-300',
  closed: 'bg-gray-100 text-gray-600 border border-gray-300',
};

export default function FeedbackStatus() {
  const [feedbackId, setFeedbackId] = useState('');
  const [feedback, setFeedback] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch(`/api/feedback/${feedbackId}`);
      if (!res.ok) throw new Error('Feedback not found');
      const data = await res.json();
      setFeedback(data);
    } catch (err: any) {
      setError(err.message || 'Lookup failed');
    } finally {
      setLoading(false);
    }
  };

  if (!feedback) {
    return (
      <form onSubmit={lookup} className="max-w-md space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Feedback ID
        </label>
        <input
          value={feedbackId}
          onChange={(e) => setFeedbackId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Enter feedback ID"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Looking up...' : 'Check Status'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  return (
    <div className="max-w-md p-4 border border-gray-200 rounded bg-blue-50">
      <h3 className="font-semibold text-gray-900 mb-2">Feedback Status</h3>
      <p className="text-sm text-gray-700"><strong className="text-gray-900">ID:</strong> {feedback.id}</p>
      <p className="text-sm text-gray-700"><strong className="text-gray-900">Title:</strong> {feedback.title}</p>
      <p className="text-sm text-gray-700">
        <strong className="text-gray-900">Status:</strong>{' '}
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[feedback.status]}`}
        >
          {STATUS_LABELS[feedback.status]}
        </span>
      </p>
      <p className="text-sm text-gray-700"><strong className="text-gray-900">Rating:</strong> {feedback.rating} / 5</p>
      <p className="text-sm text-gray-700"><strong className="text-gray-900">Category:</strong> {feedback.category}</p>
      <p className="text-sm text-gray-700"><strong className="text-gray-900">Submitted:</strong> {new Date(feedback.createdAt).toLocaleDateString()}</p>
    </div>
  );
}