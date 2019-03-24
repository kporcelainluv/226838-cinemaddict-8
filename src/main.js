import { Card } from "./card.js";
import { film, films } from "./data.js";
import { Popup } from "./popup.js";
import { filtersData, FILTER_TYPES } from "./filtersMock.js";
import { Filter } from "./filter.js";
import { Observable } from "./observable";

const updateFilms = (films, film) => {
  return films.map(f => {
    if (f.id === film.id) {
      return film;
    }
    return f;
  });
};

const createFilmCard = (film, container, index) => {
  const filmCard = new Card(film, container);
  const myPopUp = new Popup(film);
  filmCard.render(index);
  filmCard.onClick = () => {
    myPopUp.render();
  };

  myPopUp.onClose = updatedFilm => {
    myPopUp.unrender();
    const oldCard = filmCard.element;
    film.rating = updatedFilm.rating;
    film.comments = updatedFilm.comments;

    filmCard.update(film);
    filmCard.render(index);
    const newCard = filmCard.element;
    filmCard.replacewith(oldCard, newCard);

    // const newCard = createFilmCard(updatedFilm, container, index);
  };
  filmCard.onAddToWatchList = () => {
    console.log(filmCard, "watchlist");
  };
  filmCard.onMarkAsWatched = updatedFilm => {
    page.update(({ allFilms, ...otherData }) => {
      const updatedAllFilms = allFilms.map(film => {
        if (film.id === updateFilm.id) {
          return updatedFilm;
        }
        return film;
      });

      return {
        ...otherData,
        allFilms: updateFilms
      };
    });
  };
};

const createFilmBoard = (films, container) => {
  let index = 0;
  for (let film of films) {
    createFilmCard(film, container, index);
    index += 1;
  }
};

const clearFilmBoard = container => {
  container.innerHtml = "";
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

const page = new Observable({
  filterType: FILTER_TYPES.all,
  allFilms: films
});

page.subscribe(({ filterType, allFilms }) => {
  const films = allFilms.filter(film => {
    if (filterType === FILTER_TYPES.all) {
      return true;
    } else if (filterType === FILTER_TYPES.favorites) {
      return film.favorites;
    } else if (filterType === FILTER_TYPES.watchlist) {
      return film.watchlist;
    }
  });

  clearFilters();
  clearFilmBoard(allContainer);
  createPage(films, allContainer, page);
});

page.notify();
