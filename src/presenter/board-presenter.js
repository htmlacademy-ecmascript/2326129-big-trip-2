import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../render.js';
import { replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

export default class BoardPresenter {
  #sortComponent = new SortingView();
  #pointListComponent = new PointListView();
  #container = null;
  #pointsModel = null;

  constructor ({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    const points = [...this.#pointsModel.travelPoints];
    const offers = [...this.#pointsModel.offers];
    const destinations = [...this.#pointsModel.destinations];

    render(this.#sortComponent, this.#container);
    render(this.#pointListComponent, this.#container);

    points.forEach((point) => {
      this.#renderPoint({point: point, destinations: destinations, offers: offers});
    });
  }

  #renderPoint({point, destinations, offers}){
    const escKeydownHandler = (evt) => {
      if(evt.key === 'Escape'){
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeydownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToForm () {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint () {
      replace(pointComponent, pointEditComponent);
    }

    render (pointComponent, this.#pointListComponent.element);
  }
}
