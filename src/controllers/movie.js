import CommentComponent from "../components/comment.js";
import FilmCardComponent from "../components/film-card.js";
import FilmPopupComponent from "../components/film-popup.js";
import NewCommentComponent from "../components/new-comment.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  POPUPOPENED: `popupopened`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._ESC_KEY = `Escape` || `Esc`;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._newCommentComponent = null;
    this._commentComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _renderComments(filmPopup, comments) {
    this._newCommentComponent = new NewCommentComponent();
    this._commentComponent = new CommentComponent(comments);

    render(filmPopup.getFilmDetailsWrap(), this._commentComponent, RenderPosition.BEFOREEND);
    render(filmPopup.getFilmDetailsWrap(), this._newCommentComponent, RenderPosition.BEFOREEND);

    return this._commentComponent;
  }

  _renderPopup(film) {
    this._filmPopupComponent = new FilmPopupComponent(film);

    this._renderComments(this._filmPopupComponent, film.comments);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._filmPopupComponent.setClosePopupHandler(() => {
      this._onPopupClose();
    });

    this._filmPopupComponent.setAddToWatchListButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchList: !film.isWatchList,
      }));
    });

    this._filmPopupComponent.setMarkAsWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmPopupComponent.setMarkAsFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._mode = Mode.POPUPOPENED;
    return this._filmPopupComponent;
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);

    const onFilmCardClick = () => {
      this._onViewChange();
      render(this._container, this._renderPopup(film), RenderPosition.BEFOREEND);
    };

    this._filmCardComponent.setAddToWatchListButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchList: !film.isWatchList,
      }));
    });

    this._filmCardComponent.setMarkAsWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setMarkAsFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmCardComponent.setFilmTitleClickHandler(onFilmCardClick);
    this._filmCardComponent.setFilmCardPosterHandler(onFilmCardClick);
    this._filmCardComponent.setFilmCardCommentsHandler(onFilmCardClick);
    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmPopupComponent);
    }
  }

  _onPopupClose() {
    remove(this._filmPopupComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === this._ESC_KEY;

    if (isEscKey) {
      this._onPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
