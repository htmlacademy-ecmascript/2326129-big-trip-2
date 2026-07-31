import { FilterType, UpdateType } from '../const';
import { filter } from '../utils/filter';
import FilterView from '../view/filter-view/filters-view';
import { remove, replace, render } from '../framework/render';

export default class FilterPresenter {
  #filterModel = null;
  #pointsModel = null;
  #container = null;
  #filterComponent = null;

  constructor ({container, filterModel, pointsModel}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    return Object.values(FilterType).map((name) => ({
      name: name,
      count: filter(name, this.#pointsModel.travelPoints).length,
      isChecked: name === this.#filterModel.filter
    }));
  }

  init() {
    const previousFilterComponent = this.#filterComponent;
    const newFilterComponent = new FilterView({'filters': this.filters, onFilterChange: this.#handleFilterChange});
    if (previousFilterComponent === null) {
      render(newFilterComponent, this.#container);
    } else {
      replace(newFilterComponent, previousFilterComponent);
      remove(previousFilterComponent);
    }
  }


  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  #handleModelChange = () => this.init();
}
