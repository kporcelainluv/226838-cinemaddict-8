import { Component } from "./component.js";
import moment from "moment";

class Card extends Component {
  constructor(data, parentContainer) {
    super();
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._amountOfComments = data.amountOfComments;
    this._parentContainer = parentContainer;
    this._watched = data.watched;
    this._favorite = data.favorite;
    this._watchlist = data.watchlist;

    this._onButtonClick = this._onButtonClick.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._markAsWatched = this._markAsWatched.bind(this);
  }

  _onButtonClick(event) {
    event.preventDefault();
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }
  _addToWatchList(event) {
    this._watchlist = true;
    event.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
  }
  _markAsWatched(event) {
    this._watched = true;
    event.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }
  set onClick(f) {
    this._onClick = f;
  }
  set onAddToWatchList(f) {
    this._onAddToWatchList = f;
  }
  set onMarkAsWatched(f) {
    this._onMarkAsWatched = f;
  }

  addEventListeners(index) {
    const commentsButton = Array.from(
      document.querySelectorAll(`.film-card__comments`)
    )[index];
    commentsButton.addEventListener(`click`, this._onButtonClick);

    const watchlistBtn = Array.from(
      document.querySelectorAll(`.film-card__controls-item--add-to-watchlist`)
    )[index];
    watchlistBtn.addEventListener(`click`, this._addToWatchList);

    const watchedBtn = Array.from(
      document.querySelectorAll(`.film-card__controls-item--mark-as-watched`)
    )[index];
    watchedBtn.addEventListener(`click`, this._markAsWatched);
  }

  render(index) {
    this._element = this.template;
    this._parentContainer.appendChild(this._element);
    this.addEventListeners(index);
  }
  replacewith(oldcard, newcard) {
    this._parentContainer.replaceChild(newcard, oldcard);
    this._element = newcard;
  }
  unrender() {
    this.removeEventListeners();
    // this._parentContainer.removeChild(this._element);
  }

  removeEventListeners() {
    const commentsButton = document.querySelector(`.film-card__comments`);
    commentsButton.removeEventListener(`click`, this._onButtonClick);
  }
  update(data) {
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._rating = data.rating;
    this._amountOfComments = data.amountOfComments;
  }
  get template() {
    const card = document
      .querySelector(`.card-template`)
      .content.querySelector(`.film-card`)
      .cloneNode(true);
    if (!this._controls) {
      card.className += ` film-card--no-controls`;
      card.querySelector(
        `.film-card__comments`
      ).style.padding = `0px 0px 40px 0px`;
    }
    const filmDescription = card.querySelector(`.film-card__description`);
    filmDescription.textContent = this._about;

    const filmTitle = card.querySelector(`.film-card__title`);
    filmTitle.textContent = this._name;

    const filmYear = card.querySelector(`.film-card__year`);
    filmYear.innerHTML = moment(this._year).format(`YYYY`);

    const filmDuration = card.querySelector(`.film-card__duration`);
    filmDuration.innerHTML = moment(this._duration).format(`hh:mm`);
    // check if film card has control buttons
    if (!this._controls) {
      const controls = card.querySelector(`.film-card__controls`);
      card.removeChild(controls);
    }
    const image = card.querySelector(`.film-card__poster`);
    image.src = `./images/posters/${this._posters}.jpg`;
    const rating = card.querySelector(`.film-card__rating`);

    rating.innerHTML = this._rating;

    const commentsButton = card.querySelector(`.film-card__comments`);
    commentsButton.innerHTML = `${this._amountOfComments} comments`;
    return card;
  }
  update(data) {
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._amountOfComments = data.amountOfComments;
  }
}

export { Card };
