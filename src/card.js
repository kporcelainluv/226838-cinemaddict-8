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

    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(event) {
    event.preventDefault();
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }
  set onClick(f) {
    this._onClick = f;
  }
  addEventListeners() {
    const commentsButton = document.querySelector(`.film-card__comments`);
    commentsButton.addEventListener(`click`, this._onButtonClick);
  }

  render(newElement = null) {
    this._element = this.template;
    if (arguments.length === 0) {
      this._parentContainer.appendChild(this._element);
      this.addEventListeners();
    } else {
      this._parentContainer.replaceChild(this._element, newElement);
      this._element = newElement;
      this.addEventListeners();
    }
    this.addEventListeners();
  }

  unrender() {
    this.removeEventListeners();
    this._parentContainer.removeChild(this._element);
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
}

export { Card };
