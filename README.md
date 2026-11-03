# Feedback System Enhancement Sprint

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
    RoadmapCard.tsx               # Roadmap item card
  lib/
    feedback-analytics.ts         # Analytics computations
    email.ts                      # Transactional email helpers
    feedback-clustering.ts        # Deduplication & clustering logic
  jobs/
    cluster-feedback.ts           # Nightly clustering cron job
  types/
    feedback.ts                   # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Set environment variables (email provider API keys):
   ```bash
   RESEND_API_KEY=your_resend_key
   # or
   SENDGRID_API_KEY=your_sendgrid_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `POST /api/feedback` – Submit new feedback (validated with Zod)
- `GET /api/feedback` – List all feedback
- `POST /api/votes` – Record a vote on a roadmap item
- `GET /api/votes` – List all votes

## Feedback Statuses

| Status | Description |
|--------|-------------|
| received | Feedback has been received |
| triaged | Feedback has been reviewed and categorized |
| planned | Feature is planned for implementation |
| in_progress | Work is actively underway |
| shipped | Feature has been released |
| closed | Feedback is resolved or declined |
```