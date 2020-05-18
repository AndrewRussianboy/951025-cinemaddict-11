import {getRandomInt, getRandomArrayItem, getRandomArbitrary} from "../utils/common.js";
import {generateComments} from "../mock/comment.js";
import {getRandomDate} from "../utils/common.js";
import {formatDate, formatHours} from "../utils/common.js";

const filmsTitles = [`Made for each other`, `Popeye meets sinbad`, `Sagebrush Trail`, `Santa Claus conquers the martians`, `The dance of life`, `The great flamarion`, ` The man with the golden arm`];
const filmsPosters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const filmsDescription = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`, `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`, `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`];
const filmsGenre = [`Action`, `Comedy`, `Crime`, `Drama`, `Fantasy`, `Experimental`, `Historical`, `Western`, `Horror`, `Musicals`, `Biographical`];
const filmDirectors = [`David Lynch`, `Abbas Kiarostami`, `Bela Tarr`, `Michael Haneke`, `Andrei Tarkovski`];
const filmWriters = [`Billy Wilder`, `Robert Towne`, `Francis Ford Coppola`, `William Goldman`, `Woody Allen`, `Nora Ephron`];
const filmActors = [`Jack Nicholson`, `Spencer Tracy`, `Laurence Olivier`, `Jack Lemmon`, `Michael Caine`, `James Stewart`, `Robert Duvall`, `Jeff Bridges`];
const countryNames = [`USA`, `Russia`, `England`, `Poland`, `France`, `Greece`, `Italy`, `Spain`, `Armenia`, `Australia`];

const getSomeArrayItems = (arr) => {
  arr.sort(() => {
    return 0.5 - Math.random();
  });
  return arr.slice(0, getRandomInt(1, 6));
};

const generateFilm = () => {
  return {
    actors: getSomeArrayItems(filmActors).join(`, `),
    comments: generateComments(getRandomInt(0, 6)),
    country: getRandomArrayItem(countryNames),
    description: getSomeArrayItems(filmsDescription).join(`. `),
    director: getRandomArrayItem(filmDirectors),
    duration: formatHours(getRandomInt(10, 200)),
    genre: getRandomArrayItem(filmsGenre),
    isWatchList: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    multipleGenres: getSomeArrayItems(filmsGenre).join(` `),
    poster: getRandomArrayItem(filmsPosters),
    rating: getRandomArbitrary(0, 5).toFixed(1),
    release: formatDate(getRandomDate(new Date(1895, 0, 1), new Date()), `DD MMMM YYYY`),
    title: getRandomArrayItem(filmsTitles),
    writers: getSomeArrayItems(filmWriters).join(`, `),
    year: formatDate(getRandomDate(new Date(1895, 0, 1), new Date()), `YYYY`),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
