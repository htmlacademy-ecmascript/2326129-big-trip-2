import AbstractView from '../../framework/view/abstract-view';
import { createEmptyListPointsTemplate } from './empty-points-list-view-template';

export default class EmptyPointsListView extends AbstractView{

  #message = null;

  constructor (message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyListPointsTemplate(this.#message);
  }
}
