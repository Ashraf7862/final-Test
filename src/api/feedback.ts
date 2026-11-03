import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendFeedbackAcknowledgment } from '@/lib/email';
import { checkDuplicate } from '@/lib/feedback-clustering';

const submissionSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.enum(['bug', 'feature', 'ui_ux', 'performance', 'security', 'other']),
  rating: z.number().min(1).max(5),
  description: z.string().min(10).max(2000),
  userEmail: z.string().email().optional(),
  userName: z.string().min(1).max(80).optional(),
});

// In-memory store for demonstration; replace with database in production
const feedbackStore: any[] = [];

let idCounter = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = submissionSchema.parse(body);

    // Server-side deduplication check
    const duplicate = await checkDuplicate(validated.description, feedbackStore);
    if (duplicate) {
      return NextResponse.json(
        {
          message: 'Similar feedback already exists.',
          id: duplicate.id,
          isDuplicate: true,
        },
        { status: 200 }
      );
    }

    const feedback = {
      id: `fb-${idCounter++}`,
      ...validated,
      status: 'received' as const,
      voteCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    feedbackStore.push(feedback);

    // Send acknowledgment email if email provided
    if (validated.userEmail) {
      await sendFeedbackAcknowledgment(validated.userEmail, feedback.id, validated.title);
    }

    return NextResponse.json({
      message: 'Thank you! Your feedback has been saved.',
      id: feedback.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ detail: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(feedbackStore);
}

export async function GET_BY_ID(id: string) {
  const item = feedbackStore.find((f) => f.id === id);
  if (!item) return null;
  return item;
}