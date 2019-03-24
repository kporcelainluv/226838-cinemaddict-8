export const FILTER_TYPES = {
  all: "All Movies",
  watchlist: "Watchlist",
  history: "History",
  favorites: "Favorites",
  stats: "Stats"
};

const filtersData = [
  { name: "All movies", type: FILTER_TYPES.all, id: "all" },
  {
    name: "Watchlist",
    amount: 1,
    type: FILTER_TYPES.watchlist,
    id: "watchlist"
  },
  { name: "History", amount: 1, type: FILTER_TYPES.history, id: "history" },
  {
    name: "Favorites",
    amount: 1,
    type: FILTER_TYPES.favorites,
    id: "favorites"
  },
  {
    name: `Stats`,
    type: FILTER_TYPES.stats,
    id: "stats"
  }
];
export { filtersData };
