import FilterView from './view/filter-view/filters-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TravelPoints from './model/points-model.js';
import { generateFilter } from './mock/filter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FiltersModel from './model/filters-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

const pointsModel = new TravelPoints();
const filtersModel = new FiltersModel();
const filterPresenter = new FilterPresenter({container: siteFilters, filterModel: filtersModel, pointsModel: pointsModel});

filterPresenter.init();
pointsModel.init();
const boardPresenter = new BoardPresenter({container: siteTripEvents, pointsModel, filtersModel});

boardPresenter.init();

