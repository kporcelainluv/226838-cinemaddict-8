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

const [all, topRated, mostCommented] = moviesCategoeriesContainers;
const createFilmCard = () => {
  let filmCard = new Card(film);
  let myPopUp = new Popup(film);
  filmCard.render(all);

  filmCard.onClick = () => {
    let mainContainer = document.querySelector(`body`);
    myPopUp.render();
    mainContainer.appendChild(myPopUp.element);
    filmCard.unrender();
  };

  myPopUp.onClose = newObject => {
    film.raiting = newObject.raiting;
    let mainContainer = document.querySelector(`body`);
    const deletingPopUp = document.querySelector(`.popup-portal`);
    mainContainer.removeChild(deletingPopUp);

    filmCard.update(film);
    filmCard.render(all, filmCard.element);
    myPopUp.unrender();
  };
};
createFilmCard();
