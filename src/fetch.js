import "whatwg-fetch";

const tranform = films => {
  const arr = [];
  for (let film of films) {
    let filmInfo = {};
    filmInfo.id = film.id;
    filmInfo.descriptionText = film.film_info.description;
    filmInfo.rating = film.film_info.total_rating;
    filmInfo.actors = film.film_info.actors;
    filmInfo.name = film.film_info.title;
    filmInfo.director = film.film_info.director;
    filmInfo.genre = film.film_info.genre;
    filmInfo.posters = film.film_info.poster;
    filmInfo.year = film.film_info.release.date;
    filmInfo.country = film.film_info.release.release_country;
    filmInfo.duration = film.film_info.runtime;
    filmInfo.writes = film.film_info.writes || [];
    filmInfo.comments = film.comments;
    filmInfo.comments.data = film.comments.date;
    filmInfo.comments.text = film.comments.comment;
    filmInfo.watched = film.user_details.already_watched;
    filmInfo.watchlist = film.user_details.watchlist;
    filmInfo.favorite = film.user_details.favorite;
    filmInfo.controls = true;
    filmInfo.amountOfComments = film.comments.length;
    arr.push(filmInfo);
  }
  return arr;
};

const getData = (url, method, body) => {
  const headers = new Headers();
  headers.append("Authorization", "Basic yukz590ik29889a");
  return window
    .fetch(`https://es8-demo-srv.appspot.com/moowle/${url}`, {
      method,
      body,
      headers
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Неизвестный статус: ${response.status} ${response.statusText}`
        );
      }
    });
};
const getTasks = () => {
  const url = `movies`;
  const method = `GET`;
  const body = null;
  return getData(url, method, body).then(json => {
    return tranform(json);
  });
};

const createTask = ({ task }) => {};

const updateTask = ({ id, data }) => {};

const deleteTask = ({ id }) => {};

export { getTasks };
