import { createFilterTemplate } from './filter-view-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {

  get template() {
    return createFilterTemplate();
  }
}
