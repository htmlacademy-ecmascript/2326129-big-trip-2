import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersModel from './model/filters-model.js';
import PointsApiService from './points-api-service.js';
import TravelPointsModel from './model/points-model.js';

const AUTHORIZATION = 'Basic mikka12345auth';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripMain = siteHeaderElement.querySelector('.trip-main');
const siteFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const travelPointsModel = new TravelPointsModel({ pointsApiService });
const filtersModel = new FiltersModel();

const filterPresenter = new FilterPresenter({
  container: siteFilters,
  filterModel: filtersModel,
  pointsModel: travelPointsModel,
});

const tripInfoPresenter = new TripInfoPresenter({
  container: siteTripMain,
  pointsModel: travelPointsModel,
});

const boardPresenter = new BoardPresenter({
  container: siteTripEvents,
  pointsModel: travelPointsModel,
  filtersModel,
});

filterPresenter.init();
tripInfoPresenter.init();
boardPresenter.init();
travelPointsModel.init();
