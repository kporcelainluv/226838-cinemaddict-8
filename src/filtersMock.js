const FILTER_TYPES = {
  all: "All Movies",
  watchlist: "Watchlist",
  history: "History",
  favorites: "Favorites",
  stats: "Stats"
};

const filtersData = [
  { name: "All movies", type: FILTER_TYPES.all },
  { name: "Watchlist", amount: 1, type: FILTER_TYPES.watchlist },
  { name: "History", amount: 1, type: FILTER_TYPES.history },
  { name: "Favorites", amount: 1, type: FILTER_TYPES.favorites },
  { name: `Stats`, type: FILTER_TYPES.stats }
];
export { filtersData };
