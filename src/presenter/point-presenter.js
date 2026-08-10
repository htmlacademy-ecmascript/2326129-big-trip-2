import { render, replace, remove, RenderPosition } from '../framework/render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';
import { UserActions, UpdateType } from '../const';

export default class PointPresenter {
  #container = null;
  #onDataChange = null;
  #onOpenForm = null;
  #onClose = null;
  #point = null;
  #destinations = [];
  #offers = [];
  #pointComponent = null;
  #pointEditComponent = null;
  #isEditMode = false;
  #isNewPoint = false;

  constructor({ container, onDataChange, onOpenForm }) {
    this.#container = container;
    this.#onDataChange = onDataChange;
    this.#onOpenForm = onOpenForm;
  }

  init({ point, destinations, offers }) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = false;
    this.#renderView();
  }

  initNewPoint({ point, destinations, offers, onClose }) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onClose = onClose;
    this.#isNewPoint = true;

    this.#pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormSubmit: this.#handleNewPointSubmit,
      onRollupClick: this.#handleNewPointClose,
      onDeleteClick: this.#handleNewPointClose,
    });

    render(this.#pointEditComponent, this.#container.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEditMode = true;
  }

  updateData({ point, destinations, offers } = {}) {
    if (point !== undefined) {
      this.#point = point;
    }
    if (destinations !== undefined) {
      this.#destinations = destinations;
    }
    if (offers !== undefined) {
      this.#offers = offers;
    }

    if (!this.#isEditMode && this.#point) {
      const newPointComponent = new PointView({
        point: this.#point,
        destinations: this.#destinations,
        offers: this.#offers,
        onRollupClick: () => this.#replacePointToForm(),
        onClickFavoriteButton: (updatedPoint) => {
          this.#onDataChange?.(UserActions.UPDATE_EVENT, UpdateType.PATCH, updatedPoint);
        },
      });
      replace(newPointComponent, this.#pointComponent);
      this.#pointComponent = newPointComponent;
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    if (this.#pointEditComponent) {
      remove(this.#pointEditComponent);
      this.#pointEditComponent = null;
    }
    if (this.#pointComponent) {
      remove(this.#pointComponent);
      this.#pointComponent = null;
    }
    this.#isEditMode = false;
    this.#isNewPoint = false;
  }

  #renderView() {
    if (!this.#point) {
      return;
    }

    const point = this.#point;
    const destinations = this.#destinations;
    const offers = this.#offers;

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onRollupClick: () => this.#replacePointToForm(),
      onClickFavoriteButton: (updatedPoint) => {
        this.#onDataChange?.(UserActions.UPDATE_EVENT, UpdateType.PATCH, updatedPoint);
      },
    });

    const pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormSubmit: this.#handleEditPointSubmit,
      onRollupClick: () => this.#replaceFormToPoint(),
      onDeleteClick: this.#handleDeleteClick,
    });

    if (this.#pointComponent && this.#pointEditComponent) {
      if (this.#isEditMode) {
        replace(pointEditComponent, this.#pointEditComponent);
      } else {
        replace(pointComponent, this.#pointComponent);
      }
      this.#pointComponent = pointComponent;
      this.#pointEditComponent = pointEditComponent;
    } else {
      this.#pointComponent = pointComponent;
      this.#pointEditComponent = pointEditComponent;
      render(pointComponent, this.#container.element);
    }
  }

  #replacePointToForm() {
    if (this.#onOpenForm) {
      this.#onOpenForm(this.#point.id);
    }

    if (this.#pointEditComponent) {
      remove(this.#pointEditComponent);
      this.#pointEditComponent = null;
    }

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleEditPointSubmit,
      onRollupClick: () => this.#replaceFormToPoint(),
      onDeleteClick: this.#handleDeleteClick,
    });

    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEditMode = true;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    this.#isEditMode = false;
  }

  #handleEditPointSubmit = async (updatedPoint) => {
    await this.#onDataChange?.(UserActions.UPDATE_EVENT, UpdateType.MINOR, updatedPoint);
  };

  #handleDeleteClick = async () => {
    await this.#onDataChange?.(UserActions.DELETE_EVENT, UpdateType.MINOR, this.#point);
  };

  #handleNewPointSubmit = async (updatedPoint) => {
    await this.#onDataChange?.(UserActions.ADD_EVENT, UpdateType.MINOR, updatedPoint);
  };

  #handleNewPointClose = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#onClose?.();
  };

  reset() {
    if (this.#isEditMode && !this.#isNewPoint) {
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      if (this.#isNewPoint) {
        this.#handleNewPointClose();
        return;
      }

      if (this.#isEditMode) {
        this.#replaceFormToPoint();
      }
    }
  };
}
