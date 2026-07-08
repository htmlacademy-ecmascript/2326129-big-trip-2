function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
        value="${type}">
      <label class="trip-filters__filter-label" for="filter-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>
    `);
}

export function createFilterTemplate(filterPoints) {
  const filterPointsTemplate = filterPoints.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterPointsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
