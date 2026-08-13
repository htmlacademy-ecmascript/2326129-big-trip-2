import Observable from '../framework/observable';
import { UpdateType } from '../const';
import { adaptPointToClient } from '../utils/point-adapter.js';

export default class TravelPointsModel extends Observable {
  #travelPoints = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const [points, destinations, offers] = await Promise.all([
        this.#pointsApiService.points,
        this.#pointsApiService.destinations,
        this.#pointsApiService.offers,
      ]);

      this.#travelPoints = points.map(adaptPointToClient);
      this.#destinations = destinations;
      this.#offers = offers;
      this._notify(UpdateType.INIT);
    } catch {
      this.#travelPoints = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }

  get travelPoints() {
    return this.#travelPoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async updateTravelPoints(updateType, update) {
    const index = this.#travelPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    const response = await this.#pointsApiService.updatePoint(update);
    const updatedPoint = adaptPointToClient(response);

    this.#travelPoints = [
      ...this.#travelPoints.slice(0, index),
      updatedPoint,
      ...this.#travelPoints.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint.id);
  }

  async addTravelPoint(updateType, newPoint) {
    const response = await this.#pointsApiService.addPoint(newPoint);
    const addedPoint = adaptPointToClient(response);

    this.#travelPoints = [...this.#travelPoints, addedPoint];
    this._notify(updateType);
  }

  async deleteTravelPoint(updateType, point) {
    const index = this.#travelPoints.findIndex((item) => item.id === point.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    await this.#pointsApiService.deletePoint(point);

    this.#travelPoints = [
      ...this.#travelPoints.slice(0, index),
      ...this.#travelPoints.slice(index + 1),
    ];

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
