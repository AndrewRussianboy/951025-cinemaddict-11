import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (name, className, isActive = true) => {
  return (
    `<button type="button"
    class="film-card__controls-item button film-card__controls-item--${className} ${isActive ? `` : `film-card__controls-item--active`}">${name}
    </button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {comments, description, duration, genre, poster, rating, title, year} = film;

  const addToWatchListButton = createButtonMarkup(`Add to watchlist`, `add-to-watchlist`, film.isWatchList);
  const markAsWatchedButton = createButtonMarkup(`Mark as watched`, `mark-as-watched`, film.isWatched);
  const markAsFavoriteButton = createButtonMarkup(`Mark as favorite`, `favorite`, film.isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${addToWatchListButton}
        ${markAsWatchedButton}
        ${markAsFavoriteButton}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;

  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setFilmTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setFilmCardPosterHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setFilmCardCommentsHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }
}
