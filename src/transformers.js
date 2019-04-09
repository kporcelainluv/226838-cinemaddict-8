export const tranform = films => {
  const arr = [];
  for (let film of films) {
    let filmInfo = {};
    filmInfo.id = film.id;
    filmInfo.descriptionText = film.film_info.description;
    filmInfo.age_rating = film.film_info.age_rating;
    filmInfo.totalRating = film.film_info.total_rating;
    filmInfo.actors = film.film_info.actors;
    filmInfo.name = film.film_info.title;
    filmInfo.director = film.film_info.director;
    filmInfo.alternativeName = film.film_info.alternative_title;
    filmInfo.director = film.film_info.director;
    filmInfo.genre = film.film_info.genre;
    filmInfo.poster = film.film_info.poster;
    filmInfo.releaseDate = film.film_info.release.date;
    filmInfo.country = film.film_info.release.release_country;
    filmInfo.duration = film.film_info.runtime;
    filmInfo.writers = film.film_info.writers || film.film_info.writes || [];
    filmInfo.comments = film.comments;

    filmInfo.watched = film.user_details.already_watched;
    filmInfo.watchlist = film.user_details.watchlist;
    filmInfo.favorite = film.user_details.favorite;
    filmInfo.watching_date = film.user_details.watching_date;
    filmInfo.controls = true;
    filmInfo.personalRating = film.user_details.personal_rating;

    arr.push(filmInfo);
  }
  return arr;
};

export const toRaw = data => {
  let film = {};
  film["film_info"] = {};
  film["film_info"]["release"] = {};
  film["comments"] = {};
  film["user_details"] = {};

  film.id = data.id;
  film.film_info.description = data.descriptionText;
  film.film_info.age_rating = data.age_rating;
  film.film_info.total_rating = data.totalRating;
  film.film_info.actors = data.actors;
  film.film_info.title = data.name;
  film.film_info.director = data.director;
  film.film_info.alternative_title = data.alternativeName;
  film.film_info.director = data.director;
  film.film_info.genre = data.genre;
  film.film_info.poster = data.poster;
  film.film_info.release.date = data.releaseDate;
  film.film_info.release.release_country = data.country;

  film.film_info.runtime = data.duration;
  film.film_info.writers = data.writers || [];
  film.comments = data.comments;

  film.user_details.already_watched = data.watched;
  film.user_details.watchlist = data.watchlist;
  film.user_details.favorite = data.favorite;
  film.user_details.personal_rating = data.personalRating;
  film.user_details.watching_date = data.watching_date;
  return film;
};
