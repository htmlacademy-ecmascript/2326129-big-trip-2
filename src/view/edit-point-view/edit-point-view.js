import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EditPointView extends AbstractView{
  #handleFormSubmit = null;
  #handleFormClose = null;


  constructor({ point, destinations, offers, onFormSubmit, onRollupClick }) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onRollupClick;

    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
  }

  get template() {
    return createEditPointTemplate(this.point, this.destinations, this.offers);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    return this.#handleFormSubmit();
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    return this.#handleFormClose();
  };
}
