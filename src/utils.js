const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInt(0, array.length);
  return array[randomIndex];
};

let getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const castDurationFormat = (duration) => {
  const hour = 60;
  const entireHours = Math.trunc(duration / hour);
  return duration < hour ? `${duration}m` : `${entireHours}h ${duration - hour * entireHours}m`;
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export {getRandomInt, getRandomArrayItem, getRandomArbitrary, formatTime, castDurationFormat, getRandomDate};
