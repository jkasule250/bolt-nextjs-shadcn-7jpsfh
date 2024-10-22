'use client';

import { WeightGoal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Target } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: WeightGoal;
  onUpdateGoal: (goal: WeightGoal) => void;
}

export default function GoalCard({ goal, onUpdateGoal }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoal(newGoal);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Weight Goal</CardTitle>
          <CardDescription>Track your target weight</CardDescription>
        </div>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {goal.targetWeight === 0 ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsEditing(true)}
          >
            Set Goal
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Target Weight</p>
              <p className="text-2xl font-bold">{goal.targetWeight} kg</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Deadline</p>
              <p className="text-muted-foreground">
                {format(new Date(goal.deadline), 'PPP')}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEditing(true)}
            >
              Update Goal
            </Button>
          </div>
        )}

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Weight Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Weight (kg)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newGoal.targetWeight || ''}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetWeight: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !newGoal.deadline && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newGoal.deadline ? (
                        format(new Date(newGoal.deadline), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newGoal.deadline ? new Date(newGoal.deadline) : undefined}
                      onSelect={(date) =>
                        setNewGoal({
                          ...newGoal,
                          deadline: date ? date.toISOString() : '',
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" className="w-full">
                Save Goal
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}