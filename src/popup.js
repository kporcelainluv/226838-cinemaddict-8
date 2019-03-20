import { Component } from "./component.js";
class Popup extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._raiting = data.raiting;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._onClose = null;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onChangeRaiting = this._onChangeRaiting.bind(this);
  }
  set onClose(f) {
    this._onClose = f;
  }
  _onButtonClick(event) {
    event.preventDefault();

    const formData = new FormData(this._element.querySelector(`.popup-portal`));
    const newData = this._filmVoteMock(formData);
    console.log("here", { newData });
    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
    this.update(newData);
  }
  _onChangeRaiting() {
    this._partialUpdate();
    this.addEventListeners();
  }
  _filmVoteMock(data) {
    const mock = {
      name: "",
      raiting: "",
      year: "",
      duration: "",
      genre: "",
      about: "",
      posters: ""
    };
    const popUpMapper = Popup.createMapper(mock);
    for (const pair of data.entries()) {
      const [property, value] = pair;
      popUpMapper[property] && popUpMapper[property](value);
    }
    console.log("filmvote ,ock", { mock });
    return mock;
  }
  _partialUpdate() {
    const updatedTemplate = this.template;
    this._element.parentNode.replaceChild(updatedTemplate, this._element);
    this._element = updatedTemplate;
  }
  _createSpanElement(popUpTemplate, className, classConst) {
    const element = popUpTemplate.querySelector(`.${className}`);
    const span = document.createElement(`span`);
    span.innerText = ` ${classConst}`;
    element.appendChild(span);
  }

  render() {
    this._element = this.template;
    this.addEventListeners();
  }
  addEventListeners() {
    const popUpClose = this._element.querySelector(`.popup-button-close`);
    popUpClose.addEventListener(`click`, this._onButtonClick);

    const raitingButtons = this._element.querySelectorAll(`.raiting-button`);
    raitingButtons.forEach(elm => {
      elm.addEventListener("click", this._onChangeRaiting);
    });
  }
  update(data) {
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._raiting = data.raiting;
  }
  removeEventListeners() {
    const popUpClose = this._element.querySelector(`.popup-button-close`);
    popUpClose.removeEventListener(`click`, this._onButtonClick);
  }
  get template() {
    const popUpTemplate = document
      .querySelector(`.popup-template`)
      .content.querySelector(`.popup-portal`)
      .cloneNode(true);
    const image = popUpTemplate.querySelector(`.popup-img-src`);
    image.src = `./images/posters/${this._posters}.jpg`;
    const raitingInBigLetters = popUpTemplate.querySelector(`.raiting-info`);
    raitingInBigLetters.innerHTML = this._raiting;
    this._createSpanElement(popUpTemplate, `popup-name`, this._name);
    this._createSpanElement(popUpTemplate, `popup-raiting`, this._raiting);
    this._createSpanElement(popUpTemplate, `popup-year`, this._year);
    this._createSpanElement(popUpTemplate, `popup-duration`, this._duration);
    this._createSpanElement(popUpTemplate, `popup-genre`, this._genre);
    this._createSpanElement(
      popUpTemplate,
      `popup-description-text`,
      this._about
    );
    return popUpTemplate;
  }

  static createMapper(target) {
    return {
      name: value => (target.name = value),
      raiting: value => (target.raiting = value),
      year: value => (target.year = value),
      duration: value => (target.duration = value),
      genre: value => (target.genre = value),
      posters: value => (target.posters = value)
    };
  }
}

export { Popup };
