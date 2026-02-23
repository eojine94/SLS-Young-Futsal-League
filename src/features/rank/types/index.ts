export type TeamRank = {
  id: string;
  name: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
};

export type TeamRankEnriched = TeamRank & {
  points: number;
  goalDifference: number;
};

export type PlayerRank = {
  id: string;
  name: string;
  number: number;
  teamId: string;
  teamName: string;
  goals: number;
  assists: number;
};
