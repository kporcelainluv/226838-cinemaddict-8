import { filters, FILTER_TYPES } from "./filtersMock.js";
import { Component } from "./component.js";
import { createChart } from "./formStats.js";
// import { FILTER_TYPE }

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._amount = data.amount || null;
    this._type = data.type;
    this._filtersContainer = document.querySelector(".main-navigation");

    this._onFilter = this._onFilter.bind(this);
    this._onStats = this._onStats.bind(this);
  }
  set onFilter(f) {
    this._onFilter = f;
  }
  _onFilter(event) {
    event.preventDefault();
    this._onFilter(this._type);
  }

  _onStats() {
    const filmsSection = document.querySelector(`.films`);
    filmsSection.className += " visually-hidden";

    const statsSection = document.querySelector(`.statistic`);
    statsSection.className = "statistic";
    createChart();
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
    const thisBtn = document.querySelector(
      `.main-navigation-${this._name.toLowerCase().split(" ")[0]}`
    );
    thisBtn.addEventListener("click", this._onFilter);
  }
  removeEventListeners() {}

  makeFilterActive(filter) {
    filter.className += ` main-navigation__item--active`;
  }
}

export { Filter };
