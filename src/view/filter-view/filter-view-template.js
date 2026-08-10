function createFilterItemTemplate(filter) {
  const {type, isChecked, isDisabled} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
        value="${type}">
      <label class="trip-filters__filter-label" for="filter-${type}">${type.toUpperCase()}</label>
    </div>
    `);
}

export function createFilterTemplate(filterPoints) {
  const filterPointsTemplate = filterPoints.map((filter) => createFilterItemTemplate(filter)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterPointsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
