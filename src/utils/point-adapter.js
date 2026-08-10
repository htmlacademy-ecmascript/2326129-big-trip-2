/* eslint-disable camelcase */

export function adaptPointToClient(point) {
  return {
    id: point.id,
    base_price: point.base_price,
    date_from: point.date_from,
    date_to: point.date_to,
    destination: point.destination,
    is_favorite: Boolean(point.is_favorite),
    offers: [...(point.offers ?? [])],
    type: point.type,
  };
}

export function adaptPointToServer(point) {
  return {
    base_price: parseInt(point.base_price, 10),
    date_from: point.date_from,
    date_to: point.date_to,
    destination: point.destination,
    is_favorite: Boolean(point.is_favorite),
    offers: [...(point.offers ?? [])],
    type: point.type,
  };
}
