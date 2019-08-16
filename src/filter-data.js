import {getRandomNumber} from './utils.js';

export const filterData = [
  {
  	title: `All`,
  	count: getRandomNumber(0, 50)
  },
  {
  	title: `Overdue`,
  	count: getRandomNumber(0, 20)
  },
  {
  	title: `Today`,
  	count: getRandomNumber(0, 20)
  },
  {
  	title: `Favorites`,
  	count: getRandomNumber(0, 20)
  },
  {
  	title: `Repeating`,
  	count: getRandomNumber(0, 20)
  },
  {
  	title: `Tags`,
  	count: getRandomNumber(0, 20)
  },
  {
  	title: `Archive`,
  	count: getRandomNumber(0, 50)
  }
];
