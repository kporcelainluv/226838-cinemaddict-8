import { Film } from "./film";
import { FILTER_TYPES } from "./filtersMock";

export const Films = {
  filterByType: (films, type) => {
    return films.filter(film => {
      if (type === FILTER_TYPES.all) {
        return true;
      } else if (type === FILTER_TYPES.favorites) {
        return Film.isFavorite(film);
      } else if (type === FILTER_TYPES.watchlist) {
        return Film.isInWatchlist(film);
      } else if (type === FILTER_TYPES.history) {
        return Film.isWatched(film);
      }
    });
  },
  getTotalDuration: films =>
    films.reduce(
      (totalDuration, film) => totalDuration + Film.getDuration(film)
    ),
  filterWatched: films => films.filter(film => Film.isWatched(film))
};
