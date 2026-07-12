import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render, remove } from '../framework/render.js';
import EmptyPointsListView from '../view/empty-points-list-view/empty-points-list-view.js';
import { EmptyPointsMessage } from '../const.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../utils/common.js';
import { sortItems } from '../const.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = 'everything';
  #currentSortType = 'day';
  #sortComponent = null;
  #pointListComponent = null;
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
    this.#clearBoard();

    if (this.#points.length === 0) {
      const message = EmptyPointsMessage[this.#currentFilter.toUpperCase()] || EmptyPointsMessage.EVERYTHING;
      this.#emptyListComponent = new EmptyPointsListView(message);
      render(this.#emptyListComponent, this.#container);
      return;
    }

    this.#sortComponent = new SortingView({
      sortItems,
      currentSortType: this.#currentSortType,
      onSortChange: this.#handleSortChange
    });
    render(this.#sortComponent, this.#container);

    this.#pointListComponent = new PointListView();
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

  #clearBoard() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }
    if (this.#pointListComponent) {
      remove(this.#pointListComponent);
      this.#pointListComponent = null;
    }
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }
    this.#pointsPresenter.clear();
  }

  #handleSortChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#sortPoints();
    this.#renderBoard();
  };

  #sortPoints() {
    switch (this.#currentSortType) {
      case 'day':
        this.#points.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));
        break;
      case 'time':
        this.#points.sort((a, b) => {
          const durA = new Date(a.date_to) - new Date(a.date_from);
          const durB = new Date(b.date_to) - new Date(b.date_from);
          return durB - durA;
        });
        break;
      case 'price':
        this.#points.sort((a, b) => b.base_price - a.base_price);
        break;
      default:
        break;
    }
  }

  resetSort() {
    this.#currentSortType = 'day';
    this.#points = [...this.#pointsModel.travelPoints];
    this.#sortPoints();
    this.#renderBoard();
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
