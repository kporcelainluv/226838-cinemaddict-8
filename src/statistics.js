import { Component } from "./component.js";

class Statistics extends Component {
  constructor(data) {
    super();
    this._amountOfFilms = data.amountOfFilms;
    this._duration = data.duration;
    this._topGenre = data.genre;
    this._parent = document.querySelector(`.main`);
  }
  get template() {
    const stats = document
      .querySelector(`.statistics-template`)
      .content.querySelector(`.statistic`)
      .cloneNode(true);
    const statisticsData = stats.querySelectorAll(`.statistic__item-text`);
    statisticsData[0].innerHTML = 22;
    const amountOfFilmsDesc = document.createElement("span");
    amountOfFilmsDesc.innerHTML = "movies";
    amountOfFilmsDesc.className = "statistic__item-description";
    statisticsData[0].appendChild(amountOfFilmsDesc);

    const totalDuration = `${130} <span class="statistic__item-description">h</span> ${22} <span class="statistic__item-description"> m</span >`;
    statisticsData[1].innerHTML = totalDuration;

    statisticsData[2].innerHTML = "Sci-Fi";
    return stats;
  }
  render() {
    this._element = this.template;
    this._parent.appendChild(this._element);
  }
  display() {
    const statsSection = document.querySelector(`.statistic`);
    statsSection.className = "statistic";
  }
}
export { Statistics };
