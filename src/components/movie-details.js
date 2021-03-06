import AbstractSmartComponent from "./abstract-smart-component";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';
import {encode} from "he";

momentDurationFormatSetup(moment);

const createMovieDetailsTemplate = (movieData, commentData) => {
  const {
    image,
    age,
    title,
    originalTitle,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description,
    inWatchlist,
    watched,
    favorite
  } = movieData;
  const moviePoster = {
    image,
    age
  };
  const movieInfo = {
    title,
    originalTitle,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            ${createMovieDetailsPosterTemplate(moviePoster)}
            ${createFilmDetailsInfo(movieInfo)}
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          ${createMovieDetailsCommentsTemplate(commentData)}
        </div>
      </form>
    </section>`
  );
};

const createMovieDetailsPosterTemplate = (moviePoster) => {
  const {
    image,
    age
  } = moviePoster;

  return (
    `<div class="film-details__poster">
      <img class="film-details__poster-img" src="./${image}" alt="">
      <p class="film-details__age">${age}+</p>
    </div>`
  );
};

const createFilmDetailsInfo = (movieInfo) => {
  const {
    title,
    originalTitle,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description
  } = movieInfo;
  const movieReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const movieRuntime = moment.duration(runtime, `minutes`).format(`h[h] mm[m]`);
  const movieGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);
  const movieGenreTitle = (genres.length > 1) ? `Genres` : `Genre`;

  return (
    `<div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${title}</h3>
          <p class="film-details__title-original">Original: ${originalTitle}</p>
        </div>
        <div class="film-details__rating">
          <p class="film-details__total-rating">${rating}</p>
        </div>
      </div>
      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${movieReleaseDate}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${movieRuntime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${country}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">${movieGenreTitle}</td>
          <td class="film-details__cell">${movieGenres}</td>
        </tr>
      </table>
      <p class="film-details__film-description">${description}</p>
    </div>`
  );
};

const createMovieDetailsCommentsTemplate = (movieComments) => {
  const movieCommentsQuantity = movieComments.length;
  const getMovieComments = () => {
    return movieComments.map((movieComment) => {
      const {
        id,
        emoji,
        text: notSanitizedComment,
        author,
        date
      } = movieComment;
      const commentDate = moment(date).fromNow();
      const currentText = notSanitizedComment ? encode(notSanitizedComment) : ``;

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${currentText}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${commentDate}</span>
              <button id="${id}" class="film-details__comment-delete" data-id="${id}">Delete</button>
            </p>
          </div>
        </li>`
      );
    }).join(`\n`);
  };

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movieCommentsQuantity}</span></h3>
      <ul class="film-details__comments-list">${movieCommentsQuantity ? getMovieComments() : ``}</ul>
      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>`
  );
};

export default class MovieDetails extends AbstractSmartComponent {
  constructor(movieData, commentData) {
    super();

    this._movieData = movieData;
    this._commentData = commentData;

    this._setEmoji();
    this._setOnline();
    this._setOffline();
  }

  getTemplate() {
    return createMovieDetailsTemplate(this._movieData, this._commentData);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setPopupCloseButtonClick(this._setPopupCloseButtonClick);
    this.setAddToWatchlistButtonClickHandler(this._setAddToWatchlistButtonClickHandler);
    this.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatchedButtonClickHandler);
    this.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavoriteButtonClickHandler);

    this._setEmoji();
  }

  setPopupCloseButtonClick(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._setPopupCloseButtonClick = handler;
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    this._setAddToWatchlistButtonClickHandler = handler;
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
    this._setMarkAsWatchedButtonClickHandler = handler;
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
    this._setMarkAsFavoriteButtonClickHandler = handler;
  }

  setCommentDeleteHandler(handler) {
    this.getElement().querySelector(`.film-details__comments-list`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.id === evt.target.dataset.id) {
        evt.target.textContent = `Deleting...`;
        evt.target.disbled = true;
        handler(evt.target.dataset.id, () => {
          evt.target.textContent = `Delete`;
          evt.target.disbled = false;
        });
      }
    });
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const textField = this.getElement().querySelector(`.film-details__comment-input`);

    form.addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        evt.preventDefault();
        handler(new FormData(form));
      }
    });

    form.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      textField.style.border = ``;
    });
  }

  _setOffline() {
    window.addEventListener(`offline`, () => {
      const commentInput = this.getElement().querySelector(`.film-details__comment-input`);
      const emojiItems = this.getElement().querySelectorAll(`.film-details__emoji-item`);

      commentInput.disabled = true;

      emojiItems.forEach((item) => {
        item.disabled = true;
      });
    });
  }

  _setOnline() {
    window.addEventListener(`online`, () => {
      const commentInput = this.getElement().querySelector(`.film-details__comment-input`);
      const emojiItems = this.getElement().querySelectorAll(`.film-details__emoji-item`);

      commentInput.disabled = false;

      emojiItems.forEach((item) => {
        item.disabled = false;
      });
    });
  }

  _setEmoji() {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const emoji = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emoji.forEach((item) => {
      item.addEventListener(`change`, () => {
        const emojiImage = document.createElement(`img`);

        emojiImage.src = `images/emoji/${item.value}.png`;
        emojiImage.width = 55;
        emojiImage.height = 55;
        emojiImage.alt = `emoji-${item.value}`;

        if (emojiContainer.firstChild && emojiContainer.firstChild.tagName === `IMG`) {
          emojiContainer.innerHTML = ``;
        }

        emojiContainer.appendChild(emojiImage);
      });
    });
  }
}
