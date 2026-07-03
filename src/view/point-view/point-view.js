import { createPointTemplate } from './point-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class PointView extends AbstractView{
  #handleRollupClick = null;

  constructor({point, destinations, offers, onRollupClick}) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleRollupClick = onRollupClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  get template() {
    return createPointTemplate(this.point, this.offers, this.destinations);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };
}
