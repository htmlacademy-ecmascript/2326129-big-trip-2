import { remove, render, replace } from '../framework/render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

export default class PointPresenter {
  #container = null;
  #onFavoriteClick = null;
  #onOpenForm = null;

  #point = null;
  #destinations = [];
  #offers = [];
  #pointComponent = null;
  #pointEditComponent = null;
  #isEditMode = false;

  constructor({ container, onFavoriteClick, onOpenForm }) {
    this.#container = container;
    this.#onFavoriteClick = onFavoriteClick;
    this.#onOpenForm = onOpenForm;
  }

  init({ point, destinations, offers }) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#renderView();
  }

  #renderView() {
    const point = this.#point;
    const destinations = this.#destinations;
    const offers = this.#offers;

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onRollupClick: () => this.#replacePointToForm(),
      onClickFavoriteButton: (updatedPoint) => {
        if(this.#onFavoriteClick){
          this.#onFavoriteClick(updatedPoint);
        }
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormSubmit: () => this.#replaceFormToPoint(),
      onRollupClick: () => this.#replaceFormToPoint()
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
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEditMode = true;
  }

  #replaceFormToPoint() {
    this.#pointEditComponent.reset();
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isEditMode = false;
  }

  reset() {
    if (this.#isEditMode) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset();
      this.#replaceFormToPoint();
    }
  };
}

