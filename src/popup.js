import { Component } from "./component.js";
class Popup extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._raiting = data.raiting;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._about = data.descriptionText.split(`. `);
    this._posters = data.posters;
    this._onClose = null;
  }
  set onClose(f) {
    this._onClose = f;
  }
  _onButtonClick(event) {
    event.preventDefault();
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }
  _createSpanElement(popUpTemplate, className, classConst) {
    const element = popUpTemplate.querySelector(`.${className}`);
    const span = document.createElement(`span`);
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

    //add name
    this._createSpanElement(
      popUpTemplate,
      `popup-name`,
      this._name[this._getRandomNum(this._name.length)]
    );
    // add raiting
    this._createSpanElement(popUpTemplate, `popup-raiting`, this._raiting);
    // add year
    this._createSpanElement(popUpTemplate, `popup-year`, this._year);
    // add duration
    this._createSpanElement(popUpTemplate, `popup-duration`, this._duration);
    // add genre
    this._createSpanElement(popUpTemplate, `popup-genre`, this._genre);
    // add about
    this._createSpanElement(
      popUpTemplate,
      `popup-description-text`,
      this._generateDescription(this._about)
    );
    return popUpTemplate;
  }
  render() {
    this._element = this.template;
    const popUpClose = this._element.querySelector(`.popup-button`);
    popUpClose.addEventListener(`click`, this._onButtonClick.bind(this));
  }
}

export { Popup };
