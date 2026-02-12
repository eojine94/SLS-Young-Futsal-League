export type TeamRank = {
  id: string;
  name: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
};

export type PlayerRank = {
  id: string;
  name: string;
  number: number;
  goals: number;
  assists: number;
};
