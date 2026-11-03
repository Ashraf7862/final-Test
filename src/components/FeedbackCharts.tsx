"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#4169d8', '#16834a', '#c0392b', '#f1c40f', '#9b59b6', '#e67e22'];

export function RatingDistributionChart({ data }: { data: Record<number, number> }) {
  const chartData = Object.entries(data).map(([rating, count]) => ({
    rating: Number(rating),
    count,
  }));
  return (
    <div className="h-64 w-full">
      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="rating" label={{ value: 'Rating', position: 'bottom' }} />
        <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Bar dataKey="count" fill="#4169d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
}

export function CategoryPieChart({ data }: { data: Record<string, number> }) {
  const chartData = Object.entries(data)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));
  return (
    <div className="h-64 w-full">
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export function SentimentTrendChart({ data }: { data: Array<{ date: string; score: number }> }) {
  return (
    <div className="h-64 w-full">
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#4169d8" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
}

export function TopFeatureRequestsTable({
  data,
}: {
  data: Array<{ id: string; title: string; voteCount: number; status: string }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-gray-600">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Votes</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 text-sm">
              <td className="py-3 text-gray-900">{item.title}</td>
              <td className="py-3 text-gray-900">{item.voteCount}</td>
              <td className="py-3">
                <span
                  className="px-2 py-1 rounded text-xs border border-gray-300 text-gray-600"
                >
                  {item.status.replace(/_/g, ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}