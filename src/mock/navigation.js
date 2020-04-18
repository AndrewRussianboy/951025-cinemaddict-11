const navigationItemsNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateNavigationItems = () => {
  return navigationItemsNames.map((item) => {
    return {
      link: item.toLowerCase(),
      name: item,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateNavigationItems};
