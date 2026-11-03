import { NextRequest, NextResponse } from 'next/server';

// In-memory vote store for demonstration; replace with database in production
const voteStore: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { feedbackId } = await request.json();

    // Authentication-gated voting: extract user ID from session
    // const userId = await getCurrentUserId();
    const userId = 'user-123';

    // Prevent duplicate votes (1 vote per user per item)
    const alreadyVoted = voteStore.some(
      (v) => v.feedbackId === feedbackId && v.userId === userId
    );
    if (alreadyVoted) {
      return NextResponse.json(
        { error: 'You have already voted on this item.' },
        { status: 400 }
      );
    }

    voteStore.push({ feedbackId, userId, createdAt: new Date().toISOString() });

    return NextResponse.json({ success: true, message: 'Vote recorded.' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to record vote.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(voteStore);
}