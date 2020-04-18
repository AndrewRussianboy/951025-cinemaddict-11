const createNavigatonItemMarkup = (item, isActive) => {
  const {link, name, count} = item;

  if (name === `All movies`) {
    return (
      `<a href="#${link}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}">${name}</a>`
    );
  }

  return (
    `<a href="#${link}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a></a>`
  );
};

export const createSiteMainNavigationTemplate = (items) => {
  const navigationItemsMarkup = items.map((item, index) => createNavigatonItemMarkup(item, index === 0))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
