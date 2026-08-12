import AbstractView from '../../framework/view/abstract-view.js';
import { createTripInfoTemplate } from './trip-info-view-template.js';

export default class TripInfoView extends AbstractView {
  #tripInfo = null;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }

  get template() {
    return createTripInfoTemplate(this.#tripInfo);
  }
}
