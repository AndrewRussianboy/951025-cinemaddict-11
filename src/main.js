import {createHeaderProfileTemplate} from "./components/profile.js";
import {createSiteMainNavigationTemplate} from "./components/navigation.js";
import {creatSiteSortTemplate} from "./components/sorting.js";
import {createFilmsListContainerTemplate} from "./components/films.js";
import {createLoadMoreButtonTemplate} from "./components/button.js";
import {createExtraFilmsContainerTemplate} from "./components/extra-films.js";
import {createMostCommentedFilmsContainerTemplate} from "./components/commented-films.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmDetailsPopupTemplate} from "./components/films-details";

const FILMS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMainNavigationTemplate(), `beforeend`);
render(siteMainElement, creatSiteSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListContainerTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = siteFilmsElement.querySelector(`.films-list`);


render(filmsListElement, createLoadMoreButtonTemplate(), `beforeend`);

render(siteFilmsElement, createExtraFilmsContainerTemplate(), `beforeend`);
render(siteFilmsElement, createMostCommentedFilmsContainerTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainerElement[0], createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < 2; i++) {
  render(filmsListContainerElement[1], createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < 2; i++) {
  render(filmsListContainerElement[2], createFilmCardTemplate(), `beforeend`);
}

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsPopupTemplate(), `afterEnd`);
