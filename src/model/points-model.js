import { getRandomPoint } from '../mock/points';
import { offers } from '../mock/offers';
import { destinations } from '../mock/destinations';

const POINTS_COUNT = 3;

export default class Points {
  constructor(){
    this.travelPoints = [];
    this.offers = [];
    this.destinations = [];
  }

  init(){
    this.travelPoints = Array.from({length: POINTS_COUNT}, getRandomPoint);
    this.offers = offers;
    this.destinations = destinations;
  }

  getTravelPoints() {
    return this.travelPoints;
  }

  getOffers(){
    return this.offers;
  }

  getDestinations(){
    return this.destinations;
  }
}
