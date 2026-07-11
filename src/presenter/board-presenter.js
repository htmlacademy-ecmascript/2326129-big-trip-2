import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../framework/render.js';
import EmptyPointsListView from '../view/empty-points-list-view/empty-points-list-view.js';
import { EmptyPointsMessage } from '../const.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../utils/common.js';

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
  #pointsPresenter = new Map();

  constructor({ container, pointsModel }) {
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
    this.#pointsPresenter.clear();

    if (this.#points.length === 0) {
      const message = EmptyPointsMessage[this.#currentFilter.toUpperCase()] || EmptyPointsMessage.EVERYTHING;
      this.#emptyListComponent = new EmptyPointsListView(message);
      render(this.#emptyListComponent, this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#pointListComponent, this.#container);

    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#pointListComponent,
        onFavoriteClick: this.#handlePointChange,
        onOpenForm: this.#handleFormOpen
      });
      pointPresenter.init({
        point,
        destinations: this.#destinations,
        offers: this.#offers
      });
      this.#pointsPresenter.set(point.id, pointPresenter);
    });
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    const presenter = this.#pointsPresenter.get(updatedPoint.id);
    if (presenter) {
      presenter.init({
        point: updatedPoint,
        destinations: this.#destinations,
        offers: this.#offers
      });
    }
  };

  #handleFormOpen = (openedPointId) => {
    this.#pointsPresenter.forEach((presenter, id) => {
      if (id !== openedPointId) {
        presenter.reset();
      }
    });
  };
}
