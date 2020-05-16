import AbstractSmartComponent from "../components/abstract-smart-component.js";
import NewCommentComponent from "../components/new-comment.js";

const createInputMarkup = (name, className, isActive = false) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${className}" name="${className}" ${isActive ? `` : `film-card__controls-item--active`}>
    <label for="${className}" class="film-details__control-label film-details__control-label--${className}">${name}</label>`
  );
};

const createFilmDetailsPopupTemplate = (film) => {
  const {actors, country, description, director, duration, multipleGenres, poster, rating, release, title, writers} = film;

  const addToWatchListButton = createInputMarkup(`Add to watchlist`, `watchlist`, film.isWatchList);
  const markAsWatchedButton = createInputMarkup(`Mark as watched`, `watched`, film.isWatched);
  const markAsFavoriteButton = createInputMarkup(`Mark as favorite`, `favorite`, film.isFavorite);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${release}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${multipleGenres}</span>
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${addToWatchListButton}
            ${markAsWatchedButton}
            ${markAsFavoriteButton}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">

          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closePopupHandler = null;
    this._newCommentComponent = new NewCommentComponent();
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._film);
  }

  getFilmDetailsWrap() {
    return this.getElement().querySelector(`.film-details__comments-wrap`);
  }

  setClosePopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
