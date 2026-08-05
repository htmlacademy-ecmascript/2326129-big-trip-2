/* eslint-disable camelcase */
import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render, remove } from '../framework/render.js';
import EmptyPointsListView from '../view/empty-points-list-view/empty-points-list-view.js';
import { EmptyPointsMessage, UpdateType, UserActions } from '../const.js';
import PointPresenter from './point-presenter.js';
import { sortItems } from '../const.js';
import { filter } from '../utils/filter.js';
import { FilterType, getDefaultPoint } from '../const.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = 'everything';
  #currentSortType = 'day';
  #sortComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #pointListComponent = null;
  #emptyListComponent = null;
  #pointsPresenter = new Map();
  #filtersModel = null;
  #newEventButtonComponent = null;
  #newPointPresenter = null;
  #pendingNewPoint = false;

  constructor({ container, pointsModel, filtersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#filtersModel.addObserver(this.#handleModelChange);
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#points = [...this.#pointsModel.travelPoints];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#currentFilter = this.#filtersModel.filter;
    this.#filterPoints();
    this.#renderBoard();
    this.#initNewEventButton();
    if (this.#pendingNewPoint) {
      this.#createNewPointForm();
      this.#pendingNewPoint = false;
    }
  }

  #renderBoard() {
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
        onDataChange: this.#handlePointChange,
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

  #filterPoints(){
    this.#points = [...filter[this.#currentFilter](this.#points)];
  }

  #sortPoints() {
    this.#clearBoard();
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

  #handlePointChange = (actionType, updateType, newPoint) => {
    switch(actionType) {
      case UserActions.ADD_EVENT:
        this.#pointsModel.addTravelPoint(updateType, newPoint);
        break;
      case UserActions.UPDATE_EVENT:
        this.#pointsModel.updateTravelPoints(updateType, newPoint);
        break;
      case UserActions.DELETE_EVENT:
        this.#pointsModel.deleteTravelPoint(updateType, newPoint);
        break;
    }
  };

  #handleModelChange = (updateType, id) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(id).updateData(this.#pointsModel.getContentById(id));
        break;
      case UpdateType.MINOR:
        this.#destroyNewPointPresenter();
        this.#points = [...this.#pointsModel.travelPoints];
        this.#filterPoints();
        this.#sortPoints();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#currentSortType = 'day';
        this.init();
        break;
    }
  };

  #handleFormOpen = (openedPointId) => {
    this.#destroyNewPointPresenter();

    this.#pointsPresenter.forEach((presenter, id) => {
      if (id !== openedPointId) {
        presenter.reset();
      }
    });
  };

  #initNewEventButton() {
    if (!this.#newEventButtonComponent) {
      this.#newEventButtonComponent = this.#mainElement.querySelector('.trip-main__event-add-btn');
      if (this.#newEventButtonComponent) {
        this.#newEventButtonComponent.addEventListener('click', this.#handleNewEventButtonClick);
      }
    }
  }

  #destroyNewPointPresenter() {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
      this.#newPointPresenter = null;
    }
  }

  #createNewPointForm() {
    if (this.#newPointPresenter) {
      return;
    }
    this.#pointsPresenter.forEach((presenter) => presenter.reset());
    this.#destroyNewPointPresenter();
    // this.#pointsPresenter.forEach((presenter) => presenter.reset());
    // this.#destroyNewPointPresenter();

    const defaultPoint = getDefaultPoint();
    this.#newPointPresenter = new PointPresenter({
      container: { element: document.querySelector('.trip-events__list') },
      onDataChange: this.#handlePointChange,
      onOpenForm: this.#handleFormOpen
    });
    this.#newPointPresenter.initNewPoint({
      point: defaultPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onClose: () => this.#destroyNewPointPresenter()
    });
  }

  #handleNewEventButtonClick = () => {
    if (this.#newPointPresenter) {
      return;
    }
    this.#pendingNewPoint = true;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  };


}
