import AbstractView from '../../framework/view/abstract-view';
import { createNewEventButtonTemplate } from './new-event-button-view-template';

export default class NewEventButton extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#onButtonClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #onButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
