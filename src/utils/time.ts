import dayjs from 'dayjs';

/**
 * This function calculate how many time between two dates and return resting time
 *
 * @param date number
 * @returns string
 */
export function getRestTime(date: number): string {
  const minutes = dayjs().diff(date, 'minutes');
  if (minutes === 0) return `${dayjs().diff(date, 'seconds')} seconds ago`;
  if (minutes > 60) return `${dayjs().diff(date, 'hours')} hours ago`;
  return `${minutes} minutes ago`;
}
