import { default as Component } from "./component.js";
import moment from "moment";

const addEventListeners = (
  cardTemplate,
  card,
  { onAddToWatchList, onMarkAsWatched, onAddToFavourites, onClickToComments }
) => {
  const { id } = card;

  const commentsButton = cardTemplate.querySelector(
    `.film-card__comments__${id}`
  );
  commentsButton.addEventListener(`click`, e => {
    e.preventDefault();
    onClickToComments();
  });
  //1
  const favoritesBtn = cardTemplate.querySelector(
    `.film-card__controls-item--favorite__${id}`
  );
  favoritesBtn.addEventListener(`click`, e => {
    e.preventDefault();
    onAddToFavourites({
      ...card,
      favorite: !card.favorite
    });
  });

  const watchlistBtn = cardTemplate.querySelector(
    `.film-card__controls-item--add-to-watchlist__${id}`
  );
  watchlistBtn.addEventListener(`click`, e => {
    e.preventDefault();
    onAddToWatchList({
      ...card,
      watchlist: !card.watchlist
    });
  });

  const watchedBtn = cardTemplate.querySelector(
    `.film-card__controls-item--mark-as-watched__${id}`
  );
  watchedBtn.addEventListener(`click`, e => {
    e.preventDefault();
    onMarkAsWatched({
      ...card,
      watched: !card.watched
    });
  });
};

const createCard = ({
  id,
  totalRating,
  name,
  descriptionText,
  poster,
  releaseDate,
  duration,
  comments,
  genre
}) => {
  const card = document
    .querySelector(`.card-template`)
    .content.querySelector(`.film-card`)
    .cloneNode(true);
  const filmDescription = card.querySelector(`.film-card__description`);
  filmDescription.textContent = descriptionText;

  const filmTitle = card.querySelector(`.film-card__title`);
  filmTitle.textContent = name;

  const filmYear = card.querySelector(`.film-card__year`);
  filmYear.textContent = moment(releaseDate).format(`YYYY`);

  const filmDuration = card.querySelector(`.film-card__duration`);
  const hours = Math.floor(duration / 60) || "";
  const minutes = duration % 60 || "";
  filmDuration.textContent = `${hours}h ${minutes}m`;

  const genreNode = card.querySelector(`.film-card__genre`);
  genreNode.textContent = genre;
  const image = card.querySelector(`.film-card__poster`);
  image.src = poster;

  const ratingNode = card.querySelector(`.film-card__rating`);
  ratingNode.textContent = totalRating;

  card
    .querySelector(`.film-card__comments`)
    .classList.add(`film-card__comments__${id}`);
  card
    .querySelector(`.film-card__controls-item--add-to-watchlist`)
    .classList.add(`film-card__controls-item--add-to-watchlist__${id}`);

  card
    .querySelector(`.film-card__controls-item--mark-as-watched`)
    .classList.add(`film-card__controls-item--mark-as-watched__${id}`);

  card
    .querySelector(`.film-card__controls-item--favorite`)
    .classList.add(`film-card__controls-item--favorite__${id}`);

  const commentsButton = card.querySelector(`.film-card__comments`);
  commentsButton.textContent = `${comments.length} comments`;
  return card;
};

export default class Card1 extends Component {
  static render(card, handlers, parent) {
    const cardTemplate = createCard(card);
    addEventListeners(cardTemplate, card, handlers);
    parent.appendChild(cardTemplate);
  }
}
