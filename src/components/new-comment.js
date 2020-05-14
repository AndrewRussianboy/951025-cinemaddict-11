import AbstractSmartComponent from "../components/abstract-smart-component.js";

const createEmojiMarkup = (name) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
    <label class="film-details__emoji-label" for="emoji-${name}">
      <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createNewCommentMarkup = () => {

  const smileEmoji = createEmojiMarkup(`smile`);
  const sleepingEmoji = createEmojiMarkup(`sleeping`);
  const pukeEmoji = createEmojiMarkup(`puke`);
  const angryEmoji = createEmojiMarkup(`angry`);

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${smileEmoji}
        ${sleepingEmoji}
        ${pukeEmoji}
        ${angryEmoji}
      </div>`
  );
};

export default class NewComment extends AbstractSmartComponent {
  constructor() {
    super();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewCommentMarkup();
  }

  recoveryListeneres() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const emojiContainer = element.querySelector(`.film-details__add-emoji-label`);
    const imgElementForEmoji = document.createElement(`img`);

    [...element.querySelectorAll(`.film-details__emoji-label img`)].forEach((emoji) => {
      emoji.addEventListener(`click`, () => {
        emojiContainer.append(imgElementForEmoji);
        imgElementForEmoji.src = emoji.src;
        imgElementForEmoji.width = `68`;
        imgElementForEmoji.height = `68`;
      });
    });
  }
}
