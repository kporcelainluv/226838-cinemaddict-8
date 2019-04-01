import { default as Component } from "./component.js";
import moment from "moment";

const createSpanElement = (popUpTemplate, className, classConst) => {
  const element = popUpTemplate.querySelector(`.${className}`);
  const span = document.createElement(`span`);
  span.textContent = ` ${classConst}`;
  element.appendChild(span);
};

const addEventListeners = (
  popUpTemplate,
  { onButtonClose, onUpdateRating, onAddComment }
) => {
  const popUpClose = popUpTemplate.querySelector(`.popup-button-close`);
  popUpClose.addEventListener(`click`, e => {
    e.preventDefault();
    onButtonClose;
  });

  const formUpdateRating = popUpTemplate.querySelector(`.update-rating__form`);
  formUpdateRating.addEventListener(`submit`, e => {
    e.preventDefault();
    onUpdateRating;
  });

  const formAddComment = popUpTemplate.querySelector(`.add-comment__form`);
  formAddComment.addEventListener(`submit`, e => {
    e.preventDefault();
    onAddComment;
  });
};

const createPopUp = card => {
  const popUpTemplate = document
    .querySelector(`.popup-template`)
    .content.querySelector(`.popup-portal`)
    .cloneNode(true);
  const image = popUpTemplate.querySelector(`.popup-img-src`);
  image.src = `./images/posters/${card.posters}.jpg`;
  const ratingInBigLetters = popUpTemplate.querySelector(`.rating-info`);
  ratingInBigLetters.textContent = card.rating;
  createSpanElement(popUpTemplate, `popup-name`, card.name);
  createSpanElement(popUpTemplate, `popup-rating`, card.rating);
  createSpanElement(
    popUpTemplate,
    `popup-year`,
    moment(card.year).format(`DD.MM.YYYY`)
  );
  createSpanElement(
    popUpTemplate,
    `popup-duration`,
    moment(card.duration).format(`hh:mm`)
  );
  createSpanElement(popUpTemplate, `popup-genre`, card.genre);
  createSpanElement(popUpTemplate, `popup-description-text`, card.about);

  const ratingOptions = popUpTemplate.querySelectorAll(
    `select#rating > option`
  );
  for (const option of ratingOptions) {
    const x = [Number(option.value)];

    if (x[0] === card.rating[0]) {
      option.selected = true;
    }
  }

  const listOfComments = popUpTemplate.querySelector(`.existing-comments`);
  for (const comment of card.comments) {
    const commentNode = document.createElement(`li`);
    commentNode.textContent = comment.text;
    listOfComments.appendChild(commentNode);
  }

  const form = popUpTemplate.querySelector(`.film-details__form`);
  const input = document.createElement(`input`);
  input.type = `text`;
  input.name = `rating`;
  input.value = card.rating;
  input.className = `input-rating-btn-value`;
  input.style.display = `none`;
  form.appendChild(input);

  return popUpTemplate;
};

export default class Popup extends Component {
  static render(card, handlers) {
    const parent = document.querySelector(`body`);
    const popUpTemplate = createPopUp(card);
    addEventListeners(popUpTemplate, card, handlers);
    parent.appendChild(popUpTemplate);
  }
  _onButtonClose(event) {
    event.preventDefault();
    const newData = {
      ...this._initialFilmData,
      rating: this._rating,
      comments: this._comments,
      amountOfComments: this._comments.length
    };
  }

  _onAddComment(event) {
    event.preventDefault();

    console.log("HERE");

    const formData = new FormData(event.target);

    this._comments = [
      ...this._comments,
      { text: formData.get(`comment`), date: new Date() }
    ];
  }

  _onUpdateRating(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this._rating = formData.get(`rating`);
  }

  unrender() {
    this._removeEventListeners();
    this._parentContainer.removeChild(this._element);
    this._element = null;
  }
}
