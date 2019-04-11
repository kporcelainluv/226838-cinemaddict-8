import "whatwg-fetch";

import { tranform, toRaw } from "./transformers.js";

const getData = (url, method, body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Basic yukz590ik29889a");
  return window
    .fetch(`https://es8-demo-srv.appspot.com/moowle/${url}`, {
      method,
      body,
      headers
    })
    .then(response => {
      if (response.ok) {
        const message = document.querySelector(".loading");
        message.className += " visually-hidden";
        return response.json();
      }
    })
    .catch(err => {
      const errorMessage = document.querySelector(`.error`);
      errorMessage.className = "error";
    });
};

const getFilms = () => {
  const url = `movies`;
  const method = `GET`;
  const body = null;
  return getData(url, method, body).then(json => {
    return tranform(json);
  });
};

const updateServerFilm = data => {
  const url = `movies/${data.id}`;
  const method = `PUT`;
  const body = JSON.stringify(toRaw(data));
  return getData(url, method, body);
};

const addComment = ({ id, data }) => {};

const addRating = ({ id, data }) => {};

export { getFilms, updateServerFilm };

export const API = {
  updateServerFilm
};
