import { createAddNewPointTemplate } from './add-new-point-view-template.js';
import { createElement } from '../../render.js';

export default class AddNewPointView {
  getTemplate() {
    return createAddNewPointTemplate();
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
