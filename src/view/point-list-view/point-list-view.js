import { createPointListTemplate } from './point-list-view-template.js';
import { createElement } from '../../render.js';

export default class PointListView {
  getTemplate() {
    return createPointListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
