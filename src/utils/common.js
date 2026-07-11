
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
  const hours = Math.floor(dur.asHours());
  const minutes = dur.minutes();

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}
const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];

export {getRandomElement};
