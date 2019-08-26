import {makeMenu} from './components/menu.js';
import {makeLoadMoreBtn} from './components/load-more-btn.js';
import {makeTask} from './components/task.js';
import {makeSearch} from './components/search.js';
import {makeFilter} from './components/filter.js';
import {makeTaskEdit} from './components/task-edit.js';
import {makeBoard} from './components/board.js';
import {makeTasksContainer} from './components/tasks-container.js';
import {makeSortContainer} from './components/sort-container.js';
import {makeSortElement} from './components/sort-element.js';
import {getFilterContainerTemplate} from './components/filter-container.js'
import {makeTaskData} from './task-data.js';
import {getRandomNumber, createElement} from './utils.js';
import {sortFilterData, filterData} from './data.js';

// Количество задач
const TasksAmount = {
  START: 8,
  STEP: 8,
  START_REST: 7
};

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasksArray = [];

// Когда в списке нет задач
const TextNoTasks = {
  ONLY_ARCHIVED: `<p class="board__no-tasks">Click ADD NEW TASK in menu to create your first task</p>`,
  AT_ALL: `<p class="board__no-tasks">Click ADD NEW TASK in menu to create your first task</p>`
};

// Рендеринг массива с задачами
const renderTaskArray = (amount) => {
  for (let i = 0; i < amount; i++) {
    tasksArray.push(makeTaskData());
  }
};
// renderTaskArray(getRandomNumber(10, 40));

// Рендеринг элементов в контейнер
const render = (container, element, amount) => {
  let content = element;
  if (amount) {
    content = new DocumentFragment();
    for (let i = 0; i < amount; i++) {
      content.appendChild(element);
    }
  }
  container.appendChild(content);
};

// МЕНЮ СТРАНИЦЫ
render(menuContainer, createElement(makeMenu()));
// ФОРМА ПОИСКА
render(mainContainer, createElement(makeSearch()));

// ФИЛЬТРЫ
// + блок для фильтра
render(mainContainer, createElement(getFilterContainerTemplate()));
const filterContainer = mainContainer.querySelector(`.main__filter`);

// Ф-ция для выявления просроченной даты
// const getOverdueDate = (timestamp) => new Date(timestamp) < Date.now();

// Выявление просроченного дедлайна
const checkTodayDeadline = (timestamp) => {
  const today = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`;

  return today;
};

checkTodayDeadline(getRandomNumber(Date.now() - 1000000, Date.now() + 1000000000));

// Фильтрация массива данных карточек по названию фильтра
const getFilteredTasksAmount = (dataArr, filterName) => {
  let filteredArr = [];

  switch (filterName) {
    case `All`:
      filteredArr = dataArr;
      break;
    case `Overdue`:
      filteredArr = dataArr.filter((obj) => new Date(obj.dueDate) < Date.now());
      break;
    case `Today`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
      break;
    case `Favorites`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
      break;
    case `Repeating`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
      break;
    case `Tags`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
      break;
    case `Archive`:
      filteredArr = dataArr.filter((obj) => obj.isArchive);
      break;
    default:
      break;
  }

  return filteredArr.length;
};

// Рендеринг фильтра
const renderFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataObj) => {
    const isActiveFilter = dataObj.title === `All`;
    const amount = getFilteredTasksAmount(tasksArray, dataObj.title);
    const elements = createElement(makeFilter(dataObj, amount, isActiveFilter));
    Array.from(elements).forEach((el) => {
      fragment.appendChild(el);
    });
  });
  container.appendChild(fragment);
};

renderFilter(filterContainer, filterData);

// КОНТЕНТ
render(mainContainer, createElement(makeBoard()));
const contentContainer = document.querySelector(`.board`);


// ТЕПЕРЬ НАМ НАДО ОТРИОСВАТЬ КОНТЕНТ В ЗАВ-ТИ ОТ ДАННЫХ

// Рендеринг стартового контента
const renderStartContent = (container, tasksArr) => {
  if (tasksArr.length === 0) {
    container.appendChild(createElement(TextNoTasks.AT_ALL));
  } else {
    console.log(`Массив карточек не пустой`);
    // Рендерим sort-фильтр
    // Рендерим карточки
  }
};

// Стартовый рендеринг контента
renderStartContent(contentContainer, tasksArray);
