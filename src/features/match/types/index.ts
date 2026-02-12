export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  homeScore?: number;
  awayScore?: number;
  hasResult: boolean;
};

export type MatchGroup = {
  date: string;
  matches: Match[];
};

export type PlayerRecord = {
  playerId: string;
  playerName: string;
  playerNumber: number;
  goals: number;
  assists: number;
};
