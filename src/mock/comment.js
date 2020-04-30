import {getRandomArrayItem, getRandomDate} from "../utils/common.js";

const emojisList = [`smile`, `angry`, `puke`, `sleeping`];
const namesList = [`Tim Macoveev`, `Tony Snowden`, `Johny Walker`, `Edward Parker`, `Charles Manson`, `Philip Glass`];
const commentsList = [`Interesting setting and a good cast`, `So boring!!!`, `Good production and actors`, `The most impressive film ever`, `Must see`, `So-so...`];

const generateComment = () => {
  return {
    commentText: getRandomArrayItem(commentsList),
    dueDate: getRandomDate(new Date(2012, 0, 1), new Date()),
    emoji: getRandomArrayItem(emojisList),
    name: getRandomArrayItem(namesList),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
