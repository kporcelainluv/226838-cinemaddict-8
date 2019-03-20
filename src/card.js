import { Component } from "./component.js";

class Card extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._raiting = data.raiting;
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

  render(parent) {
    this._element = this.template;
    parent.appendChild(this._element);

    const commentsButton = document.querySelector(`.film-card__comments`);
    commentsButton.addEventListener(`click`, this._onButtonClick);
  }
  unrender() {
    const commentsButton = document.querySelector(`.film-card__comments`);
    commentsButton.removeEventListener(`click`, this._onButtonClick);
  }
  update(data) {
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._raiting = data.raiting;
  }
  get template() {
    const card = document
      .querySelector(`.card-template`)
      .content.querySelector(`.film-card`)
      .cloneNode(true);
    //remove controls
    if (!this._controls) {
      card.className += ` film-card--no-controls`;
      card.querySelector(
        `.film-card__comments`
      ).style.padding = `0px 0px 40px 0px`;
    }
    // add film description
    const filmDescription = card.querySelector(`.film-card__description`);
    filmDescription.textContent = this._about;
    // add film name
    if (this._name) {
      const filmTitle = card.querySelector(`.film-card__title`);
      filmTitle.textContent = this._name;
    }
    // check if film card has control buttons
    if (!this._controls) {
      const controls = card.querySelector(`.film-card__controls`);
      card.removeChild(controls);
    }
    // add film image
    const image = card.querySelector(`.film-card__poster`);
    image.src = `./images/posters/${this._posters}.jpg`;
    //raitimg
    const raiting = card.querySelector(`.film-card__rating`);

    raiting.innerHTML = this._raiting;
    return card;
  }
}

export { Card };
