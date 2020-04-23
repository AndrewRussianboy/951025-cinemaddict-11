import {createHeaderProfileTemplate} from "./components/profile.js";
import {createSiteMainNavigationTemplate} from "./components/navigation.js";
import {creatSiteSortTemplate} from "./components/sorting.js";
import {createFilmsListContainerTemplate} from "./components/films.js";
import {createLoadMoreButtonTemplate} from "./components/button.js";
import {createExtraFilmsContainerTemplate} from "./components/extra-films.js";
import {createMostCommentedFilmsContainerTemplate} from "./components/commented-films.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {generateFilms} from "./mock/film.js";
import {generateFilm} from "./mock/film.js";
import {createFilmDetailsPopupTemplate} from "./components/film-details.js";
import {generateNavigationItems} from "./mock/navigation.js";
import {createNewCommentMarkup} from "./components/new-comment.js";
import {createCommentsListMarkup} from "./components/comments.js";
import {generateComments} from "./mock/comment.js";
import {createFilmAmountTemplate} from "./components/film-amount.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_ON_START = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;
const USER_NAME_MOCK = `Movie Buff`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);
const navigationItems = generateNavigationItems(films);
const comments = generateComments(generateFilm().comments);

render(siteHeaderElement, createHeaderProfileTemplate(USER_NAME_MOCK), `beforeend`);
render(siteMainElement, createSiteMainNavigationTemplate(navigationItems), `beforeend`);
render(siteMainElement, creatSiteSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListContainerTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = siteFilmsElement.querySelector(`.films-list`);

render(filmsListElement, createLoadMoreButtonTemplate(), `beforeend`);

render(siteFilmsElement, createExtraFilmsContainerTemplate(), `beforeend`);
render(siteFilmsElement, createMostCommentedFilmsContainerTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);

let showingFilmsCountOnStart = FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCountOnStart)
  .filter((film) => {
    render(filmsListContainerElement[0], createFilmCardTemplate(film), `beforeend`);
  });

films.slice(0, TOP_RATED_FILMS)
  .filter((film) => {
    render(filmsListContainerElement[1], createFilmCardTemplate(film), `beforeend`);
  });

films.slice(0, MOST_COMMENTED_FILMS)
  .filter((film) => {
    render(filmsListContainerElement[2], createFilmCardTemplate(film), `beforeend`);
  });

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsPopupTemplate(films[0]), `afterEnd`);

const closeFilmDetailsElement = document.querySelector(`.film-details__close-btn`);
const filmDetails = document.querySelector(`.film-details`);

closeFilmDetailsElement.addEventListener(`click`, () => {
  filmDetails.remove();
});

const filmDetailsCommentsElement = document.querySelector(`.film-details__comments-wrap`);

render(filmDetailsCommentsElement, createCommentsListMarkup(comments), `beforeend`);
render(filmDetailsCommentsElement, createNewCommentMarkup(), `beforeend`);

const showMoreElement = document.querySelector(`.films-list__show-more`);

showMoreElement.addEventListener(`click`, () => {
  const previousFilmsCount = showingFilmsCountOnStart;
  showingFilmsCountOnStart = showingFilmsCountOnStart + FILMS_COUNT_ON_START;

  films.slice(previousFilmsCount, showingFilmsCountOnStart)
    .forEach((film) => {
      render(filmsListContainerElement[0], createFilmCardTemplate(film), `beforeend`);
    });

  if (showingFilmsCountOnStart >= films.length) {
    showMoreElement.remove();
  }
});

const footerStatisticElement = document.querySelector(`.footer__statistics`);

render(footerStatisticElement, createFilmAmountTemplate(FILMS_COUNT), `beforeend`);
