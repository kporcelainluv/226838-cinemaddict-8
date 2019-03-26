import { default as Component } from "./component.js";
import moment from "moment";

const addEventListeners = (
  cardTemplate,
  { id },
  { onAddToWatchList, onMarkAsWatched, onAddToFavourites, onClickToComments }
) => {
  const commentsButton = cardTemplate.querySelector(
    `.film-card__comments__${id}`
  );
  commentsButton.addEventListener(`click`, onClickToComments);

  const watchlistBtn = cardTemplate.querySelector(
    `.film-card__controls-item--add-to-watchlist__${id}`
  );
  watchlistBtn.addEventListener(`click`, onAddToWatchList);

  const watchedBtn = cardTemplate.querySelector(
    `.film-card__controls-item--mark-as-watched__${id}`
  );
  watchedBtn.addEventListener(`click`, onMarkAsWatched); // ????
};

const createCard = ({
  id,
  name,
  about,
  posters,
  controls,
  rating,
  year,
  duration,
  amountOfComments,
  genre
}) => {
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
  filmDescription.textContent = about;

  const filmTitle = card.querySelector(`.film-card__title`);
  filmTitle.textContent = name;

  const filmYear = card.querySelector(`.film-card__year`);
  filmYear.textContent = moment(year).format(`YYYY`);

  const filmDuration = card.querySelector(`.film-card__duration`);
  filmDuration.textContent = moment(duration).format(`hh:mm`);
  if (!controls) {
    const controls = card.querySelector(`.film-card__controls`);
    card.removeChild(controls);
  }
  const genre = card.querySelector(`.film-card__genre`);
  genre.textContent = genre;
  const image = card.querySelector(`.film-card__poster`);
  image.src = `./images/posters/${posters}.jpg`;
  const rating = card.querySelector(`.film-card__rating`);

  card
    .querySelector(`.film-card__comments`)
    .classList.add(`film-card__comments__${id}`);

  card
    .querySelector(`.film-card__controls-item--add-to-watchlist`)
    .classList.add(`film-card__controls-item--add-to-watchlist__${id}`);

  card
    .querySelector(`.film-card__controls-item--mark-as-watched`)
    .classList.add(`film-card__controls-item--mark-as-watched__${id}`);

  rating.textContent = rating;

  const commentsButton = card.querySelector(`.film-card__comments`);
  commentsButton.textContent = `${amountOfComments} comments`;
  return card;
};

export default class Card1 extends Component {
  static render(card, handlers, parent) {
    const cardTemplate = createCard(card);
    addEventListeners(cardTemplate, card, handlers);
    parent.appendChild(cardTemplate);
  }
}
