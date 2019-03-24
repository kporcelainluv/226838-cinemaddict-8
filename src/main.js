import { Card } from "./card.js";
import { film, films as filmList } from "./data.js";
import { Popup } from "./popup.js";
import { filtersData, FILTER_TYPES } from "./filtersMock.js";
import { Filter } from "./filter.js";

let films = filmList;

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
    console.log(filmCard, "watched");
    const updatedFilms = updateFilms(films, updatedFilm);
    clearFilmBoard(container);
    createFilmBoard(updateFilms, container);
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

const createPage = (films, container) => {
  filtersData.map(elm => {
    const filter = new Filter(elm);
    filter.render();

    filter.onFilter = filterType => {
      clearFilmBoard(container);
      const filteredFilms = films.filter(film => {
        if (filterType === FILTER_TYPES.all) {
          return true;
        } else if (filterType === FILTER_TYPES.favorites) {
          console.log(film.favorites);
          return film.favorites;
        } else if (filterType === FILTER_TYPES.watchlist) {
          console.log(film.watchlist);
          return film.watchlist;
        }
      });
      createFilmBoard(filteredFilms, container);
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

createPage(films, allContainer);
