import {
  displayFilters,
  filters,
  createFilter,
  makeFilterActive
} from "./filter.js";

import { Card } from "./card.js";
import { film } from "./data.js";
import { Popup } from "./popup.js";

// display filters
displayFilters(filters, createFilter, makeFilterActive);

// add film cards
const moviesCategoeriesContainers = Array.from(
  document.querySelectorAll(`.films-list__container`)
);

const [
  allContainer,
  topRatedContainer,
  mostCommentedContainer
] = moviesCategoeriesContainers;

const createFilmCard = (film, container) => {
  let filmCard = new Card(film);
  let myPopUp = new Popup(film);
  filmCard.render(container);

  filmCard.onClick = () => {
    myPopUp.render();
    filmCard.unrender();
  };

  myPopUp.onClose = updatedFilm => {
    myPopUp.unrender();

    filmCard.update(film);
    filmCard.render(container, filmCard.element);
  };
};
createFilmCard(film, allContainer);
