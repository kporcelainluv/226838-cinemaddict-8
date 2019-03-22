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
    this._onButtonClose = this._onButtonClose.bind(this);
    this._onChangeRaiting = this._onChangeRaiting.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._amountOfComments = data.amountOfComments;
  }
  set onClose(f) {
    this._onClose = f;
  }

  _onButtonClose(event) {
    event.preventDefault();
    const formData = new FormData(
      this._element.querySelector(`.film-details__form`)
    );
    const newData = this._filmVoteMock(formData);
    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
    this.update(newData);
  }
  _onChangeRaiting(userChosenRaiting) {
    event.preventDefault();
    this._raiting = userChosenRaiting;
    this.removeEventListeners();
    this._partialUpdate();
    this.addEventListeners();
  }
  _onCommentAdd(event) {
    event.preventDefault();
    this.removeEventListeners();
    this._partialUpdate();
    console.log(this);
    this.addEventListeners();
  }
  _filmVoteMock(data) {
    const mock = {
      name: "",
      raiting: ``,
      year: ``,
      duration: ``,
      genre: ``,
      about: ``,
      posters: ``,
      amountOfComments: this._amountOfComments
    };
    const popUpMapper = Popup.createMapper(mock);
    for (const pair of data.entries()) {
      const [property, value] = pair;
      popUpMapper[property] && popUpMapper[property](value);
    }
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
    const popupContainer = document.querySelector(`body`);
    popupContainer.appendChild(this._element);
  }

  unrender() {
    this.removeEventListeners();
    this._element = null;
  }

  updateInputValue(event) {
    const input = this._element.querySelector(`.input-raiting-btn-value`);
    input.value = event.target.innerHTML;
  }
  addEventListeners() {
    const popUpClose = this._element.querySelector(`.popup-button-close`);
    popUpClose.addEventListener(`click`, this._onButtonClose);

    const raitingButtons = this._element.querySelectorAll(`.raiting-button`);

    raitingButtons.forEach(elm => {
      elm.addEventListener("click", event => {
        const newRaiting = event.target.innerHTML;
        this.updateInputValue(event);
        this._onChangeRaiting(newRaiting);
      });
    });
    const addCommentButton = this._element.querySelector(
      `.submit-comment-button`
    );
    addCommentButton.addEventListener("click", this._onCommentAdd);
  }

  removeEventListeners() {
    const popUpClose = this._element.querySelector(`.popup-button-close`);
    popUpClose.removeEventListener(`click`, this._onButtonClose);
  }
  update(data) {
    this._name = data.name;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._controls = data.controls;
    this._onClick = null;
    this._raiting = data.raiting;
    this._amountOfComments = data.amountOfComments;
  }
  static createMapper(target) {
    console.log("tsrget", target);
    return {
      raiting: value => {
        target.raiting = value;
        console.log("val", value);
      },
      comments: value => {
        target.amountOfComments += 1;
        console.log("comment", value);
      }
    };
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

    const form = popUpTemplate.querySelector(`.film-details__form`);
    const input = document.createElement("input");
    input.type = "text";
    input.name = "raiting";
    input.value = this._raiting;
    input.className = "input-raiting-btn-value";
    input.style.display = "none";
    form.appendChild(input);

    return popUpTemplate;
  }
}

export { Popup };
