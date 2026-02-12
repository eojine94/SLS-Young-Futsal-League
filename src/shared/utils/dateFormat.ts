const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export function formatMatchDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayName = DAY_NAMES[date.getDay()];
  return `${year}.${month}.${day}(${dayName})`;
}

export function isDatePast(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const matchDate = new Date(isoDate + 'T00:00:00');
  return matchDate < today;
}
