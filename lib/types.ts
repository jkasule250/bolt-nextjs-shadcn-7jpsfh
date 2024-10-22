export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  note?: string;
}

export interface WeightGoal {
  targetWeight: number;
  deadline: string;
  startWeight: number;
  startDate: string;
}

export interface Stats {
  totalLost: number;
  weeklyAverage: number;
  remainingToGoal: number;
  progressPercentage: number;
}