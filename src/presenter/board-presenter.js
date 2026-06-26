import PointListView from '../view/point-list-view/point-list-view';
import SortingView from '../view/sorting-view/sorting-view';
import { render } from '../render';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';
// import AddNewPointView from '../view/add-new-point/add-new-point-view';
import { getDefaultPoint } from '../const';

export default class BoardPresenter {
  sortComponent = new SortingView();
  pointListComponent = new PointListView();

  constructor ({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    const points = [...this.pointsModel.getPoints()];
    const offers = [...this.pointsModel.getOffers()];
    const destinations = [...this.pointsModel.getDestinations()];

    render(this.sortComponent, this.container);
    render(this.pointListComponent, this.container);

    render(new EditPointView({point: getDefaultPoint(), destinations, offers}), this.pointListComponent.getElement());
    render(new EditPointView({point: points[0], destinations, offers}), this.pointListComponent.getElement());

    for(const point of points){
      render(new PointView(point, destinations, offers), this.pointListComponent.getElement());
    }
  }
}
