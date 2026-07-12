import { SORT_LABELS } from '../../const';

export function createSortingTemplate(sortItems, currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItems.map(({ type, isEnabled }) => createSortingItemTemplate(type, isEnabled, type === currentSortType)).join('')}
          </form>`;
}

function createSortingItemTemplate(type, isEnabled, isChecked) {
  const label = SORT_LABELS[type] || type;
  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-${type}"
                   data-sort-type="${type}"
                   class="trip-sort__input  visually-hidden"
                   type="radio"
                   name="trip-sort"
                   value="sort-${type}"
                   ${isChecked ? 'checked' : ''}
                   ${isEnabled ? '' : 'disabled'}>
            <label class="trip-sort__btn" for="sort-${type}">${label}</label>
          </div>`;
}
