import { default as Card } from "./card.js";
import { Popup } from "./popup1.js";
import { default as Filter } from "./filter.js";
import { default as Observable } from "./observable";
import { default as Statistics } from "./statistics.js";
import { Film } from "./film";
import { API } from "./fetch";
import Card1 from "./card1";

import { filtersData, FILTER_TYPES } from "./filtersMock.js";
import { films } from "./data.js";

import { getFilms, updateServerFilm } from "./fetch.js";

const createFilmCard = (film, container, pageState) => {
  const addControlToFilm = updatedFilm => {
    updateServerFilm(updatedFilm);
    pageState.update(({ allFilms, ...otherData }) => {
      for (let filmData of allFilms) {
        //
      }
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
  const onAddToWatchList = addControlToFilm;
  const onMarkAsWatched = addControlToFilm;
  const onAddToFavourites = addControlToFilm;
  const loadNextFIveFilms = () => {};
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
            const updatedAllFilms = state.allFilms.map(f => {
              if (Film.equals(f, filmState)) {
                return filmState;
              }
              return f;
            });

            return {
              ...state,
              allFilms: updatedAllFilms
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
      onClickToComments,
      loadNextFIveFilms
    },
    container
  );
};

const createFilmBoard = (films, container, pageState) => {
  for (let film of films) {
    createFilmCard(film, container, pageState);
  }
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
const createPage = (allFilms, filterType, container, pageState) => {
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

  const [
    watchedFilms,
    favoriteFilms,
    watchlistFilms
  ] = countWatchedFavoriteWatchlist(allFilms);

  filtersData.map(elm => {
    const filter = new Filter(elm, watchedFilms, favoriteFilms, watchlistFilms);
    filter.render();

    filter.onFilter = filterType => {
      pageState.update(data => {
        return {
          ...data,
          filterType
        };
      });
    };
  });
  createFilmBoard(films, container, pageState);
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
      genres.push(...film.genre);
    }
  }
  return { amountOfFilms, duration, genres };
};

pageState.subscribe(({ filterType, allFilms }) => {
  if (filterType === FILTER_TYPES.stats) {
    displayFilmsContainer(false);
    const stats = new Statistics(createDataForStats(allFilms));
    stats.render();
  } else {
    displayFilmsContainer(true);
    clearFilters();
    clearFilmBoard(allContainer);
    const statsSection = document.querySelector(".statistic");
    if (statsSection) {
      clearFilmBoard(statsSection);
    }

    createPage(allFilms, filterType, allContainer, pageState);
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
