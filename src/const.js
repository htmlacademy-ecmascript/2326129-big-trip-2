/* eslint-disable camelcase */
export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const getDefaultPoint = () => ({
  base_price: 0,
  date_from: new Date().toISOString(),
  date_to: new Date().toISOString(),
  destination: 0,
  is_favorite: false,
  offers: [],
  type: POINT_TYPES[0]
});
