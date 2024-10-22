'use client';

import { WeightEntry, WeightGoal } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface WeightChartProps {
  entries: WeightEntry[];
  goal: WeightGoal;
}

export default function WeightChart({ entries, goal }: WeightChartProps) {
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = sortedEntries.map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    weight: entry.weight,
  }));

  const minWeight = Math.min(...entries.map(e => e.weight), goal.targetWeight);
  const maxWeight = Math.max(...entries.map(e => e.weight), goal.startWeight);
  const padding = (maxWeight - minWeight) * 0.1;

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-sm text-muted-foreground"
          />
          <YAxis
            domain={[minWeight - padding, maxWeight + padding]}
            className="text-sm text-muted-foreground"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--background))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}