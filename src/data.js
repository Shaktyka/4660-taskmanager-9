import {getRandomNumber} from './utils.js';

// Данные для sorting фильтра
export const sortFilterData = [
  {
  	href: `#`,
  	title: `default`
  },
  {
  	href: `#`,
  	title: `date up`
  },
  {
  	href: `#`,
  	title: `date down`
  }
];

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

// Данные для фильтра арточек
// export const filterData = [
//   `All`,
//   `Overdue`,
//   `Today`,
//   `Favorites`,
//   `Repeating`,
//   `Tags`,
//   `Archive`
// ];
