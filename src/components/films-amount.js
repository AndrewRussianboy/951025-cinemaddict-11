import AbstractComponent from "./abstract-component.js";

const createFilmAmountTemplate = (amount) => {
  return (
    `<p>${amount} movies inside</p>`
  );
};

export default class FilmAmount extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFilmAmountTemplate(this._amount);
  }
}
