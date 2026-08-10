import { RenderPosition, remove, render, replace } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import { getTripCost, getTripDates, getTripTitle } from '../utils/trip-info.js';

export default class TripInfoPresenter {
  #container = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    const points = this.#pointsModel.travelPoints;

    if (points.length === 0) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
        this.#tripInfoComponent = null;
      }
      return;
    }

    const tripInfo = {
      title: getTripTitle(points, this.#pointsModel.destinations),
      dates: getTripDates(points),
      cost: getTripCost(points, this.#pointsModel.offers),
    };

    const newTripInfoComponent = new TripInfoView(tripInfo);

    if (this.#tripInfoComponent) {
      replace(newTripInfoComponent, this.#tripInfoComponent);
      remove(this.#tripInfoComponent);
    } else {
      render(newTripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    }

    this.#tripInfoComponent = newTripInfoComponent;
  }

  #handleModelChange = () => {
    this.init();
  };
}
