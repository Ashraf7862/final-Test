<!-- Feedback System Enhancement Sprint -->

A comprehensive feedback collection and analysis system built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features

1. **Structured Feedback Collection Form** – Validated submission form with Zod schema, required fields, real-time error messaging, character count indicator, and category-specific placeholder text.
2. **Feedback Analytics Dashboard** – Recharts-based visualizations for rating distribution, category breakdown, sentiment trends, and top feature requests. Includes date range, category, and rating filters plus CSV export.
3. **Feedback Acknowledgment & Follow-up** – Automated confirmation emails with feedback ID, status tracking (`received`, `triaged`, `planned`, `in_progress`, `shipped`, `closed`), and a user-facing status lookup page.
4. **Feedback Deduplication & Clustering** – Semantic similarity detection using sentence-transformers embeddings with cosine similarity threshold (0.85) to group related feedback and prevent duplicate feature requests.
5. **Public Roadmap & Voting Portal** – SSG roadmap page with ISR, optimistic UI upvotes, authentication-gated voting (1 vote per user per item), and status badges.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Validation:** Zod
- **Forms:** React Hook Form (optional)
- **Email:** Resend / SendGrid
- **Clustering:** sentence-transformers (all-MiniLM-L6-v2) via ONNX runtime

## Project Structure

```
src/
  app/
    dashboard/feedback/page.tsx   # Analytics dashboard
    roadmap/page.tsx              # Public roadmap
  api/
    feedback.ts                   # Feedback submission API
    votes.ts                      # Voting API
  components/
    FeedbackForm.tsx              # Validated feedback form
    FeedbackCharts.tsx            # Recharts visualizations
    FeedbackStatus.tsx            # Status lookup component
    RoadmapCard.tsx               # Roadmap item
```

--- FILE: requirements.txt ---
fastapi
uvicorn[standard]