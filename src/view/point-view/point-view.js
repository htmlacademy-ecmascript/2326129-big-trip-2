import { createPointTemplate } from './point-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class PointView extends AbstractView {
  #handleRollupClick = null;
  #onClickFavoriteButton = null;
  #point = null;

  constructor({ point, destinations, offers, onRollupClick, onClickFavoriteButton }) {
    super();
    this.#point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleRollupClick = onRollupClick;
    this.#onClickFavoriteButton = onClickFavoriteButton;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.offers, this.destinations);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick?.();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line camelcase
    const updatedPoint = { ...this.#point, is_favorite: !this.#point.is_favorite };
    if(this.#onClickFavoriteButton){
      return this.#onClickFavoriteButton(updatedPoint);
    }
  };
}
