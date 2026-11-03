import RoadmapCard from '@/components/RoadmapCard';

const ROADMAP_ITEMS = [
  {
    id: 'rm-1',
    title: 'Dark Mode',
    description: 'Add system and manual dark mode toggle for comfortable viewing.',
    status: 'planned' as const,
    votes: 128,
    category: 'feature',
  },
  {
    id: 'rm-2',
    title: 'Export to CSV',
    description: 'Allow users to export their feedback data as CSV files.',
    status: 'in_progress' as const,
    votes: 89,
    category: 'feature',
  },
  {
    id: 'rm-3',
    title: 'Mobile App',
    description: 'Native iOS and Android applications for on-the-go feedback.',
    status: 'under_review' as const,
    votes: 203,
    category: 'feature',
  },
  {
    id: 'rm-4',
    title: 'SSO Integration',
    description: 'Single sign-on support via SAML and OIDC providers.',
    status: 'launched' as const,
    votes: 67,
    category: 'feature',
  },
];

export default function RoadmapPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Roadmap</h1>
      <p className="text-gray-600 mb-8">
        See what we are working on and vote for the features you want most.
      </p>

      <div className="space-y-4">
        {ROADMAP_ITEMS.map((item) => (
          <RoadmapCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}