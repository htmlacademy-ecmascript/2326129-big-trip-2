/* eslint-disable camelcase */
export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const EmptyPointsMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

export const FailedLoadMessage = 'Failed to load latest route information';

export const getDefaultPoint = () => ({
  base_price: 0,
  date_from: '',
  date_to: '',
  destination: '',
  is_favorite: false,
  offers: [],
  type: 'flight',
});

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const sortItems = [
  { type: SortType.DAY, isEnabled: true },
  { type: 'event', isEnabled: false },
  { type: SortType.TIME, isEnabled: true },
  { type: SortType.PRICE, isEnabled: true },
  { type: 'offer', isEnabled: false }
];

export const SORT_LABELS = {
  day: 'Day',
  event: 'Event',
  time: 'Time',
  price: 'Price',
  offer: 'Offers'
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};
