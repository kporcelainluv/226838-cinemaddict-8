const createFilm = () => {
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
    ][Math.floor(Math.random() * 16)],
    descriptionText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(
      `. `
    )[Math.floor(Math.random() * 10)],
    posters: [
      `three-friends`,
      `fuga-da-new-york`,
      `blue-blazes`,
      `accused`,
      `blackmail`
    ][Math.floor(Math.random() * 5)],
    controls: true,
    rating: [Math.floor(Math.random() * 10)],
    year: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    duration: Math.floor(Math.random() * 60) * 60 * 10000,
    genre: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`][
      Math.floor(Math.random() * 5)
    ],
    amountOfComments: 1,
    comments: [
      { text: "This film is great!", data: new Date(2019, 0, 1, 2, 3, 4) }
    ],
    watched: false,
    favorites: false,
    watchlist: false,
    id: Math.floor(Math.random() * 10000000)
  };

  return film;
};

const film = createFilm();
const films = Array(10)
  .fill(0)
  .map(() => createFilm());

export { films };
