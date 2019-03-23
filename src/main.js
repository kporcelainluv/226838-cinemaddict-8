import { Card } from "./card.js";
import { film, films } from "./data.js";
import { Popup } from "./popup.js";
import { filtersData } from "./filtersMock.js";
import { Filter } from "./filter.js";

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
  filmCard.onAddToWatchList = () => {};
  filmCard.onMarkAsWatched = () => {};
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
  // display filters
  filtersData.map(elm => {
    const filter = new Filter(elm);
    filter.render();

    filter.onFilter = () => {
      console.log("HERE");
      clearFilmBoard();
      const filteredFilms = films.filter(() => true);
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
