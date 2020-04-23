const createNavigatonItemMarkup = (item, isActive) => {
  const {count, link, name} = item;

  const isNameAllUsers = (name === `All movies`) ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return `<a href="#${link}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}">${name} ${isNameAllUsers}</a></a>`;
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
