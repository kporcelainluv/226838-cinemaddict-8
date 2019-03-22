import { Component } from "./component.js";
class Popup extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._about = data.descriptionText;
    this._posters = data.posters;
    this._onClose = null;
    this._onButtonClose = this._onButtonClose.bind(this);
    this._onChangerating = this._onChangerating.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._amountOfComments = data.amountOfComments;
    this._comments = data.comments;
    this._initialFilmData = data;
    this._parentContainer = document.querySelector(`body`);
  }
  set onClose(f) {
    this._onClose = f;
  }

  _onButtonClose(event) {
    event.preventDefault();
    const formData = new FormData(
      this._element.querySelector(`.film-details__form`)
    );

    const { rating, amountOfComments } = this._filmVoteMock(formData);

    const newData = {
      ...this._initialFilmData,
      rating,
      amountOfComments
    };

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
    this.update(newData);
  }
  _onChangerating(userChosenrating) {
    event.preventDefault();
    this._rating = userChosenrating;
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
      rating: ``,
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
    this._parentContainer.appendChild(this._element);
  }

  unrender() {
    this.removeEventListeners();
    this._parentContainer.removeChild(this._element);
    this._element = null;
  }

  updateInputValue(event) {
    const input = this._element.querySelector(`.input-rating-btn-value`);
    input.value = event.target.innerHTML;
  }
  addEventListeners() {
    const popUpClose = this._element.querySelector(`.popup-button-close`);
    popUpClose.addEventListener(`click`, this._onButtonClose);

    const ratingButtons = this._element.querySelectorAll(`.rating-button`);

    ratingButtons.forEach(elm => {
      elm.addEventListener("click", event => {
        const newrating = event.target.innerHTML;
        this.updateInputValue(event);
        this._onChangerating(newrating);
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
    this._rating = data.rating;
    this._amountOfComments = data.amountOfComments;
  }
  static createMapper(target) {
    console.log("tsrget", target);
    return {
      rating: value => {
        target.rating = value;
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
    const ratingInBigLetters = popUpTemplate.querySelector(`.rating-info`);
    ratingInBigLetters.innerHTML = this._rating;
    this._createSpanElement(popUpTemplate, `popup-name`, this._name);
    this._createSpanElement(popUpTemplate, `popup-rating`, this._rating);
    this._createSpanElement(popUpTemplate, `popup-year`, this._year);
    this._createSpanElement(popUpTemplate, `popup-duration`, this._duration);
    this._createSpanElement(popUpTemplate, `popup-genre`, this._genre);
    this._createSpanElement(
      popUpTemplate,
      `popup-description-text`,
      this._about
    );

    const listOfComments = popUpTemplate.querySelector(".existing-comments");
    for (const comment of this._comments) {
      const commentNode = document.createElement("li");
      commentNode.innerHTML = comment.text;
      listOfComments.appendChild(commentNode);
    }

    const form = popUpTemplate.querySelector(`.film-details__form`);
    const input = document.createElement("input");
    input.type = "text";
    input.name = "rating";
    input.value = this._rating;
    input.className = "input-rating-btn-value";
    input.style.display = "none";
    form.appendChild(input);

    return popUpTemplate;
  }
}

export { Popup };
