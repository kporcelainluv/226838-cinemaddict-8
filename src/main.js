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

// const myCardNew = new Card(film);
// const myPopUp = new Popup(film);

const [all, topRated, mostCommented] = moviesCategoeriesContainers;
// myCardNew.render(all);

// myCardNew.onClick = () => {
//   let mainContainer = document.querySelector("body");
//   myPopUp.render();
//   mainContainer.appendChild(myPopUp.element);
// };

// myPopUp.onClose = () => {
//   let mainContainer = document.querySelector("body");
//   const deletingPopUp = document.querySelector(".popup-portal");
//   mainContainer.removeChild(deletingPopUp);
// };

for (let i = 0; i <= 6; i++) {
  let myCardNew = new Card(film);
  let myPopUp = new Popup(film);
  myCardNew.render(all);
  // if (i < 2) {
  //   myCardNew.render(topRated);
  //   myCardNew.render(mostCommented);
  // }
  myCardNew.onClick = () => {
    let mainContainer = document.querySelector("body");
    myPopUp.render();
    mainContainer.appendChild(myPopUp.element);
    myCardNew.unrender();
  };

  myPopUp.onClose = () => {
    let mainContainer = document.querySelector("body");
    const deletingPopUp = document.querySelector(".popup-portal");
    mainContainer.removeChild(deletingPopUp);
  };
}
