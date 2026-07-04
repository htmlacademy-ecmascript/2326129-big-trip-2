import AbstractView from '../../framework/view/abstract-view';
import { createEmptyListPointsTemplate } from './empty-points-list-view-template';

export default class EmptyPointsListView extends AbstractView{
  get template() {
    return createEmptyListPointsTemplate();
  }
}
