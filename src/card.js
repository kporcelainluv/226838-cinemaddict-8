const film = {
  name: [
    `The Assassination Of Jessie James By The Coward Robert Ford`,
    `The Great Gatsby`,
    `Wolf from the Wall street`,
    `Hell or High Water`,
    `Submergence`,
    `A royal Night Out`,
    `Incredibles 2`,
    `Inception`,
    `Just Getting Started`,
    `Southpaw`,
    `Pulp Fiction`,
    `Forrest Gump`,
    `The Intouchables`,
    `The Godfather`,
    `The Lord of the Rings`,
    `The Shawshank Redemption`,
    `Schindler's List`
  ],
  descriptionText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  posters: [
    `three-friends`,
    `fuga-da-new-york`,
    `blue-blazes`,
    `accused`,
    `blackmail`
  ],
  controls: true
};
const getRandomNum = length => {
  return Math.floor(Math.random() * length);
};
//create card from template
const createFilmCard = (name, descriptionText, posters, controls) => {
  const card = document
    .querySelector(`.card-template`)
    .content.querySelector(`.film-card`)
    .cloneNode(true);
  //remove controls
  if (!controls) {
    card.className += ` film-card--no-controls`;
    card.querySelector(
      `.film-card__comments`
    ).style.padding = `0px 0px 40px 0px`;
  }
  // add film description
  const filmDescription = card.querySelector(`.film-card__description`);
  descriptionText = descriptionText.split(`. `);
  const coords = [
    getRandomNum(descriptionText.length),
    getRandomNum(descriptionText.length)
  ].sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });
  filmDescription.textContent = descriptionText.slice(...coords).join(`. `);
  // add film name
  if (name) {
    const filmTitle = card.querySelector(`.film-card__title`);
    filmTitle.textContent = name[getRandomNum(name.length)];
  }
  // check if film card has control buttons
  if (!controls) {
    const controls = card.querySelector(`.film-card__controls`);
    card.removeChild(controls);
  }
  // add film image
  const image = card.querySelector(`.film-card__poster`);
  image.src = `./images/posters/${posters[getRandomNum(posters.length)]}.jpg`;

  return card;
};

export { createFilmCard, film, getRandomNum };
