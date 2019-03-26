import moment from "moment";
import { createChart } from "./formStats.js";
class Statistics {
  constructor(data) {
    this._element = null;
    this._amountOfFilms = data.amountOfFilms;
    if (data.duration === 0) {
      this._hours = 0;
      this._mins = 0;
    } else {
      this._hours = moment(data.duration).format(`h`);
      this._mins = moment(data.duration).format(`mm`);
    }
    this._topGenre = "";
    this._genres = data.genres;
    this._genreList = [];
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
    statisticsData[0].innerHTML = this._amountOfFilms;
    const amountOfFilmsDesc = document.createElement("span");
    amountOfFilmsDesc.innerHTML = "movies";
    amountOfFilmsDesc.className = "statistic__item-description";
    statisticsData[0].appendChild(amountOfFilmsDesc);
    const totalDuration = `${
      this._hours
    } <span class="statistic__item-description">h</span> ${
      this._mins
    } <span class="statistic__item-description"> m</span >`;
    statisticsData[1].innerHTML = totalDuration;

    this._topGenre = this._getTopGenre();
    statisticsData[2].innerHTML = `${this._topGenre}`;
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
    // this._element = null;
  }
}
export { Statistics };
