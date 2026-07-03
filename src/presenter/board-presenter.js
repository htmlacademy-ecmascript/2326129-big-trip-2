import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../render.js';
import { replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';
// import { getDefaultPoint } from '../const';

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

    // this.#renderView(EditPointView, {point: getDefaultPoint(), destinations, offers});
    // this.#renderView(EditPointView, {point: points[0], destinations, offers});
    render(new EditPointView({point: points[0], destinations, offers}), this.#pointListComponent.element);


    for(let i = 1; i < points.length; i++){
      this.#renderView({point: points[i], destinations: destinations, offers: offers});
    }
  }

  #renderView({task}){
    // const component = new Component(...args);
    // const container = this.#pointListComponent.element;
    // render(component, container);
    const escKeydownHandler = (evt) => {
      if(evt.key === 'Escape'){
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const pointComponent = new PointView({
      task,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeydownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      task,
      onFormSubmit: () => {
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
