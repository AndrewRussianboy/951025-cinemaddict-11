import {getRandomInt, getRandomArrayItem, getRandomArbitrary, castDurationFormat} from "../utils.js";

const filmsTitles = [`Made for each other`, `Popeye meets sinbad`, `Sagebrush Trail`, `Santa Claus conquers the martians`, `The dance of life`, `The great flamarion`, ` The man with the golden arm`];
const filmsPosters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const filmsDescription = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`, `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`, `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`];
const filmsGenre = [`Action`, `Comedy`, `Crime`, `Drama`, `Fantasy`, `Experimental`, `Historical`, `Western`];

const shuffledFilmsDescription = filmsDescription
  .sort(() => 0.5 - Math.random())
  .slice(0, getRandomInt(1, 6))
  .join(`. `);

const generateFilm = () => {
  return {
    title: getRandomArrayItem(filmsTitles),
    rating: getRandomArbitrary(0, 5).toFixed(1),
    year: getRandomInt(1895, 2020),
    duration: castDurationFormat(getRandomInt(10, 200)),
    genre: getRandomArrayItem(filmsGenre),
    poster: getRandomArrayItem(filmsPosters),
    description: shuffledFilmsDescription,
    comments: getRandomInt(0, 6),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
