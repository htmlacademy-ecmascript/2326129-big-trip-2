import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EditPointView extends AbstractView{
  #handleFormSubmit = null;


  constructor({ point, destinations, offers, onFormSubmit }) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form').addEventListener('submit', onFormSubmit);
  }

  get template() {
    return createEditPointTemplate(this.point, this.destinations, this.offers);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    return this.#handleFormSubmit();
  };
}
