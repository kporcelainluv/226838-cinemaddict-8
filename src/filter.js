const filters = [
  { name: `All movies` },
  { name: `Watchlist`, filmsAmount: "13" },
  { name: `History`, filmsAmount: "4" },
  { name: `Favorites`, filmsAmount: "8" },
  { name: `Stats` }
];

const makeFilterActive = filter => {
  filter.className += ` main-navigation__item--active`;
};

const createFilter = filter => {
  const filterContainer = document.querySelector(".main-navigation");

  const filterLink = document.createElement("a");
  filterLink.className = "main-navigation__item";
  filterLink.href = `#${filter["name"].toLowerCase().split(" ")[0]}`;
  filterLink.textContent = `${filter["name"]}`;
  if (filter["name"] === `Stats`) {
    filterLink.className += ` main-navigation__item--additional`;
  }

  if (filter.hasOwnProperty("filmsAmount")) {
    const numberOfFilms = document.createElement("span");
    numberOfFilms.className = "main-navigation__item-count";
    numberOfFilms.textContent = `${filter["filmsAmount"]}`;
    filterLink.appendChild(numberOfFilms);
  }
  filterContainer.appendChild(filterLink);
};
const displayFilters = (filters, createFilter, makeFilterActive) => {
  filters.map(elm => createFilter(elm));

  const firstFilter = Array.from(
    document.querySelectorAll(".main-navigation__item")
  )[0];

  makeFilterActive(firstFilter);
};

export { displayFilters, filters, createFilter, makeFilterActive };
