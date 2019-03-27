import { default as Component } from "./component.js";

export default class Filter extends Component {
  constructor(data, watchedFilms, favoriteFilms, watchlistFilms) {
    super();
    this._name = data.name;
    this._amountPresense = data.hasOwnProperty("amount");
    this._amount = data.amount;
    this._type = data.type;
    this._watchedFilms = watchedFilms;
    this._favoriteFilms = favoriteFilms;
    this._watchlistFilms = watchlistFilms;
    this._filtersContainer = document.querySelector(".main-navigation");

    this._onFilter = this._onFilter.bind(this);
  }
  set onFilter(f) {
    this._onFilter = f;
  }
  _onFilter(event) {
    event.preventDefault();
    this._onFilter(this._type);
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
    }
    if (this._amountPresense) {
      const numberOfFilms = document.createElement("span");
      numberOfFilms.className = "main-navigation__item-count";

      switch (this._type) {
        case "Watchlist":
          numberOfFilms.textContent = `${this._watchlistFilms}`;
          break;
        case "History":
          numberOfFilms.textContent = `${this._watchedFilms}`;
          break;
        case "Favorite":
          numberOfFilms.textContent = `${this._favoriteFilms}`;
          break;
      }
      filter.appendChild(numberOfFilms);
    }
    return filter;
  }
  render() {
    this._element = this.template;
    this._filtersContainer.appendChild(this._element);
    this._addEventListeners();
  }

  _addEventListeners() {
    const thisBtn = document.querySelector(
      `.main-navigation-${this._name.toLowerCase().split(" ")[0]}`
    );
    thisBtn.addEventListener("click", this._onFilter);
  }
  _removeEventListeners() {}

  makeFilterActive(filter) {
    filter.className += ` main-navigation__item--active`;
  }
}
