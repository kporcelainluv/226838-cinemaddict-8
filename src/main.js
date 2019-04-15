import { default as Card } from "./card.js";
import { Popup } from "./popup1.js";
import { default as Filter } from "./filter.js";
import { default as Observable } from "./observable";
import { default as Statistics } from "./statistics.js";
import { Film } from "./film";
import { Films } from "./films";
import { API } from "./fetch";
import Card1 from "./card1";

import { filtersData, FILTER_TYPES } from "./filtersMock.js";
import { films } from "./data.js";

import { getFilms, updateServerFilm } from "./fetch.js";

const createFilmCard = (film, container, pageState) => {
  const addControlToFilm = updatedFilm => {
    updateServerFilm(updatedFilm);
    pageState.update(state => {
      return {
        ...state,
        allFilms: Films.updateFilm(state.allFilms, updatedFilm)
      };
    });
  };
  const onAddToWatchList = addControlToFilm;
  const onMarkAsWatched = addControlToFilm;
  const onAddToFavourites = addControlToFilm;
  const onClickToComments = () => {
    let filmState = film;

    const {
      updateRating,
      addComment,
      showError,
      hideError,
      disableCommentForm,
      refreshComments,
      updateWatchedStatus
    } = Popup.render({
      film,
      eventHandlers: {
        onButtonClose: () => {
          Popup.unrender();
          pageState.update(state => {
            return {
              ...state,
              allFilms: Films.updateFilm(state.allFilms, filmState)
            };
          });
        },
        onUpdateRating: newRating => {
          filmState = Film.updatePersonalRating(newRating, filmState);
          updateRating(filmState);
        },
        onAddComment: newComment => {
          hideError();
          disableCommentForm();
          const newFilm = Film.addComment(newComment, filmState);
          API.updateServerFilm(newFilm)
            .then(() => {
              addComment(newComment, newFilm);
              filmState = newFilm;
            })
            .catch(() => {
              showError();
            });
        },
        onAddToFavourites: () => {
          filmState = Film.toggleFavorite(filmState);
        },
        onAddToWatchlist: () => {
          filmState = Film.toggleWatchlist(filmState);
        },
        onMarkAsWatched: () => {
          filmState = Film.toggleWatched(filmState);
          updateWatchedStatus(filmState);
        },
        onClickUndo: () => {
          filmState = Film.removeUserComments(filmState);
          refreshComments(filmState);
        }
      }
    });
  };

  const filmCard = Card1.render(
    film,
    {
      onAddToWatchList,
      onMarkAsWatched,
      onAddToFavourites,
      onClickToComments
    },
    container
  );
};

const clearFilmBoard = container => {
  container.innerHTML = "";
};

const clearFilters = () => {
  document.querySelector("nav.main-navigation").innerHTML = "";
};

const countWatchedFavoriteWatchlist = films => {
  let watched = 0;
  let favorite = 0;
  let watchlist = 0;
  for (let film of films) {
    if (film.watched) {
      watched += 1;
    }
    if (film.favorite) {
      favorite += 1;
    }
    if (film.watchlist) {
      watchlist += 1;
    }
  }
  return [watched, favorite, watchlist];
};

const createPage = (container, pageState) => {
  const { allFilms, filterType } = pageState.value;

  const films = Films.filterByType(allFilms, filterType);

  const [
    watchedFilms,
    favoriteFilms,
    watchlistFilms
  ] = countWatchedFavoriteWatchlist(allFilms);

  const filters = [
    { name: "All movies", type: FILTER_TYPES.all },
    { name: "Watchlist", type: FILTER_TYPES.watchlist },
    { name: "History", type: FILTER_TYPES.history },
    { name: "Favorites", type: FILTER_TYPES.favorites },
    {
      name: "Stats",
      type: FILTER_TYPES.stats
    }
  ];

  for (const filter of filters) {
    const f = new Filter(filter, watchedFilms, favoriteFilms, watchlistFilms);
    f.render();

    f.onFilter = filterType => {
      pageState.update(data => {
        return {
          ...data,
          filterType
        };
      });
    };
  }

  for (let film of films) {
    createFilmCard(film, container, pageState);
  }
};

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

const pageState = new Observable({
  filterType: FILTER_TYPES.all,
  allFilms: films,
  filmsToDisplay: {
    [FILTER_TYPES.all]: 5,
    [FILTER_TYPES.watchlist]: 5,
    [FILTER_TYPES.history]: 5,
    [FILTER_TYPES.favorites]: 5
  }
});

pageState.subscribe(({ filterType, allFilms }) => {
  if (filterType === FILTER_TYPES.stats) {
    displayFilmsContainer(false);
    const stats = new Statistics(allFilms);
    stats.render();
  } else {
    displayFilmsContainer(true);
    clearFilters();
    clearFilmBoard(allContainer);
    const statsSection = document.querySelector(".statistic");
    if (statsSection) {
      clearFilmBoard(statsSection);
    }

    createPage(allContainer, pageState);
  }
});

pageState.notify();

getFilms().then(fetchedFilms => {
  pageState.update(s => {
    return {
      ...s,
      allFilms: fetchedFilms
    };
  });
});
