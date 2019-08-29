import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {FilterContainer} from './components/filter-container.js';
import {makeTaskData} from './task-data.js';
import {getRandomNumber, render} from './utils.js';
import {filterData} from './data.js';
import {BoardController} from './controllers/board-controller.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);

// Рендеринг массива с задачами
const tasksArray = [];
const renderTaskArray = (amount) => {
  for (let i = 0; i < amount; i++) {
    tasksArray.push(makeTaskData());
  }
};
renderTaskArray(getRandomNumber(5, 20));
// console.log(tasksArray.length);

// МЕНЮ СТРАНИЦЫ
render(menuContainer, new Menu().getElement());
// ФОРМА ПОИСКА
render(mainContainer, new Search().getElement());

// ФИЛЬТРЫ
const filterContainer = new FilterContainer().getElement();
render(mainContainer, filterContainer);

// Выявление просроченного дедлайна
const getTaskFormatDate = (date) => {
  return `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
};

// const getOverduedTasks = (date) => {
//   return 
// };

// Фильтрация массива данных карточек по названию фильтра
const getFilteredTasksAmount = (dataArr = [], filterName) => {
  let filteredArr = [];

  switch (filterName) {
    case `All`:
      filteredArr = dataArr.filter((obj) => !obj.isArchive);
      break;
    case `Overdue`:
      filteredArr = dataArr.filter((obj) => new Date(obj.dueDate));
      break;
    case `Today`:
      filteredArr = dataArr.filter((obj) => getTaskFormatDate(new Date(obj.dueDate)) === getTaskFormatDate(new Date()));
      break;
    case `Favorites`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
      break;
    case `Repeating`:
      filteredArr = dataArr.filter((obj) => Object.keys(obj.repeatingDays).some((day) => day));
      break;
    case `Tags`:
      filteredArr = dataArr.filter((obj) => obj.tags.size > 0);
      break;
    case `Archive`:
      filteredArr = dataArr.filter((obj) => obj.isArchive);
      break;
    default:
      break;
  }

  return filteredArr.length;
};

// Рендеринг одного фильтра
const renderFilterElements = (dataObj) => {
  const isActiveFilter = dataObj.title === `All`;
  const amount = getFilteredTasksAmount(tasksArray, dataObj.title);
  return new Filter(dataObj.title, amount, isActiveFilter).getElement();
};

// Рендеринг всех фильтров
const renderFilters = (container, dataArr) => {
  if (dataArr.length > 0) {
    let fragment = new DocumentFragment();

    dataArr.forEach((dataObj) => {
      const filterElements = renderFilterElements(dataObj);
      Array.from(filterElements).forEach((el) => {
        fragment.appendChild(el);
      });
    });

    container.appendChild(fragment);
  }
};

renderFilters(filterContainer, filterData);

// КОНТЕНТ
const contentContainer = new Board().getElement();
render(mainContainer, contentContainer);

// Вызываем BoardController
const boardController = new BoardController(contentContainer, tasksArray);
boardController.init();
