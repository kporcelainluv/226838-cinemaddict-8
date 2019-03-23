import { filters } from "./filtersMock.js";
import { Component } from "./component.js";
import { createChart } from "./formStats.js";

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._amount = data.amount || null;
    this._filtersContainer = document.querySelector(".main-navigation");

    this._onFilter = this._onFilter.bind(this);
    this._onStats = this._onStats.bind(this);
  }
  set onFilter(f) {
    this._onFilter = f;
  }
  _onFilter(event) {
    event.preventDefault();
  }
  _onStats() {
    const filmsSection = document.querySelector(`.films`);
    filmsSection.className += " visually-hidden";

    const statsSection = document.querySelector(`.statistic`);
    statsSection.className = "statistic";
  }
  get template() {
    const filter = document.createElement("a");
    filter.className = `main-navigation__item main-navigation-${
      this._name.toLowerCase().split(" ")[0]
    }`;
    filter.href = `#${this._name.toLowerCase().split(" ")[0]}`;
    filter.textContent = `${this._name}`;
    if (this._name === `Stats`) {
      filter.className += ` main-navigation__item--additional`;
      const statsTemplate = document.querySelector(`.statistic`);
      statsTemplate.className += " visually-hidden";
    }
    if (this._amount) {
      const numberOfFilms = document.createElement("span");
      numberOfFilms.className = "main-navigation__item-count";
      numberOfFilms.textContent = `${this._amount}`;
      filter.appendChild(numberOfFilms);
    }
    return filter;
  }
  render() {
    this._element = this.template;
    this._filtersContainer.appendChild(this._element);
    this.addEventListeners();
  }
  addEventListeners() {
    const allMoviesBtn = document.querySelector(
      `.main-navigation-${this._name.toLowerCase().split(" ")[0]}`
    );
    if (allMoviesBtn) {
      allMoviesBtn.addEventListener("click", this._onFilter);
    }

    const watchListBtn = document.querySelector(".main-navigation-watchlist");
    if (watchListBtn) {
      watchListBtn.addEventListener("click", this._onFilter);
    }
    const historyBtn = document.querySelector(".main-navigation-history");
    if (historyBtn) {
      historyBtn.addEventListener("click", this._onFilter);
    }
    const favoritesBtn = document.querySelector(
      ".main-navigation__item main-navigation-favorites"
    );
    if (favoritesBtn) {
      favoritesBtn.addEventListener("click", this._onFilter);
    }
    const statsBtn = document.querySelector(".main-navigation-stats");
    if (statsBtn) {
      statsBtn.addEventListener("click", this._onStats);
    }
  }
  // removeEventListeners() {
  //   const allMoviesBtn = document.querySelector(".main-navigation-all");
  //   allMoviesBtn.removeEventListener("click", this._onFilter);
  //   const watchListBtn = document.querySelector(".main-navigation-watchlist");
  //   watchListBtn.removeEventListener("click", this._onFilter);
  //   const historyBtn = document.querySelector(".main-navigation-history");
  //   historyBtn.removeEventListener("click", this._onFilter);
  //   const favoritesBtn = document.querySelector(
  //     ".main-navigation__item main-navigation-favorites"
  //   );
  //   favoritesBtn.removeEventListener("click", this._onFilter);
  //   const statsBtn = document.querySelector(".main-navigation-stats");
  //   statsBtn.removeEventListener("click", this._onStats);
  // }

  makeFilterActive(filter) {
    filter.className += ` main-navigation__item--active`;
  }
}

export { Filter };
