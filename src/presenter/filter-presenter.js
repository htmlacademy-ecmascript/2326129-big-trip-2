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
  #isLoadError = false;

  constructor ({container, filterModel, pointsModel}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    return Object.values(FilterType).map((name) => {
      const count = filter[name](this.#pointsModel.travelPoints).length;

      return {
        type: name,
        count,
        isChecked: name === this.#filterModel.filter,
        isDisabled: this.#isLoadError || (name !== FilterType.EVERYTHING && count === 0),
      };
    });
  }

  init() {
    const filters = this.filters;
    const activeFilter = filters.find((item) => item.type === this.#filterModel.filter);

    if (activeFilter?.isDisabled) {
      this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      return;
    }
    const newFilterComponent = new FilterView({
      filters,
      onFilterChange: this.#handleFilterChange
    });

    if (this.#isFirstRender) {
      render(newFilterComponent, this.#container);
      this.#filterComponent = newFilterComponent;
    } else {
      replace(newFilterComponent, this.#filterComponent);
      remove(this.#filterComponent);
      this.#filterComponent = newFilterComponent;
    }
    const currentFilterType = this.#filterModel.filter;
    const radio = this.#container.querySelector(`#filter-${currentFilterType}`);
    if (radio) {
      radio.checked = true;
    }

    this.#isFirstRender = false;
  }

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  #handleModelChange = (updateType) => {
    this.#isLoadError = updateType === UpdateType.ERROR;
    this.init();
  };
}
