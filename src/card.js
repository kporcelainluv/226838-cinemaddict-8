class Card {
  constructor(data) {
    this._name = data.name;
    this._descriptionText = data.descriptionText.split(`. `);
    this._posters = data.posters;
    this._controls = data.controls;
    this._element = null;
  }
  _getRandomNum(length) {
    return Math.floor(Math.random() * length);
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
    const coords = [
      this._getRandomNum(this._descriptionText.length),
      this._getRandomNum(this._descriptionText.length)
    ].sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    });
    filmDescription.textContent = this._descriptionText
      .slice(...coords)
      .join(`. `);
    // add film name
    if (this._name) {
      const filmTitle = card.querySelector(`.film-card__title`);
      filmTitle.textContent = this._name[this._getRandomNum(this._name.length)];
    }
    // check if film card has control buttons
    if (!this._controls) {
      const controls = card.querySelector(`.film-card__controls`);
      card.removeChild(controls);
    }
    // add film image
    const image = card.querySelector(`.film-card__poster`);
    image.src = `./images/posters/${
      this._posters[this._getRandomNum(this._posters.length)]
    }.jpg`;

    return card;
  }
  render(parent) {
    this._element = this.template;
    parent.appendChild(this._element);
  }
}

export { Card };
