import {makeMenu} from './components/menu.js';
import {makeLoadMoreBtn} from './components/load-more-btn.js';
import {makeTask} from './components/task.js';
import {makeSearch} from './components/search.js';
import {makeFilter} from './components/filter.js';
// import {makeSort} from './components/sort.js';
import {makeTaskEdit} from './components/task-edit.js';
import {makeBoard} from './components/board.js';
import {makeTasksContainer} from './components/tasks-container.js';
import {makeSortContainer} from './components/sort-container.js';
import {makeSortElement} from './components/sort-element.js';
import {makeTaskData} from './task-data.js';
// import {filterData} from './filter-data.js';
import {getRandomNumber, createElement} from './utils.js';
import {sortFilterData, filterData} from './data.js';

// Количество задач
const TasksAmount = {
  START: 8,
  STEP: 8
};

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

// Все задачи
const allTasks = [];

const getFilterContainerTemplate = () => {
  return `<section class="main__filter filter container"></section>`;
};

// Рендеринг массива с задачами
const renderTaskArray = (amount) => {
  for (let i = 0; i < amount; i++) {
    allTasks.push(makeTaskData());
  }
};

renderTaskArray(getRandomNumber(10, 30));

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

// + меню
render(menuContainer, makeMenu());
// + форма поиска
render(mainContainer, makeSearch());
// + блок для меню
render(mainContainer, getFilterContainerTemplate());
const filterContainer = mainContainer.querySelector(`.main__filter`);
//render(filterContainer, makeFilter());
// + блок для контента
render(mainContainer, makeBoard());
const contentContainer = document.querySelector(`.board`);
// + сортировка
render(contentContainer, makeSortContainer());
const sortContainer = contentContainer.querySelector(`.board__filter-list`);
// Склеим строку из элементов
const makeSortString = (dataArr) => {
  let sortString = ``;
  dataArr.forEach((el) => {
    sortString += makeSortElement(el);
  });
  return sortString;
};
render(sortContainer, makeSortString(sortFilterData));
// + контейнер для тасков
render(contentContainer, makeTasksContainer());
const tasksContainer = document.querySelector(`.board__tasks`);
// Рендерим карточки
render(tasksContainer, makeTaskEdit(allTasks[0]));
render(tasksContainer, makeTask(makeTaskData()), TasksAmount.START);

// Кнопка "Load More"
render(contentContainer, makeLoadMoreBtn());
const loadMoreBtn = contentContainer.querySelector(`.load-more`);

// Обработчик нажатия на кнопку "Load More"
const onLoadMoreBtnClick = (evt) => {
  evt.preventDefault();
  // Добавление в контейнер ещё карточек из массива
};

loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
