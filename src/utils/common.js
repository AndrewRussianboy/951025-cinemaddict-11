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

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const castDurationFormat = (duration) => {
  const hour = 60;
  const entireHours = Math.trunc(duration / hour);
  return duration < hour ? `${duration}m` : `${entireHours}h ${duration - hour * entireHours}m`;
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getFilmsOnStart = (array, from, to) => {
  return array.slice(from, to);
};
