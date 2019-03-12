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
const myCardNew = new Card(film);

const moviesCategoeriesContainers = Array.from(
  document.querySelectorAll(`.films-list__container`)
);
const [all, topRated, mostCommented] = moviesCategoeriesContainers;
myCardNew.render(all);
const myPopUp = new Popup(film);
myPopUp.render();

// // add films to section with All films
// for (let filmsAmount = 0; filmsAmount <= 15; filmsAmount++) {
//   let newElem = createFilmCard(
//     film.name,
//     film.descriptionText,
//     film.posters,
//     film.controls
//   );
//   all.appendChild(newElem);
// }
// // add films to section with Top films
// for (let filmsAmount = 0; filmsAmount < 4; filmsAmount++) {
//   let newElem = createFilmCard(
//     film.name,
//     film.descriptionText,
//     film.posters,
//     (film.controls = false)
//   );
//   topRated.appendChild(newElem);
// }
// // add films to section with Commented films
// for (let filmsAmount = 0; filmsAmount < 4; filmsAmount++) {
//   let newElem = createFilmCard(
//     film.name,
//     film.descriptionText,
//     film.posters,
//     (film.controls = false)
//   );
//   mostCommented.appendChild(newElem);
// }
