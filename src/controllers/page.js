import FilmsComponent from "../components/films.js";
import MostCommentedFilmsComponent from "../components/most-commented-films.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import TopFilmsComponent from "../components/top-films.js";
import MovieController from "../controllers/movie.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {getFilmsOnStart} from "../utils/common.js";

const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {

    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType) => {

  switch (sortType) {
    case SortType.DATE:
      return films.slice().sort((a, b) => a.year - b.year);
    case SortType.RATING:
      return films.slice().sort((a, b) => b.rating - a.rating);
    default:
      return films.slice();
  }
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmControllers = [];
    this._showedTopFilmControllers = [];
    this._showedMostCommentedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_ON_START;

    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._topFilmsComponent = new TopFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {

    this._films = films;

    const container = this._container.getElement();
    const isDataBaseEmpty = this._films.every((film) => film.isEmpty);

    if (isDataBaseEmpty) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(container, this._topFilmsComponent, RenderPosition.BEFOREEND);
    render(container, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);


    const newFilms = renderFilms(filmsListContainerElement[0], this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    const topRatedFilms = renderFilms(filmsListContainerElement[1], films.slice(0, TOP_RATED_FILMS), this._onDataChange, this._onViewChange);
    this._showedTopFilmControllers = this._showedTopFilmControllers.concat(topRatedFilms);
    const mostCommentedFilms = renderFilms(filmsListContainerElement[2], films.slice(0, MOST_COMMENTED_FILMS), this._onDataChange, this._onViewChange);
    this._showedMostCommentedFilmControllers = this._showedMostCommentedFilmControllers.concat(mostCommentedFilms);
    /* renderFilms(filmsListContainerElement[1], films.slice(0, TOP_RATED_FILMS), this._onDataChange, this._onViewChange); */
    /* renderFilms(filmsListContainerElement[2], films.slice(0, MOST_COMMENTED_FILMS), this._onDataChange, this._onViewChange); */

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmsListElement = this._filmsComponent.getElement();
    const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);

    render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const previousFilms = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

      renderFilms(filmsListContainerElement[0], this._films.slice(previousFilms, this._showingFilmsCount), this._onDataChange, this._onViewChange);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onSortTypeChange(sortType) {
    [...this._sortComponent.getElement().querySelectorAll(`.sort__button`)].map((element) => element.classList.remove(`sort__button--active`));

    this._sortComponent.getElement().querySelector(`[data-sort-type=${sortType}]`).classList.add(`sort__button--active`);

    this._showingFilmsCount = SHOWING_FILMS_BY_BUTTON;

    const sortedFilms = getSortedFilms(this._films, sortType);

    const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);
    filmsListContainerElement[0].innerHTML = ``;

    renderFilms(filmsListContainerElement[0], getFilmsOnStart(sortedFilms, 0, this._showingFilmsCount), this._onDataChange, this._onViewChange);

    this._renderShowMoreButton();
  }
}
