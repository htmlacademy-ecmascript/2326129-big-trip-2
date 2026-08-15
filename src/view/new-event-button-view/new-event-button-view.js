import AbstractView from '../../framework/view/abstract-view.js';
import { createNewEventButtonTemplate } from './new-event-button-view-template.js';

export default class NewEventButtonView extends AbstractView {
  #onButtonClick = null;

  constructor({ onButtonClick }) {
    super();
    this.#onButtonClick = onButtonClick;
    this.#setEventHandlers();
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #setEventHandlers() {
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  #buttonClickHandler = () => {
    this.#onButtonClick?.();
  };

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }
}
