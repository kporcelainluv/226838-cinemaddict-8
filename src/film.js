export const Film = {
  isFavorite: film => film.favorite,
  isWatched: film => film.watched,
  isInWatchlist: film => film.watchlist,
  toggleFavorite: film => ({ ...film, favorite: !film.favorite }),
  getPersonalRating: film => film.personalRating,
  updatePersonalRating: (newPersonalRating, film) => ({
    ...film,
    personalRating: newPersonalRating
  }),
  addComment: (newComment, film) => ({
    ...film,
    comments: [...film.comments, newComment]
  }),
  getComments: film => film.comments,
  toggleWatched: film => {
    return {
      ...film,
      watched: !film.watched
    };
  },
  toggleWatched: film => {
    return {
      ...film,
      watched: !film.watched
    };
  },
  toggleFavorite: film => {
    return {
      ...film,
      favorite: !film.favorite
    };
  },
  toggleWatchlist: film => {
    return {
      ...film,
      watchlist: !film.watchlist
    };
  },
  equals: (f1, f2) => {
    return f1.id === f2.id;
  },
  hasUserComments: film => {
    return film.comments.some(f => f.author === `You`);
  },
  removeUserComments: film => {
    return {
      ...film,
      comments: film.comments.filter(comment => {
        if (comment.author === "You") {
          return false;
        }
        return true;
      })
    };
  }
};
