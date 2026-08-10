import BoardPresenter from './presenter/board-presenter.js';
import TravelPoints from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FiltersModel from './model/filters-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic mikka12345auth';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const travelPointsModel = new TravelPoints({ pointsApiService });
const filtersModel = new FiltersModel();

const filterPresenter = new FilterPresenter({
  container: siteFilters,
  filterModel: filtersModel,
  pointsModel: travelPointsModel,
});

const boardPresenter = new BoardPresenter({
  container: siteTripEvents,
  pointsModel: travelPointsModel,
  filtersModel,
});

filterPresenter.init();
boardPresenter.init();
travelPointsModel.init();
