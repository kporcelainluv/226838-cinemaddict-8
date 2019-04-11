import { default as Component } from "./component.js";
import { Film } from "./film";
import moment from "moment";

const Template = {
  getCommentInput: t => t.querySelector(`.film-details__comment-input`)
};

const getEmoji = key => {
  switch (key) {
    case `sleeping`:
      return `😴`;
    case `neutral-face`:
      return `😐`;
    case `grinning`:
      return `😀`;
    default:
      return ``;
  }
};

const updateRating = template => film => {
  const personalRating = Film.getPersonalRating(film);
  template.querySelector(
    `.film-details__user-rating`
  ).innerText = `Your rate ${personalRating}`;
};

const getTemplate = (film, createComment) => {
  const {
    name,
    poster,
    alternativeName,
    director,
    writers,
    actors,
    country,
    releaseDate,
    duration,
    genre,
    descriptionText,
    age_rating,
    personalRating,
    comments,
    watchlist,
    watched,
    favorite,
    totalRating
  } = film;

  const popUpTemplate = document
    .querySelector(`.popup-template`)
    .content.querySelector(`.film-details`)
    .cloneNode(true);

  popUpTemplate.querySelector(`.film-details__title`).innerText = name;
  popUpTemplate.querySelector(
    `.film-details__user-rating-title`
  ).innerText = name;
  popUpTemplate.querySelector(`.film-details__poster-img`).src = poster;
  popUpTemplate.querySelector(`.film-details__user-rating-img`).src = poster;
  popUpTemplate.querySelector(
    `.film-details__title-original`
  ).innerText = `Original: ${alternativeName}`;
  const filmInfo = popUpTemplate.querySelectorAll(`.film-details__cell`);
  filmInfo[0].innerText = director;
  filmInfo[1].innerText = writers;
  filmInfo[2].innerText = actors;
  filmInfo[3].innerText = `${moment(releaseDate).format(
    `DD.MM.YYYY`
  )} (${country})`;

  filmInfo[4].innerText = `${duration} min`;
  filmInfo[5].innerText = country;
  filmInfo[6].innerText = genre;
  popUpTemplate.querySelector(
    `.film-details__film-description`
  ).innerText = descriptionText;
  popUpTemplate.querySelector(
    `.film-details__comments-title`
  ).innerText = `Comments ${comments.length}`;

  popUpTemplate.querySelector(
    `.film-details__age`
  ).innerText = `${age_rating}+`;
  popUpTemplate.querySelector(
    `.film-details__total-rating`
  ).innerText = totalRating;

  updateRating(popUpTemplate)(film);

  const commentsFiled = popUpTemplate.querySelector(
    `.film-details__comments-list`
  );

  for (let comment of comments) {
    commentsFiled.appendChild(createComment(comment));
  }
  const ratingValueButton = popUpTemplate.querySelectorAll(
    `.film-details__user-rating-input`
  );

  for (let button of ratingValueButton) {
    if (parseInt(button.value) === Math.floor(personalRating)) {
      button.checked = true;
    }
  }
  const filmControls = popUpTemplate.querySelectorAll(
    ".film-details__control-input"
  );
  filmControls[0].checked = watchlist;
  filmControls[1].checked = watched;
  filmControls[2].checked = favorite;
  return popUpTemplate;
};

const createComment = comment => {
  const li = document.createElement("li");
  li.className = "film-details__comment";
  const span = document.createElement("span");
  span.innerText = getEmoji(comment.emotion);
  span.className = "film-details__comment-emoji";
  const div = document.createElement("div");
  const pText = document.createElement("p");
  pText.className = "film-details__comment-text";
  const pInfo = document.createElement("p");
  pInfo.innerText = comment.comment || comment.text;
  pInfo.className = "film-details__comment-info";
  const spanAuthor = document.createElement("span");
  spanAuthor.className = `film-details__comment-author`;
  spanAuthor.innerText = comment.author;
  const spanDate = document.createElement("span");
  spanDate.className = "film-details__comment-day";
  spanDate.innerText = moment(comment.date)
    .startOf("day")
    .fromNow();
  pInfo.appendChild(spanAuthor);
  pInfo.appendChild(spanDate);
  div.appendChild(pText);
  div.appendChild(pInfo);
  li.appendChild(span);
  li.appendChild(div);
  return li;
};

const createUserComment = ({ text, emotion }) => {
  return {
    comment: text,
    date: parseInt(moment(Date.now()).format("x")),
    author: "You",
    emotion
  };
};

const addEventListeners = (
  template,
  {
    onButtonClose,
    onUpdateRating,
    onAddComment,
    onAddToFavourites,
    onAddToWatchlist,
    onMarkAsWatched
  }
) => {
  const popUpClose = template.querySelector(`.film-details__close-btn`);
  popUpClose.addEventListener(`click`, onButtonClose);

  const formUpdateRating = template.querySelectorAll(
    `.film-details__user-rating-input`
  );
  for (let rating of formUpdateRating) {
    rating.addEventListener(`click`, e => {
      const selectedRating = 8;
      onUpdateRating(selectedRating);
    });
  }

  const formAddComment = template.querySelector(`.film-details__new-comment`);
  formAddComment.addEventListener(`submit`, e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const [text, emotion] = [
      formData.get(`comment`),
      formData.get(`comment-emoji`)
    ];
    const newComment = createUserComment({ text, emotion });
    onAddComment(newComment);
  });

  const favoritesBtn = template.querySelector(
    `.film-details__control-label--favorite`
  );
  favoritesBtn.addEventListener(`click`, onAddToFavourites);

  const watchlistBtn = template.querySelector(
    `.film-details__control-label--watchlist`
  );
  watchlistBtn.addEventListener(`click`, onAddToWatchlist);

  const watchedBtn = template.querySelector(
    `.film-details__control-label--watched`
  );
  watchedBtn.addEventListener(`click`, onMarkAsWatched);
};

const createSmartAppendChild = () => {
  let currentTemplate = undefined;
  const parent = document.querySelector("body");

  const smartAppendChild = template => {
    if (currentTemplate) {
      parent.removeChild(currentTemplate);
    }
    parent.appendChild(template);
    currentTemplate = template;
  };

  const smartRemoveChild = () => {
    if (currentTemplate) {
      parent.removeChild(currentTemplate);
      currentTemplate = undefined;
    }
  };

  return [smartAppendChild, smartRemoveChild];
};

const [smartAppendChild, smartRemoveChild] = createSmartAppendChild();

const showError = template => () => {
  Template.getCommentInput(template).classList.add("shake", "input-error");
};

const hideError = template => () => {
  Template.getCommentInput(template).classList.remove("shake", "input-error");
};

const addComment = template => comment => {
  Template.getCommentInput(template).disabled = false;

  const commentsFiled = template.querySelector(`.film-details__comments-list`);
  commentsFiled.appendChild(createComment(comment));

  Template.getCommentInput(template).value = "";
};

const disableCommentForm = template => () => {
  Template.getCommentInput(template).disabled = true;
};

export const render = ({ film, eventHandlers }) => {
  const template = getTemplate(film, createComment);
  addEventListeners(template, eventHandlers);
  smartAppendChild(template);
  return {
    updateRating: updateRating(template),
    addComment: addComment(template),
    showError: showError(template),
    hideError: hideError(template),
    disableCommentForm: disableCommentForm(template)
  };
};

export const Popup = {
  render,
  unrender: smartRemoveChild
};
