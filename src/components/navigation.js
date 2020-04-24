const createNavigatonItemMarkup = (item) => {
  const {count, link, name} = item;

  return `<a href="#${link}" class="main-navigation__item main-navigation__item}">${name} <span class="main-navigation__item-count">${count}</span></a></a>`;
};

export const createSiteMainNavigationTemplate = (items) => {
  const navigationItemsMarkup = items.map((item) => createNavigatonItemMarkup(item))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${navigationItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
