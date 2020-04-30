import CommentComponent from "../components/comment.js";
import FilmsComponent from "../components/films.js";
import FilmCardComponent from "../components/film-card.js";
import FilmPopupComponent from "../components/film-popup.js";
import MostCommentedFilmsComponent from "../components/most-commented-films.js";
import NewCommentComponent from "../components/new-comment.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
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

const renderBoard = (boardComponent, films) => {
  const isDataBaseEmpty = films.every((film) => film.isEmpty);

  if (isDataBaseEmpty) {
    render(boardComponent.getElement(), new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TopFilmsComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new MostCommentedFilmsComponent(), RenderPosition.BEFOREEND);

  const filmsListElement = document.querySelector(`.films-list`);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

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

  showMoreButtonComponent.setClickHandler(() => {
    const previousFilms = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

    films.slice(previousFilms, showingFilmsCount)
      .forEach((film) => {
        renderFilm(filmsListContainerElement[0], film);
      });

    if (showingFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    renderBoard(this._container, films);
  }
}
