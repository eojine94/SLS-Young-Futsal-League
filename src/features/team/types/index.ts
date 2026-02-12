export type Team = {
  id: string;
  name: string;
  playerCount: number;
};

export type Player = {
  id: string;
  name: string;
  number: number;
  role: 'leader' | 'member';
  teamId: string;
};
