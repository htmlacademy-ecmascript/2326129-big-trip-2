import PointListView from '../view/point-list-view/point-list-view';
import { render, replace } from '../framework/render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

export default class PointPresenter {

  #pointListComponent = new PointListView();


  init() {
    this.#renderView();
  }

  #renderView({point, destinations, offers}){
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
