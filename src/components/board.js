import AbstractComponent from "./abstract-component.js";

const createFilmsBoardContainerTemplate = () => {
  return (
    `<section class="films">

    </section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createFilmsBoardContainerTemplate();
  }
}
