import { Film } from "./film";
import { FILTER_TYPES } from "./filtersMock";

export const Films = {
  filterByType: (films, type) => {
    switch (type) {
      case FILTER_TYPES.favorites:
        return films.filter(film => Film.isFavorite(film));
        return films.filter(Film.isFavorite);
      case FILTER_TYPES.watchlist:
        return films.filter(Film.isInWatchlist);
      case FILTER_TYPES.history:
        return films.filter(Film.isWatched);
      default:
        return films;
    }
  },
  getTotalDuration: films =>
    films.reduce(
      (totalDuration, film) => totalDuration + Film.getDuration(film)
    ),
  updateFilm: (films, film) => films.map(f => (Film.equals(f, film) ? film : f))
};