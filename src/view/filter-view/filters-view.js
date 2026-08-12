import { createFilterTemplate } from './filter-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #onFilterChange = null;

  constructor({filters, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#onFilterChange = onFilterChange;
    this.#registerEventListeners();
  }

  #registerEventListeners() {
    this.element?.addEventListener('input', (evt) => {
      const filterType = evt.target.id.replace('filter-', '');
      this.#onFilterChange(filterType);
    });
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
