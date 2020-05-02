import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const sortItems = {
  [SortType.DEFAULT]: `Sort by default`,
  [SortType.DATE]: `Sort by date`,
  [SortType.RATING]: `Sort by rating`,
};

const createSortItemMarkup = (currentSortType) => {
  return Object.keys(sortItems).map((sortType) => {
    return (
      `<li><a href="#" data-sort-type="${sortType}" class="sort__button ${currentSortType === sortType ? `sort__button--active` : ``}">${sortItems[sortType]}</a></li>`
    );
  }).join(``);
};

const createSiteSortTemplate = (currentSortType) => {
  return (
    `<ul class="sort">${createSortItemMarkup(currentSortType)}</ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSiteSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
