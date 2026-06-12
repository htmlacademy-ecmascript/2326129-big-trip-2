import FilterView from './view/filters-view';
import { render } from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilters = siteHeaderElement.querySelector('trip-controls__filters');

render(new FilterView(), siteFilters);
