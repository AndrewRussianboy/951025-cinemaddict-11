import {createElement} from "../utils.js";

const createNavigatonItemMarkup = (item) => {
  const {count, link, name} = item;

  return `<a href="#${link}" class="main-navigation__item main-navigation__item}">${name} <span class="main-navigation__item-count">${count}</span></a></a>`;
};

const createSiteMainNavigationTemplate = (items) => {
  const navigationItemsMarkup = items.map((item) => createNavigatonItemMarkup(item))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${navigationItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return createSiteMainNavigationTemplate(this._items);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
