export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  goals: string;
}

export interface TeamMember {
  _id: string;
  name: string;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members?: TeamMember[];
}

export interface Activity {
  _id: string;
  user?: User;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: string;
  notes: string;
}

export interface LeaderboardEntry {
  _id: string;
  user?: User;
  rank: number;
  totalPoints: number;
}

export interface Workout {
  _id: string;
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  trainer: string;
  team?: Team;
}

export interface ApiResponse<T> {
  message: string;
  data: T[] | { items?: T[] };
}
