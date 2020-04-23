const navigationItemsNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const dict = {
  isWatchList: `Watchlist`,
  isWatched: `History`,
  isFavorite: `Favorites`,
};

const reducer = (accumulator, currentValue) => {
  Object.keys(dict).forEach((item) => {
    let k = currentValue[item] ? 1 : 0;
    return accumulator + k;
  });
};

const generateNavigationItems = (films) => {
  return navigationItemsNames.map((item) => {
    return {
      link: item.toLowerCase(),
      name: item,
      count: films.reduce(reducer),
    };
  });
};

export {generateNavigationItems};
