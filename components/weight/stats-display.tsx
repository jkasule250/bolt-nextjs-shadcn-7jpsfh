'use client';

import { WeightEntry, WeightGoal, Stats } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, Target, TrendingDown, Scale } from 'lucide-react';

interface StatsDisplayProps {
  entries: WeightEntry[];
  goal: WeightGoal;
}

export default function StatsDisplay({ entries, goal }: StatsDisplayProps) {
  const calculateStats = (): Stats => {
    if (entries.length === 0) {
      return {
        totalLost: 0,
        weeklyAverage: 0,
        remainingToGoal: 0,
        progressPercentage: 0,
      };
    }

    const sortedEntries = [...entries].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstWeight = sortedEntries[0].weight;
    const currentWeight = sortedEntries[sortedEntries.length - 1].weight;
    const totalLost = firstWeight - currentWeight;

    const weeklyAverage = totalLost / (entries.length / 7);
    const remainingToGoal = currentWeight - goal.targetWeight;
    const totalToLose = firstWeight - goal.targetWeight;
    const progressPercentage = totalToLose > 0 
      ? Math.min(100, (totalLost / totalToLose) * 100)
      : 0;

    return {
      totalLost,
      weeklyAverage,
      remainingToGoal,
      progressPercentage,
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Lost</CardTitle>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.abs(stats.totalLost).toFixed(1)} kg</div>
          <Progress value={stats.progressPercentage} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.abs(stats.weeklyAverage).toFixed(1)} kg</div>
          <p className="text-xs text-muted-foreground">per week</p>
        </CardContent>
      </Card>
    </div>
  );
}