import {getRandomArrayItem} from "../utils.js";

const emojisList = [`smile`, `angry`, `puke`, `sleeping`];
const names = [`Tim Macoveev`, `Tony Snowden`, `Johny Walker`, `Edward Parker`, `Charles Manson`, `Philip Glass`];

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(emojisList),
    commentText: `Interesting setting and a good cast`,
    name: getRandomArrayItem(names),
    dueDate: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
