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
    console.log("b", film.raiting);
    film.name = newObject.name;
    film.raiting = newObject.raiting;
    film.descriptionText = newObject.descriptionText;
    film.posters = newObject.posters;
    film.year = newObject.year;
    film.duration = newObject.duration;
    film.genre = newObject.genre;

    let mainContainer = document.querySelector(`body`);
    const deletingPopUp = document.querySelector(`.popup-portal`);
    mainContainer.removeChild(deletingPopUp);
    console.log("after", film.raiting);
    filmCard.update(film);
  };
};
createFilmCard();
