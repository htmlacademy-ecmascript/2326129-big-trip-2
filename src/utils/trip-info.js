import dayjs from 'dayjs';
import he from 'he';

function sortPointsByDateFrom(points) {
  return [...points].sort((a, b) => dayjs(a.date_from).valueOf() - dayjs(b.date_from).valueOf());
}

function getRouteCityNames(points, destinations) {
  const sortedPoints = sortPointsByDateFrom(points);
  const cityNames = [];

  for (const point of sortedPoints) {
    const destination = destinations.find((item) => item.id === point.destination);
    const name = destination?.name;

    if (name && !cityNames.includes(name)) {
      cityNames.push(name);
    }
  }

  return cityNames;
}

export function getTripTitle(points, destinations) {
  const cityNames = getRouteCityNames(points, destinations);

  if (cityNames.length === 0) {
    return '';
  }

  if (cityNames.length > 3) {
    return `${he.encode(cityNames[0])} &mdash; ... &mdash; ${he.encode(cityNames[cityNames.length - 1])}`;
  }

  return cityNames.map((name) => he.encode(name)).join(' &mdash; ');
}

export function getTripDates(points) {
  if (points.length === 0) {
    return '';
  }

  const sortedPoints = sortPointsByDateFrom(points);
  const dateFrom = sortedPoints[0].date_from;
  const dateTo = sortedPoints[sortedPoints.length - 1].date_to;
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  if (from.isSame(to, 'month')) {
    return `${from.format('D')}&nbsp;&mdash;&nbsp;${to.format('D MMM')}`;
  }

  return `${from.format('D MMM')}&nbsp;&mdash;&nbsp;${to.format('D MMM')}`;
}

export function getOffersPrice(point, offers) {
  const typeOffers = offers.find((item) => item.type === point.type)?.offers ?? [];

  return (point.offers ?? []).reduce((sum, offerId) => {
    const offer = typeOffers.find((item) => String(item.id) === String(offerId));
    return sum + Number(offer?.price ?? 0);
  }, 0);
}

export function getPointPrice(point, offers) {
  return Number(point.base_price ?? 0) + getOffersPrice(point, offers);
}

export function getTripCost(points, offers) {
  return points.reduce((total, point) => total + getPointPrice(point, offers), 0);
}
