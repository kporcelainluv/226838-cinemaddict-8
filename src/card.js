const films = [
  {
    name: "The Assassination Of Jessie James By The Coward Robert Ford",
    text:
      "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/three-friends.jpg",
    btns: true,
    controls: true
  },
  {
    name: "Incredibles 2",
    text:
      "A priests Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/moonrise.jpg",
    btns: true,
    controls: true
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/fuga-da-new-york.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blue-blazes.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/accused.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blackmail.jpg",
    controls: false
  }
];

//create card from template
const createFilmCard = (nameOfCLass, text, controls, link, name) => {
  const card = document
    .querySelector(".card-template")
    .content.querySelector(".film-card")
    .cloneNode(true);
  if (!nameOfCLass) {
    card.className += ` film-card--no-controls`;
  }
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
  if (!controls) {
    const controls = card.querySelector(".film-card__controls");
    card.removeChild(controls);
  }
  const image = card.querySelector(".film-card__poster");
  image.src = link;
  return card;
};
//create a list of all film cards
const listOfAllFilmCards = films.reduce((acc, elm) => {
  acc.push(
    createFilmCard(elm.controls, elm.text, elm.btns, elm.link, elm.name)
  );
  return acc;
}, []);
export { listOfAllFilmCards };
