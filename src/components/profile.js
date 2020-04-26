import {createElement} from "../utils.js";

const createHeaderProfileTemplate = (name) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${name}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(name) {
    this._name = name;

    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._name);
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
