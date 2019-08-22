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
  STEP: 8
};

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

// Текст, когда в списке нет задач
const noTaskText = `Click ADD NEW TASK in menu to create your first task`;

// Рендеринг массива с задачами
const allTasks = [];
const renderTaskArray = (amount) => {
  for (let i = 0; i < amount; i++) {
    allTasks.push(makeTaskData());
  }
};
renderTaskArray(getRandomNumber(10, 40));

// Добавляет компонент(ы) в контейнер
const render = (container, template, amount = 0) => {
  let content = null;
  if (amount) {
    content = new DocumentFragment();
    for (let i = 0; i < amount; i++) {
      content.appendChild(createElement(template));
    }
  } else {
    content = createElement(template);
  }
  container.appendChild(content);
};

// МЕНЮ СТРАНИЦЫ
render(menuContainer, makeMenu());
// ФОРМА ПОИСКА
render(mainContainer, makeSearch());

// ФИЛЬТРЫ
// + блок для фильтра
render(mainContainer, getFilterContainerTemplate());
const filterContainer = mainContainer.querySelector(`.main__filter`);

// Фильтрация массива данных карточек по названию фильтра
const getFilteredTasksAmount = (dataArr, filterName) => {
  let filteredArr = [];

  switch (filterName) {
    case `All`:
      filteredArr = dataArr;
      break;
    case `Overdue`:
      filteredArr = dataArr.filter((obj) => obj.isFavorite);
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
    const amount = getFilteredTasksAmount(allTasks, dataObj.title);
    const elements = createElement(makeFilter(dataObj, amount, isActiveFilter));
    Array.from(elements).forEach((el) => {
      fragment.appendChild(el);
    });
  });
  container.appendChild(fragment);
};

renderFilter(filterContainer, filterData);

// КОНТЕНТ
render(mainContainer, makeBoard());
const contentContainer = document.querySelector(`.board`);

// СОРТИРОВКА
// Рендеринт sort фильтра
const renderSortFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataEl) => {
    const el = createElement(makeSortElement(dataEl));
    fragment.appendChild(el);
  });
  container.appendChild(fragment);
};
render(contentContainer, makeSortContainer());
const sortContainer = contentContainer.querySelector(`.board__filter-list`);
renderSortFilter(sortContainer, sortFilterData);

// Контейнер для карточек
render(contentContainer, makeTasksContainer());
const tasksContainer = document.querySelector(`.board__tasks`);
// Рендерим карточки
// console.log(allTasks[0]);
  render(tasksContainer, makeTaskEdit(allTasks[0]));
// Рендеринг карточек

const renderTasks = (tasksContainer, dataArr) => {
  
  
};

render(tasksContainer, makeTask(makeTaskData()));

// Кнопка "Load More"
render(contentContainer, makeLoadMoreBtn());
const loadMoreBtn = contentContainer.querySelector(`.load-more`);

// Обработчик нажатия на кнопку "Load More"
const onLoadMoreBtnClick = (evt) => {
  evt.preventDefault();
  // Добавление в контейнер ещё карточек из массива
};

loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
