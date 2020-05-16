import AbstractSmartComponent from "../components/abstract-smart-component.js";

const emojiArray = [`smile`, `sleeping`, `puke`, `angry`];

const createEmojiMarkup = (name, chosenEmojiName) => {
  return (
    `<input class="visually-hidden" class="film-details__emoji-item" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${(name === chosenEmojiName) ? `checked` : ``}}>
    <label class="film-details__emoji-label" for="emoji-${name}">
      <img data-action="${name}" src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createNewCommentMarkup = (name) => {

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${name ? `<img src="./images/emoji/${name}.png" width="68" height="68" alt="emoji">` : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
      ${emojiArray.map((emojiItem) => {
      return createEmojiMarkup(emojiItem, name);
    }).join(``)}

      </div>`
  );
};

export default class NewComment extends AbstractSmartComponent {
  constructor() {
    super();
    this._subscribeOnEvents();
    this._name = ``;
  }

  getTemplate() {
    return createNewCommentMarkup(this._name);
  }

  recoveryListeneres() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      // eslint-disable-next-line consistent-return
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName !== `IMG`) {
          return false;
        }
        this._name = evt.target.dataset.action;

        this.rerender();
      });
  }
}
