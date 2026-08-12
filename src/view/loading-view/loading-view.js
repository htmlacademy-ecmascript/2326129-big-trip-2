import AbstractView from '../../framework/view/abstract-view';
import { createNoTaskTemplate } from './loading-view-template';

export default class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
