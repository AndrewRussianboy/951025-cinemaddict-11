import moment from "moment";

export const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInt(0, array.length);
  return array[randomIndex];
};

export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const formatDate = (date, formatType) => {
  return moment(date).format(formatType);
};

export const formatHours = (minutes) => {
  if (minutes < 60) {
    return moment.utc().startOf(`day`).add({minutes}).format(`mm[m]`);
  } else {
    return moment.utc().startOf(`day`).add({minutes}).format(`H[h] mm[m]`);
  }
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getFilmsOnStart = (array, from, to) => {
  return array.slice(from, to);
};
