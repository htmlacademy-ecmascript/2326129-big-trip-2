import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../framework/render.js';
import EmptyPointsListView from '../view/empty-points-list-view/empty-points-list-view.js';
import { EmptyPointsMessage } from '../const.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #sortComponent = new SortingView();
  #pointListComponent = new PointListView();
  #container = null;
  #pointsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = 'everything';
  #emptyListComponent = null;

  constructor ({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.travelPoints];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      const message = EmptyPointsMessage[this.#currentFilter.toUpperCase()] || EmptyPointsMessage.EVERYTHING;
      this.#emptyListComponent = new EmptyPointsListView(message);
      render(this.#emptyListComponent, this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#pointListComponent, this.#container);

    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter(this.#pointListComponent);
      pointPresenter.init({point: point, destinations: this.#destinations, offers: this.#offers});
    });
  }
}
