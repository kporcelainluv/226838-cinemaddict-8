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

  myPopUp.onClose = newObject => {
    film.raiting = newObject.raiting;
    film.amountOfComments = newObject.amountOfComments;
    let mainContainer = document.querySelector(`body`);
    const deletingPopUp = document.querySelector(`.popup-portal`);
    mainContainer.removeChild(deletingPopUp);

    filmCard.update(film);
    filmCard.render(container, filmCard.element);
    myPopUp.unrender();
  };
};
createFilmCard(film, allContainer);
