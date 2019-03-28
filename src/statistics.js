import moment from "moment";
import { createChart } from "./formStats.js";
export default class Statistics {
  constructor(data) {
    this._element = null;
    this._amountOfFilms = data.amountOfFilms;
    this._duration = data.duration;
    this._topGenre = "";
    this._genres = data.genres;
    this._genreList = {};
    this._parent = document.querySelector(`.main`);
  }
  _getTopGenre() {
    const allGenres = {};
    for (let genre of this._genres) {
      if (allGenres.hasOwnProperty(genre)) {
        allGenres[genre] = allGenres[genre] + 1;
      } else {
        allGenres[genre] = 1;
      }
    }
    this._genreList = allGenres;
    console.log("here", this._genreList);
    const listOfGenres = Object.entries(allGenres);
    listOfGenres.sort((a, b) => {
      return b[1] - a[1];
    });

    let topGenre = "None";
    if (listOfGenres.length > 0) {
      topGenre = listOfGenres[0][0];
    }
    return topGenre;
  }
  get template() {
    const stats = document
      .querySelector(`.statistics-template`)
      .content.querySelector(`.statistic`)
      .cloneNode(true);
    const statisticsData = stats.querySelectorAll(`.statistic__item-text`);
    statisticsData[0].textContent = this._amountOfFilms;
    const amountOfFilmsDesc = document.createElement("span");
    amountOfFilmsDesc.textContent = "movies";
    amountOfFilmsDesc.className = "statistic__item-description";
    statisticsData[0].appendChild(amountOfFilmsDesc);
    const hours = Math.floor(this._duration / 60) || "";
    const minutes = this._duration % 60 || "";
    const totalDuration = `${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description"> m</span >`;
    statisticsData[1].innerHTML = totalDuration;

    this._topGenre = this._getTopGenre();
    statisticsData[2].textContent = `${this._topGenre}`;
    return stats;
  }
  render() {
    this._element = this.template;
    const statsSection = document.querySelector(".statistic");

    if (statsSection) {
      this._parent.removeChild(statsSection);
    }
    this._parent.appendChild(this._element);
    createChart(this._genreList);
  }

  unrender() {
    if (this._element) {
      this._parent.removeChild(this._element);
    }
  }
}
