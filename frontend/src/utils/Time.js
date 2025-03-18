
export const toRelativeTime = (date) => {
  const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
  const timeDiff = Math.floor((new Date() - new Date(date)) / 1000);

  const second = Math.round(timeDiff);
  const minute = Math.round(second / 60);
  const hour = Math.round(minute / 60);
  const day = Math.round(hour / 24);
  const week = Math.round(day / 7);
  const month = Math.round(day / 30);
  const year = Math.round(day / 365);

  if (year > 0) return formatter.format(-year, 'year');
  if (month > 0) return formatter.format(-month, 'month');
  if (week > 0) return formatter.format(-week, 'week');
  if (day > 0) return formatter.format(-day, 'day');
  if (hour > 0) return formatter.format(-hour, 'hour');
  if (minute > 0) return formatter.format(-minute, 'minute');
  return formatter.format(-second, 'second');

};

