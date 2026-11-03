"use client";

import { useState } from 'react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'under_review' | 'planned' | 'in_progress' | 'launched';
  votes: number;
  category: string;
}

const STATUS_BADGES: Record<string, string> = {
  under_review: 'bg-blue-100 text-blue-800 border border-blue-300',
  planned: 'bg-purple-100 text-purple-800 border border-purple-300',
  in_progress: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  launched: 'bg-green-100 text-green-800 border border-green-300',
};

export default function RoadmapCard({ item }: { item: RoadmapItem }) {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(item.votes);

  const handleVote = async () => {
    if (voted) return;
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackId: item.id }),
      });
      if (res.ok) {
        setVoted(true);
        setVotes(votes + 1);
      }
    } catch {
      // Error handled silently; in production show a toast notification
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium border ${STATUS_BADGES[item.status]}`}
        >
          {item.status.replace(/_/g, ' ')}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={handleVote}
          disabled={voted}
          className={
            'flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium ' +
            (voted
              ? 'bg-gray-100 text-gray-500 border-gray-300 disabled:opacity-100'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50')
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          {votes} votes
        </button>
        <span className="text-xs text-gray-400">{item.category}</span>
      </div>
    </div>
  );
}