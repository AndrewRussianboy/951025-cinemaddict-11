import CommentComponent from "./components/comment.js";
import FilmsComponent from "./components/films.js";
import FilmsAmountComponent from "./components/films-amount.js";
import FilmCardComponent from "./components/film-card.js";
import FilmPopupComponent from "./components/film-popup.js";
import BoardComponent from "./components/board.js";
import MostCommentedFilmsComponent from "./components/most-commented-films.js";
import NavigationComponent from "./components/navigation.js";
import NewCommentComponent from "./components/new-comment.js";
import NoFilmsComponent from "./components/no-films.js";
import ProfileComponent from "./components/profile.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import SortComponent from "./components/sort.js";
import TopFilmsComponent from "./components/top-films.js";
import {generateFilms} from "./mock/film.js";
import {generateNavigationItems} from "./mock/navigation.js";
import {render, RenderPosition, getRandomInt} from "./utils.js";

const FILMS_COUNT = 20;
const FILMS_RENDERED_ON_START = 5;
const FILMS_RENDERED_NEXT = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;
const USER_NAME_MOCK = `Movie Buff`;
const ESC_KEY = `Escape` || `Esc`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const getPossibilityFilmsZeroValue = () => {
  if (getRandomInt(0, 2) === 0) {
    return generateFilms(0);
  }
  return generateFilms(FILMS_COUNT);
};

const films = getPossibilityFilmsZeroValue();
const navigationItems = generateNavigationItems(films);

const renderComments = (filmPopup, comments) => {
  const newCommentComponent = new NewCommentComponent();
  const commentComponent = new CommentComponent(comments);

  const filmDetailsCommentsElement = filmPopup.getElement().querySelector(`.film-details__comments-wrap`);

  render(filmDetailsCommentsElement, commentComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmDetailsCommentsElement, newCommentComponent.getElement(), RenderPosition.BEFOREEND);

  return commentComponent;
};

const renderPopup = (film) => {
  const filmPopupComponent = new FilmPopupComponent(film);

  renderComments(filmPopupComponent, film.commentsCount);

  const onPopupClose = () => {
    filmPopupComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === ESC_KEY;

    if (isEscKey) {
      onPopupClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  const closeFilmDetailsElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  closeFilmDetailsElement.addEventListener(`click`, () => {
    onPopupClose();
  });

  return filmPopupComponent;
};

const renderFilm = (filmListElement, film) => {

  const filmCardComponent = new FilmCardComponent(film);

  const onFilmCardClick = () => {
    render(filmListElement, renderPopup(film).getElement(), RenderPosition.BEFOREEND);
  };

  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  filmTitle.addEventListener(`click`, onFilmCardClick);
  filmCardPoster.addEventListener(`click`, onFilmCardClick);
  filmCardComments.addEventListener(`click`, onFilmCardClick);

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent) => {
  const isDataBaseEmpty = films.every((film) => film.isEmpty);

  if (isDataBaseEmpty) {
    render(boardComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new FilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TopFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new MostCommentedFilmsComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsListElement = document.querySelector(`.films-list`);
  render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);

  let filmsShowedOnStart = FILMS_RENDERED_ON_START;

  films.slice(0, filmsShowedOnStart)
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

  const showMoreElement = document.querySelector(`.films-list__show-more`);

  showMoreElement.addEventListener(`click`, () => {
    const previousFilms = filmsShowedOnStart;
    filmsShowedOnStart = filmsShowedOnStart + FILMS_RENDERED_NEXT;

    films.slice(previousFilms, filmsShowedOnStart)
      .forEach((film) => {
        renderFilm(filmsListContainerElement[0], film);
      });

    if (filmsShowedOnStart >= films.length) {
      showMoreElement.remove();
    }
  });
};

render(siteHeaderElement, new ProfileComponent(USER_NAME_MOCK).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(navigationItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, films);

const footerStatisticElement = document.querySelector(`.footer__statistics`);

render(footerStatisticElement, new FilmsAmountComponent(FILMS_COUNT).getElement(), RenderPosition.BEFOREEND);
