import { Card } from "./card.js";
import { film, films } from "./data.js";
import { Popup } from "./popup.js";
import { filtersData, FILTER_TYPES } from "./filtersMock.js";
import { Filter } from "./filter.js";
import { Observable } from "./observable";
import { Statistics } from "./statistics.js";

const createFilmCard = (film, container) => {
  const filmCard = new Card(film, container);
  const myPopUp = new Popup(film);
  filmCard.render();
  filmCard.onClick = () => {
    myPopUp.render();
  };

  myPopUp.onClose = updatedFilm => {
    myPopUp.unrender();
    const oldCard = filmCard.element;
    film.rating = updatedFilm.rating;
    film.comments = updatedFilm.comments;

    filmCard.update(film);
    filmCard.render();
    const newCard = filmCard.element;
    filmCard.replacewith(oldCard, newCard);

    // const newCard = createFilmCard(updatedFilm, container, index);
  };
  filmCard.onAddToWatchList = updatedFilm => {
    page.update(({ allFilms, ...otherData }) => {
      const updatedAllFilms = allFilms.map(film => {
        if (film.id === updatedFilm.id) {
          return updatedFilm;
        }
        return film;
      });

      return {
        ...otherData,
        allFilms: updatedAllFilms
      };
    });
  };
  filmCard.onMarkAsWatched = updatedFilm => {
    page.update(({ allFilms, ...otherData }) => {
      const updatedAllFilms = allFilms.map(film => {
        if (film.id === updatedFilm.id) {
          return updatedFilm;
        }
        return film;
      });

      return {
        ...otherData,
        allFilms: updatedAllFilms
      };
    });
  };
};

const createFilmBoard = (films, container) => {
  for (let film of films) {
    createFilmCard(film, container);
  }
};

const clearFilmBoard = container => {
  container.innerHTML = "";
};

const clearFilters = () => {
  document.querySelector("nav.main-navigation").innerHTML = "";
};

const createPage = (films, container, page) => {
  filtersData.map(elm => {
    const filter = new Filter(elm);
    filter.render();

    filter.onFilter = filterType => {
      page.update(data => {
        return {
          ...data,
          filterType
        };
      });
    };
  });
  createFilmBoard(films, container);
};

// add film cards
const moviesCategoeriesContainers = Array.from(
  document.querySelectorAll(`.films-list__container`)
);

const [
  allContainer,
  topRatedContainer,
  mostCommentedContainer
] = moviesCategoeriesContainers;

const displayFilmsContainer = bool => {
  if (!bool) {
    const filmsContainer = document.querySelector(`.films`);
    filmsContainer.className += " visually-hidden";
  } else {
    const filmsContainer = document.querySelector(`.films`);
    filmsContainer.className = "films";
  }
};

const page = new Observable({
  filterType: FILTER_TYPES.all,
  allFilms: films
});

const createDataForStats = currentFilmsData => {
  currentFilmsData = Array.from(currentFilmsData);
  let amountOfFilms = 0;
  let duration = 0;
  let genres = [];
  for (const film of currentFilmsData) {
    if (film.watched) {
      amountOfFilms += 1;
      duration += film.duration;
      genres.push(film.genre);
    }
  }
  return { amountOfFilms, duration, genres };
};

page.subscribe(({ filterType, allFilms }) => {
  const currentFilmsData = page.currentData().allFilms;
  const stats = new Statistics(createDataForStats(currentFilmsData));
  stats.unrender();
  if (filterType === FILTER_TYPES.stats) {
    displayFilmsContainer(false);
    stats.render();
  } else {
    displayFilmsContainer(true);
    clearFilters();
    clearFilmBoard(allContainer);
    const films = allFilms.filter(film => {
      if (filterType === FILTER_TYPES.all) {
        return true;
      } else if (filterType === FILTER_TYPES.favorites) {
        return film.favorites;
      } else if (filterType === FILTER_TYPES.watchlist) {
        return film.watchlist;
      } else if (filterType === FILTER_TYPES.history) {
        return film.watched;
      }
    });

    createPage(films, allContainer, page);
  }
});

page.notify();
