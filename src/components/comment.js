import {formatTime, createElement} from "../utils.js";

const createCommentMarkup = (comment) => {

  const {commentText, dueDate, emoji, name} = comment;

  const commentDate = `${dueDate.getFullYear()}/${dueDate.getMonth()}/${dueDate.getDate()}`;
  const commentTime = formatTime(dueDate);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
          <span class="film-details__comment-day">${commentDate} ${commentTime}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsListMarkup = (comments) => {

  const commentsMarkup = comments.map((item) =>
    createCommentMarkup(item)).join(`\n`);

  return (
    `
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
      ${commentsMarkup}
    </ul>`
  );
};

export default class Comment {
  constructor(comments) {
    this._comments = comments;

    this._element = null;
  }

  getTemplate() {
    return createCommentsListMarkup(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
