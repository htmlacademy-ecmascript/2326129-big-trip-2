import { FilterType, UpdateType } from '../const';
import { filter } from '../utils/filter';
import FilterView from '../view/filter-view/filters-view';
import { remove, replace, render } from '../framework/render';

export default class FilterPresenter {
  #filterModel = null;
  #pointsModel = null;
  #container = null;
  #filterComponent = null;
  #isFirstRender = true;

  constructor ({container, filterModel, pointsModel}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    return Object.values(FilterType).map((name) => ({
      type: name,
      count: filter[name](this.#pointsModel.travelPoints).length,
      isChecked: name === this.#filterModel.filter
    }));
  }

  init() {
    this.#filterComponent = new FilterView({'filters': this.filters, onFilterChange: this.#handleFilterChange});
    if (this.#isFirstRender) {
      render(this.#filterComponent, this.#container);
    } else {
      const newFilterComponent = new FilterView({'filters': this.filters, onFilterChange: this.#handleFilterChange});
      replace(newFilterComponent, this.#filterComponent);
      remove(this.#filterComponent);
    }
    this.#isFirstRender = false;
  }


  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  #handleModelChange = () => this.init();
}
