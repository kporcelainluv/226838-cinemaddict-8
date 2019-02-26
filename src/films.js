const films = [
  {
    name: "The Assassination Of Jessie James By The Coward Robert Ford",
    text:
      "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/three-friends.jpg",
    btns: true
  },
  {
    name: "Incredibles 2",
    text:
      "A priests Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/moonrise.jpg",
    btns: true
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/fuga-da-new-york.jpg"
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blue-blazes.jpg"
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/accused.jpg"
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blackmail.jpg"
  }
];

const createFilmCard = ({ text, btns, link, name }) => {
  const card = document
    .querySelector(".card-template")
    .content.querySelector(".film-card")
    .cloneNode(true);
  const filmDescription = card.querySelector(".film-card__description");
  if (name) {
    const filmTitle = card.querySelector(".film-card__title");
    filmTitle.textContent = name;
  }
  if (!text) {
    filmDescription.textContent = "";
  } else {
    filmDescription.textContent = text;
  }
  if (!btns) {
    card.remove(".film-card__controls");
  }
  const image = card.querySelector(".film-card__poster");
  image.src = link;
  return card;
};
const res = films.reduce((acc, elm) => {
  acc.push(createFilmCard(elm));
  return acc;
}, []);

const createContainer = (headerName, start, end) => {
  const main = document.querySelector(".films");
  const section = document.createElement("section");
  section.className = "films-list--extra";
  const header = document.createElement("h2");
  header.className = "films-list__title";
  header.textContent = headerName;
  section.appendChild(header);
  const div = document.createElement("div");
  div.className = "films-list__container";
  for (let i = start; i <= end; i++) {
    div.appendChild(res[i]);
  }
  section.appendChild(div);
  main.appendChild(section);
};

const createAllMoviesCards = (films, createFilmCard) => {
  const filmsList = document.querySelector(".films-list");
  const container = document.createElement("div");
  container.className = "films-list__container";
  container.appendChild(createFilmCard(films[0]));
  container.appendChild(createFilmCard(films[1]));
  filmsList.appendChild(container);
};

export { createAllMoviesCards, createContainer, films, createFilmCard };
