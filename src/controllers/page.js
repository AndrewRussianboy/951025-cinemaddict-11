import CommentComponent from "../components/comment.js";
import FilmsComponent from "../components/films.js";
import FilmCardComponent from "../components/film-card.js";
import FilmPopupComponent from "../components/film-popup.js";
import MostCommentedFilmsComponent from "../components/most-commented-films.js";
import NewCommentComponent from "../components/new-comment.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import TopFilmsComponent from "../components/top-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

const ESC_KEY = `Escape` || `Esc`;

const renderComments = (filmPopup, comments) => {
  const newCommentComponent = new NewCommentComponent();
  const commentComponent = new CommentComponent(comments);

  const filmDetailsCommentsElement = filmPopup.getElement().querySelector(`.film-details__comments-wrap`);

  render(filmDetailsCommentsElement, commentComponent, RenderPosition.BEFOREEND);
  render(filmDetailsCommentsElement, newCommentComponent, RenderPosition.BEFOREEND);

  return commentComponent;
};

const renderPopup = (film) => {
  const filmPopupComponent = new FilmPopupComponent(film);

  renderComments(filmPopupComponent, film.comments);

  const onPopupClose = () => {
    remove(filmPopupComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === ESC_KEY;

    if (isEscKey) {
      onPopupClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  filmPopupComponent.setClosePopupHandler(() => {
    onPopupClose();
  });

  return filmPopupComponent;
};

const renderFilm = (filmListElement, film) => {

  const filmCardComponent = new FilmCardComponent(film);

  const onFilmCardClick = () => {
    render(filmListElement, renderPopup(film), RenderPosition.BEFOREEND);
  };

  filmCardComponent.setFilmTitleClickHandler(onFilmCardClick);
  filmCardComponent.setFilmCardPosterHandler(onFilmCardClick);
  filmCardComponent.setFilmCardCommentsHandler(onFilmCardClick);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilm(filmListElement, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {

  switch (sortType) {
    case SortType.DATE:
      films = films.slice().sort((a, b) => a.year - b.year);
      break;
    case SortType.RATING:
      films = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    default:
      films = films.slice();
  }

  return films.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._topFilmsComponent = new TopFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const previousFilms = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

        renderFilms(filmsListContainerElement[0], films.slice(previousFilms, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isDataBaseEmpty = films.every((film) => film.isEmpty);

    if (isDataBaseEmpty) {
      render(container, new NoFilmsComponent(), RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(container, this._topFilmsComponent, RenderPosition.BEFOREEND);
    render(container, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._filmsComponent.getElement();
    const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_ON_START;

    films.slice(0, showingFilmsCount)
      .filter((film) => {
        renderFilm(filmsListContainerElement[0], film);
      });

    films.slice(0, TOP_RATED_FILMS)
      .filter((film) => {
        renderFilm(filmsListContainerElement[1], film);
      });

    films.slice(0, MOST_COMMENTED_FILMS)
      .filter((film) => {
        renderFilm(filmsListContainerElement[2], film);
      });

    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {

      [...this._sortComponent.getElement().querySelectorAll(`.sort__button`)].map((element) => element.classList.remove(`sort__button--active`));

      this._sortComponent.getElement().querySelector(`[data-sort-type=${sortType}]`).classList.add(`sort__button--active`);

      showingFilmsCount = SHOWING_FILMS_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListContainerElement[0].innerHTML = ``;

      renderFilms(filmsListContainerElement[0], sortedFilms);

      renderShowMoreButton();
    });
  }
}
