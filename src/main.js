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
renderTaskArray(getRandomNumber(10, 40));

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

// Рендеринт sort фильтра
const renderSortFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataEl) => {
    const el = createElement(makeSortElement(dataEl));
    fragment.appendChild(el);
  });
  container.appendChild(fragment);
};

// ТЕПЕРЬ НАМ НАДО ОТРИСОВАТЬ КОНТЕНТ В ЗАВ-ТИ ОТ ДАННЫХ

// Обработчик нажатия на кнопку "Load More"
const onLoadMoreBtnClick = (evt) => {
  evt.preventDefault();
  // Добавление в контейнер ещё карточек из массива
};

// Рендеринг стартового контента
const renderStartContent = (container, tasksArr) => {
  if (tasksArr.length === 0) {
    // Рендерим текст, что карточек нет
    container.appendChild(createElement(TextNoTasks.AT_ALL));
  } else if (tasksArr.length === document.querySelector(`.filter__archive-count`).textContent) {
    container.appendChild(createElement(TextNoTasks.ONLY_ARCHIVED));
  } else {
    // chechIsOnlyArchivedTasks();
    // Рендерим sort-фильтр
    render(contentContainer, createElement(makeSortContainer()));
    const sortContainer = contentContainer.querySelector(`.board__filter-list`);
    renderSortFilter(sortContainer, sortFilterData);

    // Контейнер для карточек
    render(contentContainer, createElement(makeTasksContainer()));
    const tasksContainer = document.querySelector(`.board__tasks`);

    // Рендерим карточку Edit
    render(tasksContainer, createElement(makeTaskEdit(tasksArray[0])));
    // Рендерим остальные карточки
    render(tasksContainer, createElement(makeTask(makeTaskData())));

    // Рендерим кнопку "LoadMore"
    render(contentContainer, createElement(makeLoadMoreBtn()));
    const loadMoreBtn = contentContainer.querySelector(`.load-more`);
    loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
  }
};

// Стартовый рендеринг контента
renderStartContent(contentContainer, tasksArray);
