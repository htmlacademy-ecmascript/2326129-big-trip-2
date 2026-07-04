import { getRandomPoint } from '../mock/points';
import { offers } from '../mock/offers';
import { destinations } from '../mock/destinations';

const POINTS_COUNT = 3;

export default class Points {
  #travelPoints = null;
  #offers = null;
  #destinations = null;

  constructor(){
    this.#travelPoints = [];
    this.#offers = [];
    this.#destinations = [];
  }

  init(){
    this.#travelPoints = Array.from({length: POINTS_COUNT}, getRandomPoint);
    this.#offers = offers;
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
}
