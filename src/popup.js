import { default as Component } from "./component.js";
import moment from "moment";

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
    this._onAddComment = this._onAddComment.bind(this);
  }

  emotions(key) {
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
  }
  set onClose(f) {
    this._onClose = f;
  }

  _onButtonClose(event) {
    event.preventDefault();
    const newData = {
      ...this._initialFilmData,
      rating: this._rating,
      comments: this._comments
    };

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
    this.update(newData);
  }

  _createSpanElement(popUpTemplate, className, classConst) {
    const element = popUpTemplate.querySelector(`.${className}`);
    const span = document.createElement(`span`);
    span.textContent = ` ${classConst}`;
    element.appendChild(span);
  }

  render() {
    this._element = this.template;
    this._addEventListeners();
    this._parentContainer.appendChild(this._element);
  }

  unrender() {
    this._removeEventListeners();
    this._parentContainer.removeChild(this._element);
    this._element = null;
  }

  _onUpdateRating(event) {
    console.log("here");
    event.preventDefault();
    this._personalRating = event.target.value;
    this.update(this);
    this._element = this.template;
    // this._onButtonClose(event);
  }
  _onAddComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCommnent = formData.get(`comment`);
    const emoji = formData.get(`comment-emoji`);
    this._comments = [
      ...this._comments,
      {
        text: newCommnent,
        data: new Date(),
        author: "You",
        emotion: emoji
      }
    ];
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
    formAddComment.addEventListener(`submit`, this._onAddComment);
  }

  // _removeEventListeners() {
  //   const popUpClose = this._element.querySelector(`.film-details__close-btn`);
  //   popUpClose.removeEventListener(`click`, this._onButtonClose);
  //   const formUpdateRating = this._element.querySelector(
  //     `.update-rating__form`
  //   );
  //   formUpdateRating.removeEventListener(`submit`, this._onUpdateRating);

  //   const formAddComment = this._element.querySelector(`.add-comment__form`);
  //   formAddComment.removeEventListener(`submit`, this._onAddComment);
  // }
  update(data) {
    console.log("update", data);
    // this._id = data.id;
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
  createComment(emoji, commentText, author, date) {
    const li = document.createElement("li");
    li.className = "film-details__comment";
    const span = document.createElement("span");
    span.innerText = this.emotions(emoji);
    span.className = "film-details__comment-emoji";
    const div = document.createElement("div");
    const pText = document.createElement("p");
    pText.className = "film-details__comment-text";
    const pInfo = document.createElement("p");
    pInfo.innerText = commentText;
    pInfo.className = "film-details__comment-info";
    const spanAuthor = document.createElement("span");
    spanAuthor.className = `film-details__comment-author`;
    spanAuthor.innerText = author;
    const spanDate = document.createElement("span");
    spanDate.className = "film-details__comment-day";
    spanDate.innerText = date;
    pInfo.appendChild(spanAuthor);
    pInfo.appendChild(spanDate);
    div.appendChild(pText);
    div.appendChild(pInfo);
    li.appendChild(span);
    li.appendChild(div);
    return li;
  }

  get template() {
    const popUpTemplate = document
      .querySelector(`.popup-template`)
      .content.querySelector(`.film-details`)
      .cloneNode(true);
    popUpTemplate.querySelector(`.film-details__title`).innerText = this._name;
    popUpTemplate.querySelector(
      `.film-details__user-rating-title`
    ).innerText = this._name;
    popUpTemplate.querySelector(`.film-details__poster-img`).src = this._poster;
    popUpTemplate.querySelector(
      `.film-details__user-rating-img`
    ).src = this._poster;
    popUpTemplate.querySelector(
      `.film-details__title-original`
    ).innerText = `Original: ${this._alternativeName}`;
    const filmInfo = popUpTemplate.querySelectorAll(`.film-details__cell`);
    filmInfo[0].innerText = this._director;
    filmInfo[1].innerText = this._writers;
    filmInfo[2].innerText = this._actors;
    filmInfo[3].innerText = `${moment(this._releaseDate).format(
      `DD.MM.YYYY`
    )} (${this._country})`;

    filmInfo[4].innerText = `${this._duration} min`;
    filmInfo[5].innerText = this._country;
    filmInfo[6].innerText = this._genre;
    popUpTemplate.querySelector(
      `.film-details__film-description`
    ).innerText = this._descriptionText;
    popUpTemplate.querySelector(
      `.film-details__comments-title`
    ).innerText = `Comments ${this._comments.length}`;

    popUpTemplate.querySelector(`.film-details__age`).innerText = `${
      this._age_rating
    }+`;
    popUpTemplate.querySelector(
      `.film-details__total-rating`
    ).innerText = this._totalRaiting;
    popUpTemplate.querySelector(
      `.film-details__user-rating`
    ).innerText = `Your rate ${this._personalRating}`;
    const commentsFiled = popUpTemplate.querySelector(
      `.film-details__comments-list`
    );

    for (let comment of this._comments) {
      commentsFiled.appendChild(
        this.createComment(
          comment.emotion,
          comment.comment,
          comment.author,
          moment(comment.date)
            .startOf("day")
            .fromNow()
        )
      );
    }
    const ratingValueButton = popUpTemplate.querySelectorAll(
      `.film-details__user-rating-input`
    );

    for (let button of ratingValueButton) {
      if (parseInt(button.value) === Math.floor(this._personalRating)) {
        button.checked = true;
      }
    }
    const filmControls = popUpTemplate.querySelectorAll(
      ".film-details__control-input"
    );
    filmControls[0].checked = this._watchlist;
    filmControls[1].checked = this._watched;
    filmControls[2].checked = this._favorite;
    return popUpTemplate;
  }
}
