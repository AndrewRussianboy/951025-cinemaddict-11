/* const navigationItemsNames = [`All movies`, `Watchlist`, `History`, `Favorites`]; */

const filters = {
  isWatchList: `Watchlist`,
  isWatched: `History`,
  isFavorite: `Favorites`,
};

const reducer = (filter) => {
  return (count, film) => {
    if (film[filter]) {
      count++
    }
    return count
  }
}

const generateNavigationItems = (films) => {
  return Object.keys(filters).map((filter) => {
    return {
      link: filters[filter].toLowerCase(),
      name: filters[filter],
      count: films.reduce(reducer(filter), 0),
    };
  });
};

export {generateNavigationItems};
