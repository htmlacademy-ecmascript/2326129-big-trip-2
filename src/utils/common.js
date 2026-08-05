
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatDate(date, formatType) {
  const formats = {
    'full-date': 'YYYY-MM-DD',
    'custom': 'MMM DD',
    'date-time': 'YYYY-MM-DDTHH:mm',
    'time': 'HH:mm'
  };
  return dayjs(date).format(formats[formatType] || formats.time);
}

export function updatePoint(points, updatedPoint) {
  return points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
}

export function getDuration(dateFrom, dateTo) {
  const diffMs = dayjs(dateTo).diff(dayjs(dateFrom));
  const dur = dayjs.duration(diffMs);

  const days = Math.floor(dur.asDays());
  const hours = dur.hours();
  const minutes = dur.minutes();

  const parts = [];

  if (days > 0) {
    parts.push(`${String(days).padStart(2, '0')}D`);
  }

  if (days > 0 || hours > 0) {
    parts.push(`${String(hours).padStart(2, '0')}H`);
  }

  parts.push(`${String(minutes).padStart(2, '0')}M`);

  return parts.join(' ');

}
const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];

export {getRandomElement};
