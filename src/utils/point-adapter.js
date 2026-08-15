/* eslint-disable camelcase */
import { formatDate } from './common.js';
import { getSafePointType } from '../const.js';

function getComparablePoint(point) {
  return {
    type: getSafePointType(point.type),
    destination: String(point.destination),
    base_price: Number(point.base_price),
    date_from: formatDate(point.date_from, 'flatpickr'),
    date_to: formatDate(point.date_to, 'flatpickr'),
    offers: [...(point.offers ?? [])].map(String).sort().join(','),
  };
}

export function isPointEqual(pointA, pointB) {
  const comparableA = getComparablePoint(pointA);
  const comparableB = getComparablePoint(pointB);

  return comparableA.type === comparableB.type
    && comparableA.destination === comparableB.destination
    && comparableA.base_price === comparableB.base_price
    && comparableA.date_from === comparableB.date_from
    && comparableA.date_to === comparableB.date_to
    && comparableA.offers === comparableB.offers;
}

export function adaptPointToClient(point) {
  return {
    id: point.id,
    base_price: point.base_price,
    date_from: point.date_from,
    date_to: point.date_to,
    destination: point.destination,
    is_favorite: Boolean(point.is_favorite),
    offers: [...(point.offers ?? [])],
    type: getSafePointType(point.type),
  };
}

export function adaptPointToServer(point) {
  return {
    base_price: point.base_price,
    date_from: point.date_from,
    date_to: point.date_to,
    destination: point.destination,
    is_favorite: Boolean(point.is_favorite),
    offers: [...(point.offers ?? [])],
    type: getSafePointType(point.type),
  };
}
