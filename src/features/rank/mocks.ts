import type { TeamRank, PlayerRank } from './types';

export const MOCK_TEAMS: TeamRank[] = [
  { id: '1', name: 'FC Thunder', matches: 10, wins: 8, draws: 0, losses: 2 },
  { id: '2', name: 'FC Storm', matches: 10, wins: 7, draws: 1, losses: 2 },
  { id: '3', name: 'FC Lightning', matches: 10, wins: 5, draws: 0, losses: 5 },
  { id: '4', name: 'FC Wave', matches: 10, wins: 4, draws: 1, losses: 5 },
  { id: '5', name: 'FC Blaze', matches: 10, wins: 3, draws: 0, losses: 7 },
  { id: '6', name: 'FC Dynamo', matches: 10, wins: 2, draws: 0, losses: 8 },
  { id: '7', name: 'FC United', matches: 10, wins: 1, draws: 0, losses: 9 },
];

export const MOCK_TEAM_PLAYERS: Record<string, PlayerRank[]> = {
  '1': [
    { id: 'p1', name: '홍길동', number: 0, goals: 12, assists: 5 },
    { id: 'p2', name: '김철수', number: 7, goals: 8, assists: 3 },
    { id: 'p3', name: '박영수', number: 10, goals: 5, assists: 7 },
    { id: 'p4', name: '이민호', number: 5, goals: 3, assists: 2 },
    { id: 'p5', name: '정대현', number: 3, goals: 2, assists: 4 },
  ],
  '2': [
    { id: 'p6', name: '최준혁', number: 9, goals: 10, assists: 4 },
    { id: 'p7', name: '강민수', number: 4, goals: 6, assists: 5 },
    { id: 'p8', name: '윤서진', number: 11, goals: 3, assists: 3 },
    { id: 'p9', name: '한동욱', number: 2, goals: 2, assists: 6 },
  ],
  '3': [
    { id: 'p10', name: '서영호', number: 8, goals: 8, assists: 2 },
    { id: 'p11', name: '임재현', number: 1, goals: 5, assists: 4 },
    { id: 'p12', name: '조현우', number: 6, goals: 3, assists: 3 },
    { id: 'p13', name: '남기혁', number: 12, goals: 2, assists: 1 },
  ],
  '4': [
    { id: 'p14', name: '오승환', number: 14, goals: 6, assists: 3 },
    { id: 'p15', name: '배준호', number: 3, goals: 4, assists: 5 },
    { id: 'p16', name: '류지성', number: 7, goals: 3, assists: 2 },
    { id: 'p17', name: '장우진', number: 9, goals: 2, assists: 1 },
  ],
  '5': [
    { id: 'p18', name: '김태윤', number: 10, goals: 5, assists: 2 },
    { id: 'p19', name: '이준서', number: 2, goals: 4, assists: 3 },
    { id: 'p20', name: '박도현', number: 5, goals: 2, assists: 1 },
    { id: 'p21', name: '송민재', number: 11, goals: 1, assists: 2 },
  ],
  '6': [
    { id: 'p22', name: '황석진', number: 6, goals: 4, assists: 1 },
    { id: 'p23', name: '전경호', number: 8, goals: 3, assists: 2 },
    { id: 'p24', name: '안재민', number: 1, goals: 2, assists: 3 },
  ],
  '7': [
    { id: 'p25', name: '문성빈', number: 4, goals: 3, assists: 1 },
    { id: 'p26', name: '권도윤', number: 9, goals: 2, assists: 2 },
    { id: 'p27', name: '신우현', number: 13, goals: 1, assists: 0 },
  ],
};
