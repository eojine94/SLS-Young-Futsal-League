import type { Team, Player } from './types';

export const MOCK_TEAMS: Team[] = [
  { id: '1', name: 'FC Thunder', playerCount: 5 },
  { id: '2', name: 'FC Storm', playerCount: 4 },
  { id: '3', name: 'FC Lightning', playerCount: 4 },
  { id: '4', name: 'FC Wave', playerCount: 4 },
  { id: '5', name: 'FC Blaze', playerCount: 4 },
  { id: '6', name: 'FC Dynamo', playerCount: 3 },
  { id: '7', name: 'FC United', playerCount: 3 },
];

export const MOCK_PLAYERS: Player[] = [
  { id: 'p1', name: '홍길동', number: 0, role: 'leader', teamId: '1' },
  { id: 'p2', name: '김철수', number: 7, role: 'member', teamId: '1' },
  { id: 'p3', name: '박영수', number: 10, role: 'member', teamId: '1' },
  { id: 'p4', name: '이민호', number: 5, role: 'member', teamId: '1' },
  { id: 'p5', name: '정대현', number: 3, role: 'member', teamId: '1' },

  { id: 'p6', name: '최준혁', number: 9, role: 'leader', teamId: '2' },
  { id: 'p7', name: '강민수', number: 4, role: 'member', teamId: '2' },
  { id: 'p8', name: '윤서진', number: 11, role: 'member', teamId: '2' },
  { id: 'p9', name: '한동욱', number: 2, role: 'member', teamId: '2' },

  { id: 'p10', name: '서영호', number: 8, role: 'leader', teamId: '3' },
  { id: 'p11', name: '임재현', number: 1, role: 'member', teamId: '3' },
  { id: 'p12', name: '조현우', number: 6, role: 'member', teamId: '3' },
  { id: 'p13', name: '남기혁', number: 12, role: 'member', teamId: '3' },

  { id: 'p14', name: '오승환', number: 14, role: 'leader', teamId: '4' },
  { id: 'p15', name: '배준호', number: 3, role: 'member', teamId: '4' },
  { id: 'p16', name: '류지성', number: 7, role: 'member', teamId: '4' },
  { id: 'p17', name: '장우진', number: 9, role: 'member', teamId: '4' },

  { id: 'p18', name: '김태윤', number: 10, role: 'leader', teamId: '5' },
  { id: 'p19', name: '이준서', number: 2, role: 'member', teamId: '5' },
  { id: 'p20', name: '박도현', number: 5, role: 'member', teamId: '5' },
  { id: 'p21', name: '송민재', number: 11, role: 'member', teamId: '5' },

  { id: 'p22', name: '황석진', number: 6, role: 'leader', teamId: '6' },
  { id: 'p23', name: '전경호', number: 8, role: 'member', teamId: '6' },
  { id: 'p24', name: '안재민', number: 1, role: 'member', teamId: '6' },

  { id: 'p25', name: '문성빈', number: 4, role: 'leader', teamId: '7' },
  { id: 'p26', name: '권도윤', number: 9, role: 'member', teamId: '7' },
  { id: 'p27', name: '신우현', number: 13, role: 'member', teamId: '7' },
];
