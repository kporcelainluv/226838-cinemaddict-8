import {
  displayFilters,
  filters,
  createFilter,
  makeFilterActive
} from "./filter.js";
import { listOfAllFilmCards } from "./card.js";
// display filters
displayFilters(filters, createFilter, makeFilterActive);

//display film cards
const moviesCategoeriesContainers = Array.from(
  document.querySelectorAll(".films-list__container")
);
let index = 0;
for (let container of moviesCategoeriesContainers) {
  for (let i = index; i < index + 2; i++) {
    container.appendChild(listOfAllFilmCards[i]);
  }
  index += 2;
}
