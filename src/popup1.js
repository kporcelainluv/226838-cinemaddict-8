import { default as Component } from "./component.js";
import moment from "moment";

const getEmoji = key => {
  switch (key) {
    case `sleeping`:
      return `😴`;
    case `neutral-face`:
      return `😐`;
    case `grinning`:
      return `😀`;
    default:
      return ``;
  }
};

const getTemplate = (film, createComment) => {
  const {
    name,
    poster,
    alternativeName,
    director,
    writers,
    actors,
    country,
    releaseDate,
    duration,
    genre,
    descriptionText,
    age_rating,
    personalRating,
    comments,
    watchlist,
    watched,
    favorite,
    totalRating
  } = film;

  const popUpTemplate = document
    .querySelector(`.popup-template`)
    .content.querySelector(`.film-details`)
    .cloneNode(true);
  popUpTemplate.querySelector(`.film-details__title`).innerText = name;
  popUpTemplate.querySelector(
    `.film-details__user-rating-title`
  ).innerText = name;
  popUpTemplate.querySelector(`.film-details__poster-img`).src = poster;
  popUpTemplate.querySelector(`.film-details__user-rating-img`).src = poster;
  popUpTemplate.querySelector(
    `.film-details__title-original`
  ).innerText = `Original: ${alternativeName}`;
  const filmInfo = popUpTemplate.querySelectorAll(`.film-details__cell`);
  filmInfo[0].innerText = director;
  filmInfo[1].innerText = writers;
  filmInfo[2].innerText = actors;
  filmInfo[3].innerText = `${moment(releaseDate).format(
    `DD.MM.YYYY`
  )} (${country})`;

  filmInfo[4].innerText = `${duration} min`;
  filmInfo[5].innerText = country;
  filmInfo[6].innerText = genre;
  popUpTemplate.querySelector(
    `.film-details__film-description`
  ).innerText = descriptionText;
  popUpTemplate.querySelector(
    `.film-details__comments-title`
  ).innerText = `Comments ${comments.length}`;

  popUpTemplate.querySelector(
    `.film-details__age`
  ).innerText = `${age_rating}+`;
  popUpTemplate.querySelector(
    `.film-details__total-rating`
  ).innerText = totalRating;
  popUpTemplate.querySelector(
    `.film-details__user-rating`
  ).innerText = `Your rate ${personalRating}`;
  const commentsFiled = popUpTemplate.querySelector(
    `.film-details__comments-list`
  );

  for (let comment of comments) {
    commentsFiled.appendChild(createComment(comment));
  }
  const ratingValueButton = popUpTemplate.querySelectorAll(
    `.film-details__user-rating-input`
  );

  for (let button of ratingValueButton) {
    if (parseInt(button.value) === Math.floor(personalRating)) {
      button.checked = true;
    }
  }
  const filmControls = popUpTemplate.querySelectorAll(
    ".film-details__control-input"
  );
  filmControls[0].checked = watchlist;
  filmControls[1].checked = watched;
  filmControls[2].checked = favorite;
  return popUpTemplate;
};

const createComment = comment => {
  const li = document.createElement("li");
  li.className = "film-details__comment";
  const span = document.createElement("span");
  span.innerText = getEmoji(comment.emotion);
  span.className = "film-details__comment-emoji";
  const div = document.createElement("div");
  const pText = document.createElement("p");
  pText.className = "film-details__comment-text";
  const pInfo = document.createElement("p");
  pInfo.innerText = comment.comment || comment.text;
  pInfo.className = "film-details__comment-info";
  const spanAuthor = document.createElement("span");
  spanAuthor.className = `film-details__comment-author`;
  spanAuthor.innerText = comment.author;
  const spanDate = document.createElement("span");
  spanDate.className = "film-details__comment-day";
  spanDate.innerText = moment(comment.date)
    .startOf("day")
    .fromNow();
  pInfo.appendChild(spanAuthor);
  pInfo.appendChild(spanDate);
  div.appendChild(pText);
  div.appendChild(pInfo);
  li.appendChild(span);
  li.appendChild(div);
  return li;
};

const createUserComment = ({ text, emotion }) => {
  return {
    text,
    data: parseInt(moment(Date.now()).format("x")),
    author: "You",
    emotion
  };
};

const addEventListeners = (
  template,
  {
    onButtonClose,
    onUpdateRating,
    onAddComment,
    onAddToFavourites,
    onAddToWatchlist,
    onMarkAsWatched
  }
) => {
  const popUpClose = template.querySelector(`.film-details__close-btn`);
  popUpClose.addEventListener(`click`, onButtonClose);

  const formUpdateRating = template.querySelectorAll(
    `.film-details__user-rating-input`
  );
  for (let rating of formUpdateRating) {
    rating.addEventListener(`click`, onUpdateRating);
  }

  const formAddComment = template.querySelector(`.film-details__new-comment`);
  formAddComment.addEventListener(`submit`, e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const [text, emotion] = [
      formData.get(`comment`),
      formData.get(`comment-emoji`)
    ];
    const newComment = createUserComment({ text, emotion });
    onAddComment(newComment);
  });

  const favoritesBtn = template.querySelector(
    `.film-details__control-label--favorite`
  );
  favoritesBtn.addEventListener(`click`, onAddToFavourites);

  const watchlistBtn = template.querySelector(
    `.film-details__control-label--watchlist`
  );
  watchlistBtn.addEventListener(`click`, onAddToWatchlist);

  const watchedBtn = template.querySelector(
    `.film-details__control-label--watched`
  );
  watchedBtn.addEventListener(`click`, onMarkAsWatched);
};

export default class Popup extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._descriptionText = data.descriptionText;
    this._totalRaiting = data.totalRating;
    this._actors = data.actors;
    this._name = data.name;
    this._director = data.director;
    this._alternativeName = data.alternativeName;
    this._genre = data.genre;
    this._poster = data.poster;
    this._releaseDate = data.releaseDate;
    this._country = data.country;
    this._duration = data.duration;
    this._writers = data.writers || [];
    this._comments = data.comments;
    // [data, text. author, emotion]
    this._watched = data.watched;
    this._watchlist = data.watchlist;
    this._favorite = data.favorite;
    this._controls = true;
    this._personalRating = data.personalRating;

    this._onClose = null;
    this._age_rating = data.age_rating;

    this._initialFilmData = data;
    this._parentContainer = document.querySelector(`body`);

    this._onButtonClose = this._onButtonClose.bind(this);
    this._onUpdateRating = this._onUpdateRating.bind(this);
    this._AddComment = this._AddComment.bind(this);
  }

  set onClose(f) {
    this._onClose = f;
  }
  _onButtonClose(event) {
    const newData = {
      ...this._initialFilmData,
      personalRating: this._personalRating,
      comments: this._comments
    };
    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
    this.update(newData);
  }

  set onAddComment(f) {
    this._onAddComment = f;
  }

  _AddComment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCommnent = formData.get(`comment`);
    const emoji = formData.get(`comment-emoji`);
    this._comments = [
      ...this._comments,
      {
        text: newCommnent,
        data: parseInt(moment(Date.now()).format("x")),
        author: "You",
        emotion: emoji
      }
    ];
    const newData = {
      ...this._initialFilmData,
      personalRating: this._personalRating,
      comments: this._comments
    };
    if (typeof this._onAddComment === `function`) {
      this._onAddComment(newData);
    }
  }

  _onUpdateRating(event) {
    event.preventDefault();
    this._personalRating = event.target.value;
  }

  render() {
    this._element = getTemplate(this._initialFilmData, createComment);
    this._addEventListeners();
    this._parentContainer.appendChild(this._element);
  }

  unrender() {
    this._removeEventListeners();
    this._parentContainer.removeChild(this._element);
    this._element = null;
  }

  _addEventListeners() {
    const popUpClose = this._element.querySelector(`.film-details__close-btn`);
    popUpClose.addEventListener(`click`, this._onButtonClose);

    const formUpdateRating = this._element.querySelectorAll(
      `.film-details__user-rating-input`
    );
    for (let rating of formUpdateRating) {
      rating.addEventListener(`click`, this._onUpdateRating);
    }

    const formAddComment = this._element.querySelector(
      `.film-details__new-comment`
    );
    formAddComment.addEventListener(`submit`, this._AddComment);

    const favoritesBtn = this._element.querySelector(
      `.film-details__control-label--favorite`
    );
    favoritesBtn.addEventListener(`click`, e => {
      e.preventDefault();
      onAddToFavourites({
        ...this._initialFilmData,
        favorite: !this._favorite
      });
    });

    const watchlistBtn = this._element.querySelector(
      `.film-details__control-label--watchlist`
    );
    watchlistBtn.addEventListener(`click`, e => {
      e.preventDefault();
      onAddToWatchList({
        ...this._initialFilmData,
        watchlist: !this._watchlist
      });
    });

    const watchedBtn = this._element.querySelector(
      `.film-details__control-label--watched`
    );
    watchedBtn.addEventListener(`click`, e => {
      e.preventDefault();
      onMarkAsWatched({
        ...this._initialFilmData,
        watched: !this._watched
      });
    });
  }
  update(data) {
    this._id = data.id;
    this._descriptionText = data.descriptionText;
    this._totalRaiting = data.totalRating;
    this._actors = data.actors;
    this._name = data.name;
    this._director = data.director;
    this._alternativeName = data.alternativeName;
    this._genre = data.genre;
    this._poster = data.poster;
    this._releaseDate = data.releaseDate;
    this._country = data.country;
    this._duration = data.duration;
    this._writers = data.writers || [];
    this._comments = data.comments;
    // [data, text. author, emotion]
    this._watched = data.watched;
    this._watchlist = data.watchlist;
    this._favorite = data.favorite;
    this._controls = true;
    this._personalRating = data.personalRating;

    this._onClose = null;
    this._age_rating = data.age_rating;
  }
}
