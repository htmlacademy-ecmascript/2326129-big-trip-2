import { getRandomPoint } from '../mock/points';
import { mockOffers } from '../mock/offers';
import { destinations } from '../mock/destinations';
import Observable from '../framework/observable';
import { updatePoint } from '../utils/common';

const TRAVEL_POINTS_COUNT = 3;

export default class TravelPoints extends Observable {

  #travelPoints = null;
  #offers = null;
  #destinations = null;

  constructor(){
    super();
    this.#travelPoints = [];
    this.#offers = [];
    this.#destinations = [];
  }

  init(){
    this.#travelPoints = Array.from({length: TRAVEL_POINTS_COUNT}, getRandomPoint);
    this.#offers = mockOffers;
    this.#destinations = destinations;
  }

  get travelPoints() {
    return this.#travelPoints;
  }

  get offers(){
    return this.#offers;
  }

  get destinations(){
    return this.#destinations;
  }

  updateTravelPoints (updateType, updatedPoint) {
    this.#travelPoints = updatePoint(this.#travelPoints, updatedPoint);
    this._notify(updateType, updatedPoint.id);
  }

  addTravelPoint(updateType, newPoint) {
    this.#travelPoints = [...this.#travelPoints, newPoint];
    this._notify(updateType);
  }

  deleteTravelPoint(updateType, point) {
    this.#travelPoints = this.#travelPoints.filter((item) => item.id !== point.id);
    this._notify(updateType);
  }

  getContentById(id) {
    const point = this.#travelPoints.find((item) => item.id === id);

    return {
      point: point ?? {},
      destinations: this.#destinations,
      offers: this.#offers,
    };
  }
}


