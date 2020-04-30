import AbstractComponent from "./abstract-component.js";

const createMostCommentedFilmsContainerTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class MostCommentedFilm extends AbstractComponent {
  getTemplate() {
    return createMostCommentedFilmsContainerTemplate();
  }
}
