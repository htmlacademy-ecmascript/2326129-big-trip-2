import FilterView from './view/filter-view/filters-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import Points from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

const pointsModel = new Points();
pointsModel.init();
const boardPresenter = new BoardPresenter({container: siteTripEvents, pointsModel});

const filters = generateFilter(pointsModel.travelPoints);
const filterView = new FilterView({filters});

render(filterView, siteFilters);

boardPresenter.init();
