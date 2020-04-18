import {formatTime} from "../utils.js";

export const createCommentMarkup = (comment) => {

  const {emoji, commentText, name, dueDate} = comment;

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

export const createCommentsListMarkup = (comments) => {

  const commentsMarkup = comments.map((item) =>
    createCommentMarkup(item)).join(`\n`);

  return (
    `<ul class="film-details__comments-list">
      ${commentsMarkup}
    </ul>`
  );
};
