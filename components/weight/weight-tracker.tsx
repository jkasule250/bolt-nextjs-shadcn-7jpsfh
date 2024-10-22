'use client';

import { useState, useEffect } from 'react';
import { WeightEntry, WeightGoal } from '@/lib/types';
import WeightChart from './weight-chart';
import WeightForm from './weight-form';
import GoalCard from './goal-card';
import StatsDisplay from './stats-display';
import WeightList from './weight-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function WeightTracker() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [goal, setGoal] = useState<WeightGoal>({
    targetWeight: 0,
    deadline: '',
    startWeight: 0,
    startDate: new Date().toISOString(),
  });

  const addEntry = (entry: WeightEntry) => {
    setEntries([entry, ...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateGoal = (newGoal: WeightGoal) => {
    setGoal(newGoal);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Weight Loss Journey</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Weight
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Weight Entry</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <WeightForm onSubmit={addEntry} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GoalCard goal={goal} onUpdateGoal={updateGoal} />
          <StatsDisplay entries={entries} goal={goal} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Progress Chart</h2>
            <WeightChart entries={entries} goal={goal} />
          </div>
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Weight History</h2>
            <WeightList entries={entries} onDelete={deleteEntry} />
          </div>
        </div>
      </div>
    </div>
  );
}