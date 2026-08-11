/* eslint-disable camelcase */
import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render, remove } from '../framework/render.js';
import EmptyPointsListView from '../view/empty-points-list-view/empty-points-list-view.js';
import { FailedLoadMessage, UpdateType, UserAction, getEmptyPointsMessage } from '../const.js';
import PointPresenter from './point-presenter.js';
import { sortItems, SortType, FilterType, getDefaultPoint } from '../const.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #pointListComponent = null;
  #emptyListComponent = null;
  #pointsPresenter = new Map();
  #filtersModel = null;
  #newEventButtonComponent = null;
  #newPointPresenter = null;
  #pendingNewPoint = false;
  #temporaryListComponent = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #isLoadError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ container, pointsModel, filtersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#filtersModel.addObserver(this.#handleModelChange);
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    if (this.#isLoading) {
      this.#renderInitialLoading();
      return;
    }

    this.#points = [...this.#pointsModel.travelPoints];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#currentFilter = this.#filtersModel.filter;
    this.#filterPoints();
    this.#sortPoints();
    this.#renderBoard();
    this.#initNewEventButton();
    if (this.#pendingNewPoint) {
      this.#createNewPointForm();
      this.#pendingNewPoint = false;
    }
  }

  #renderBoard() {
    this.#clearBoard();

    if (this.#points.length === 0 && !this.#pendingNewPoint && !this.#newPointPresenter) {
      const message = getEmptyPointsMessage(this.#filtersModel.filter);
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
    if (this.#newPointPresenter) {
      this.#pendingNewPoint = false;
      this.#destroyNewPointPresenter();
    }

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
    if (this.#temporaryListComponent) {
      remove(this.#temporaryListComponent);
      this.#temporaryListComponent = null;
    }
    if(this.#loadingComponent) {
      remove(this.#loadingComponent);
      this.#loadingComponent = null;

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
    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#points.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));
        break;
      case SortType.TIME:
        this.#points.sort((a, b) => {
          const durA = new Date(a.date_to) - new Date(a.date_from);
          const durB = new Date(b.date_to) - new Date(b.date_from);
          return durB - durA;
        });
        break;
      case SortType.PRICE:
        this.#points.sort((a, b) => b.base_price - a.base_price);
        break;
      default:
        break;
    }
  }

  resetSort() {
    this.#currentSortType = SortType.DAY;
    this.#points = [...this.#pointsModel.travelPoints];
    this.#sortPoints();
    this.#renderBoard();
  }

  #handlePointChange = async (actionType, updateType, newPoint) => {
    this.#uiBlocker.block();

    try {
      switch (actionType) {
        case UserAction.ADD_EVENT:
          await this.#pointsModel.addTravelPoint(updateType, newPoint);
          break;
        case UserAction.UPDATE_EVENT:
          await this.#pointsModel.updateTravelPoints(updateType, newPoint);
          break;
        case UserAction.DELETE_EVENT:
          await this.#pointsModel.deleteTravelPoint(updateType, newPoint);
          break;
      }

      return true;
    } catch {
      return false;
    } finally {
      this.#uiBlocker.unblock();
    }
  };

  #handleModelChange = (updateType, id) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(id)?.updateData(this.#pointsModel.getContentById(id));
        break;
      case UpdateType.MINOR: {
        const wasNewPointForm = Boolean(this.#newPointPresenter);
        this.#pendingNewPoint = false;
        this.#destroyNewPointPresenter();
        this.#points = [...this.#pointsModel.travelPoints];
        this.#offers = [...this.#pointsModel.offers];
        this.#destinations = [...this.#pointsModel.destinations];
        this.#currentFilter = wasNewPointForm
          ? FilterType.EVERYTHING
          : this.#filtersModel.filter;
        this.#filterPoints();
        if (wasNewPointForm) {
          this.#currentSortType = SortType.DAY;
        }
        this.#sortPoints();
        this.#renderBoard();
        break;
      }
      case UpdateType.MAJOR:
        this.#currentSortType = SortType.DAY;
        this.init();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.init();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#isLoadError = true;
        this.#clearBoard();
        this.#points = [];
        this.#emptyListComponent = new EmptyPointsListView(FailedLoadMessage);
        render(this.#emptyListComponent, this.#container);
        this.#initNewEventButton();
        this.#setNewEventButtonDisabled(true);
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

    if (this.#temporaryListComponent) {
      remove(this.#temporaryListComponent);
      this.#temporaryListComponent = null;
    }

    if (!this.#isLoadError) {
      this.#setNewEventButtonDisabled(false);
    }
  }

  #setNewEventButtonDisabled(isDisabled) {
    if (this.#newEventButtonComponent) {
      this.#newEventButtonComponent.disabled = isDisabled;
    }
  }

  #createNewPointForm() {
    if (this.#newPointPresenter) {
      return;
    }

    this.#setNewEventButtonDisabled(true);
    this.#pointsPresenter.forEach((presenter) => presenter.reset());
    this.#destroyNewPointPresenter();

    const defaultPoint = getDefaultPoint();
    let listElement = this.#container.querySelector('.trip-events__list');
    if (!listElement) {
      const pointListComponent = new PointListView();
      render(pointListComponent, this.#container);
      listElement = pointListComponent.element;
      this.#temporaryListComponent = pointListComponent;
    }

    this.#newPointPresenter = new PointPresenter({
      container: { element: listElement },
      onDataChange: this.#handlePointChange,
      onOpenForm: this.#handleFormOpen,
    });
    this.#newPointPresenter.initNewPoint({
      point: defaultPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onClose: () => this.#handleNewPointFormClose(),
    });
  }

  #handleNewPointFormClose() {
    this.#destroyNewPointPresenter();
    this.#points = [...this.#pointsModel.travelPoints];
    this.#currentFilter = this.#filtersModel.filter;
    this.#filterPoints();
    this.#sortPoints();
    this.#renderBoard();
  }

  #renderInitialLoading() {
    this.#clearBoard();
    this.#loadingComponent = new LoadingView();
    render(this.#loadingComponent, this.#container);
  }

  #handleNewEventButtonClick = () => {
    if (this.#newPointPresenter) {
      return;
    }
    this.#setNewEventButtonDisabled(true);
    this.#pendingNewPoint = true;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  };

}
