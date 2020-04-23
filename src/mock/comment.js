import {getRandomArrayItem, getRandomDate} from "../utils.js";

const emojisList = [`smile`, `angry`, `puke`, `sleeping`];
const names = [`Tim Macoveev`, `Tony Snowden`, `Johny Walker`, `Edward Parker`, `Charles Manson`, `Philip Glass`];

const generateComment = () => {
  return {
    commentText: `Interesting setting and a good cast`,
    dueDate: getRandomDate(new Date(2012, 0, 1), new Date()),
    emoji: getRandomArrayItem(emojisList),
    name: getRandomArrayItem(names),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
