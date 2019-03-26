import { default as Component } from "./component.js";
import moment from "moment";

export default class Card extends Component {
  constructor(data, parentContainer) {
    super();
    this._id = data.id;
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
    this._genre = data.genre;

    this._initialData = data;

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
    this._watchlist = !this._watchlist;
    event.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList({
        ...this._initialData,
        watchlist: this._watchlist
      });
    }
  }
  _markAsWatched(event) {
    this._watched = !this._watched;
    event.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched({
        ...this._initialData,
        watched: this._watched
      });
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

  _addEventListeners() {
    const commentsButton = document.querySelector(
      `.film-card__comments__${this._id}`
    );
    commentsButton.addEventListener(`click`, this._onButtonClick);

    const watchlistBtn = document.querySelector(
      `.film-card__controls-item--add-to-watchlist__${this._id}`
    );
    watchlistBtn.addEventListener(`click`, this._addToWatchList);

    const watchedBtn = document.querySelector(
      `.film-card__controls-item--mark-as-watched__${this._id}`
    );
    watchedBtn.addEventListener(`click`, this._markAsWatched);
  }

  render() {
    this._element = this.template;
    this._parentContainer.appendChild(this._element);
    this._addEventListeners();
  }
  replacewith(oldcard, newcard) {
    this._parentContainer.replaceChild(newcard, oldcard);
    this._element = newcard;
  }
  unrender() {
    this._removeEventListeners();
  }

  _removeEventListeners() {
    const commentsButton = document.querySelector(
      `.film-card__comments__${this._id}`
    );
    commentsButton.removeEventListener(`click`, this._onButtonClick);

    const watchlistBtn = document.querySelector(
      `.film-card__controls-item--add-to-watchlist__${this._id}`
    );
    watchlistBtn.removeEventListener(`click`, this._addToWatchList);

    const watchedBtn = document.querySelector(
      `.film-card__controls-item--mark-as-watched__${this._id}`
    );

    watchedBtn.removeEventListener(`click`, this._markAsWatched);
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
    if (!this._controls) {
      const controls = card.querySelector(`.film-card__controls`);
      card.removeChild(controls);
    }
    const genre = card.querySelector(`.film-card__genre`);
    genre.innerHTML = this._genre;
    const image = card.querySelector(`.film-card__poster`);
    image.src = `./images/posters/${this._posters}.jpg`;
    const rating = card.querySelector(`.film-card__rating`);

    card
      .querySelector(`.film-card__comments`)
      .classList.add(`film-card__comments__${this._id}`);

    card
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .classList.add(`film-card__controls-item--add-to-watchlist__${this._id}`);

    card
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .classList.add(`film-card__controls-item--mark-as-watched__${this._id}`);

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
