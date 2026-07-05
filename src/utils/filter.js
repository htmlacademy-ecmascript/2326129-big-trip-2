import { FilterType } from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.date_from) > new Date()),
  [FilterType.PRESENT]: (points) => points.filter((point) => {
    const now = new Date();
    const from = new Date(point.date_from);
    const to = new Date(point.date_to);
    return from <= now && to >= now;
  }),
  [FilterType.PAST]: (points) => points.filter((point) => new Date(point.date_to) < new Date())
};
