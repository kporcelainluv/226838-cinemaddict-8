export const Film = {
  isFavorite: film => film.favorite,
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
  getComments: film => film.comments
};
