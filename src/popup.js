class Popup {
  constructor(data) {
    this._name = data.name;
    this._raiting = data.raiting;
    this._year = data.year;
    this._duration = data._duration;
    this._genre = data._genre;
    this._about = data.descriptionText.split(`. `);
    this._posters = data.posters;
    this._element = null;
  }
  _getRandomNum(length) {
    return Math.floor(Math.random() * length);
  }
  _createSpanElement(popUpTemplate, className, classConst) {
    const element = popUpTemplate.querySelector(`.${className}`);
    const span = document.createElement("span");
    console.log(classConst);
    span.innerText = ` ${classConst}`;
    element.appendChild(span);
  }
  get template() {
    const popUpTemplate = document
      .querySelector(`.popup-template`)
      .content.querySelector(`.popup-portal`)
      .cloneNode(true);
    const image = popUpTemplate.querySelector(`.popup-img-src`);
    image.src = `./images/posters/${
      this._posters[this._getRandomNum(this._posters.length)]
    }.jpg`;
    //film
    const filmDescription = popUpTemplate.querySelector(
      `.popup-description-text`
    );

    const coords = [
      this._getRandomNum(this._about.length),
      this._getRandomNum(this._about.length)
    ].sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    });
    console.log({ coords });
    filmDescription.textContent = this._about.slice(...coords).join(`. `);
    //add name
    this._createSpanElement(
      popUpTemplate,
      "popup-name",
      this._name[this._getRandomNum(this._name.length)]
    );
    // add raiting
    this._createSpanElement(popUpTemplate, "popup-raiting", this._raiting);
    // add year
    this._createSpanElement(popUpTemplate, "popup-year", this._year);
    // add duration
    this._createSpanElement(popUpTemplate, "popup-duration", this._duration);
    // add genre
    this._createSpanElement(popUpTemplate, "popup-genre", this._genre);
    // add about
    this._createSpanElement(popUpTemplate, "popup-description", this._about);
    return popUpTemplate;
  }
  render() {
    this._element = this.template;

    const popUpClose = this._element.querySelector(`.popup-button`);
    const commentsButton = document.querySelector(`.film-card__comments`);

    const openPopup = () => {
      let mainContainer = document.querySelector(`.main`);
      mainContainer.appendChild(this._element);
    };
    const closeButton = () => {
      let mainContainer = document.querySelector(`.main`);
      const template = document.querySelector(`.popup-portal`);
      mainContainer.removeChild(template);
    };
    commentsButton.addEventListener("click", openPopup);
    popUpClose.addEventListener("click", closeButton);
  }
}
export { Popup };
