import FilmsAmountComponent from "./components/films-amount.js";
import BoardComponent from "./components/board.js";
import NavigationComponent from "./components/navigation.js";
import PageController from "./controllers/page.js";
import ProfileComponent from "./components/profile.js";
import {generateFilms} from "./mock/film.js";
import {generateNavigationItems} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import {getRandomInt} from "./utils/common.js";

const FILMS_COUNT = 20;
const USER_NAME_MOCK = `Movie Buff`;

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

render(siteHeaderElement, new ProfileComponent(USER_NAME_MOCK), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(navigationItems), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const pageController = new PageController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

pageController.render(films);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

render(footerStatisticElement, new FilmsAmountComponent(films.length), RenderPosition.BEFOREEND);
