import FilterView from './view/filter-view/filters-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilters = siteHeaderElement.querySelector('.trip-controls__filters');

const siteTripEvents = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: siteTripEvents});

render(new FilterView(), siteFilters);

boardPresenter.init();

