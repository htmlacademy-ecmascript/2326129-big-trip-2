import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';
import AddNewPointView from '../view/add-new-point/add-new-point-view';

const POINTS_AMOUNT = 3;

export default class BoardPresenter {
  sortComponent = new SortingView();
  pointListComponent = new PointListView();

  constructor ({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.pointListComponent, this.container);
    render(new AddNewPointView(), this.pointListComponent.getElement());
    render(new EditPointView(), this.pointListComponent.getElement());

    for(let i = 0; i < POINTS_AMOUNT; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }

  }

}
