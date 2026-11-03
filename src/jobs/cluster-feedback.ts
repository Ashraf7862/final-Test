import { clusterFeedback } from '@/lib/feedback-clustering';

export async function runNightlyClustering() {
  console.log('[Cron] Starting nightly feedback clustering...');

  // Fetch all feedback from database
  // const feedbackList = await db.feedback.findMany();
  const feedbackList: any[] = [];

  const clusters = clusterFeedback(feedbackList);

  // Merge duplicates and combine vote counts
  for (const [clusterId, items] of clusters) {
    if (items.length > 1) {
      const primary = items[0];
      const combinedVotes = items.reduce(
        (sum, item) => sum + (item.voteCount || 0),
        0
      );
      console.log(
        `[Cron] Merging ${items.length} items in cluster ${clusterId}, total votes: ${combinedVotes}`
      );
      // Update database: mark duplicates as merged, update primary vote count
      // await db.feedback.updateMany({ where: { id: { in: items.map(i => i.id) } }, data: { clusterId } });
      // await db.feedback.update({ where: { id: primary.id }, data: { voteCount: combinedVotes } });
    }
  }

  console.log('[Cron] Clustering complete.');
}

export default async function handler() {
  await runNightlyClustering();
  return new Response('OK');
}