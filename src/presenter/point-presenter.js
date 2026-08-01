import { remove, render, replace } from '../framework/render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';
import { UserActions, UpdateType } from '../const';

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
    // теперь this.#offers точно не undefined, если был определён ранее

    if (!this.#isEditMode) {
      const newPointComponent = new PointView({
        point: this.#point,
        destinations: this.#destinations,
        offers: this.#offers,
        onRollupClick: () => this.#replacePointToForm(),
        onClickFavoriteButton: (updatedPoint) => {
          if (this.#onFavoriteClick) {
            this.#onFavoriteClick(UserActions.UPDATE_EVENT, UpdateType.PATCH, updatedPoint);
          }
        }
      });
      replace(newPointComponent, this.#pointComponent);
      this.#pointComponent = newPointComponent;
    }
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
          this.#onFavoriteClick(UserActions.UPDATE_EVENT, UpdateType.PATCH, updatedPoint);
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
    // Уведомляем доску об открытии формы
    if (this.#onOpenForm) {
      this.#onOpenForm(this.#point.id);
    }

    // 1. Удаляем старый компонент формы, если он существует
    if (this.#pointEditComponent) {
      remove(this.#pointEditComponent);
      this.#pointEditComponent = null;
    }

    // 2. Создаём новый компонент с чистыми исходными данными
    this.#pointEditComponent = new EditPointView({
      point: this.#point,// исходный объект, не менялся
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: () => this.#replaceFormToPoint(),
      onRollupClick: () => this.#replaceFormToPoint()
    });

    // 3. Заменяем отображение точки на новую форму
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEditMode = true;
  }

  #replaceFormToPoint() {
    this.#pointEditComponent.reset();
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    // Возвращаем отображение точки
    replace(this.#pointComponent, this.#pointEditComponent);

    // Удаляем компонент формы, стирая все изменения в полях
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    this.#isEditMode = false;
  }

  reset() {
    if (this.#isEditMode) {
      this.#replaceFormToPoint(); // закроет форму и удалит её
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

