import {
  displayFilters,
  filters,
  createFilter,
  makeFilterActive
} from "./filter.js";

import { Card } from "./card.js";
import { film, films } from "./data.js";
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
  const filmCard = new Card(film, container);
  const myPopUp = new Popup(film);
  filmCard.render();

  filmCard.onClick = () => {
    myPopUp.render();
  };

  myPopUp.onClose = updatedFilm => {
    myPopUp.unrender();
    filmCard.unrender();
    createFilmCard(updatedFilm, container);
  };
};
let index = 0;
for (let film of films) {
  createFilmCard(film, allContainer, index);
  index += 1;
}
