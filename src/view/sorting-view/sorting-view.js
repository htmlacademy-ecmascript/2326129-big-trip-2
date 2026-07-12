import { createSortingTemplate } from './sorting-view-template';
import AbstractView from '../../framework/view/abstract-view.js';

export default class SortingView extends AbstractView {
  #sortItems = null;
  #currentSortType = null;
  #onSortChange = null;

  constructor({ sortItems, currentSortType, onSortChange }) {
    super();
    this.#sortItems = sortItems;
    this.#currentSortType = currentSortType;
    this.#onSortChange = onSortChange;
    this.#addListeners();
  }

  get template() {
    return createSortingTemplate(this.#sortItems, this.#currentSortType);
  }

  #addListeners() {
    this.element.addEventListener('click', this.#sortChangeHandler);
  }

  #sortChangeHandler = (evt) => {
    if (evt.target.matches('input[type="radio"]')) {
      const sortType = evt.target.dataset.sortType;
      if (this.#onSortChange) {
        this.#onSortChange(sortType);
      }
    }
  };
}
