import { createPointTemplate } from './point-view-template.js';
import { createElement } from '../../render.js';

export default class PointView {
  getTemplate() {
    return createPointTemplate();
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
