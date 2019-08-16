import {makeMenu} from './components/menu.js';
import {makeLoadMoreBtn} from './components/load-more-btn.js';
import {makeTask} from './components/task.js';
import {makeSearch} from './components/search.js';
import {makeFilter} from './components/filter.js';
import {makeSort} from './components/sort.js';
import {makeTaskEdit} from './components/task-edit.js';
import {makeBoard} from './components/board.js';
import {makeTasksContainer} from './components/tasks-container.js';
import {makeTaskData} from './task-data.js';
import {getRandomNumber} from './utils.js';

// Количество задач
const TasksAmount = {
  START: 8,
  STEP: 8
};

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

// Все задачи
const allTasks = [];

// Рендеринг массива с задачами
const renderTaskArray = (amount) => {
  for (let i = 0; i < amount; i++) {
    allTasks.push(makeTaskData());
  }
};

renderTaskArray(getRandomNumber(10, 30));

// Рендеринг элемента из разметки
const renderElement = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};

// Добавляет компонент(ы) в контейнер
const render = (container, template, amount = 0) => {
  let content = null;
  if (amount) {
    content = new DocumentFragment();
    for (let i = 0; i < amount; i++) {
      content.appendChild(renderElement(template));
    }
  } else {
    content = renderElement(template);
  }
  container.appendChild(content);
};

// Рендерим компоненты на страницу
render(menuContainer, makeMenu());
render(mainContainer, makeSearch());
render(mainContainer, makeFilter());
render(mainContainer, makeBoard());

const contentContainer = document.querySelector(`.board`);

render(contentContainer, makeSort());
render(contentContainer, makeTasksContainer());

// Контейнер для массива задач
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
