import {createMenuTemplate} from './components/menu-template.js';
import {createLoadMoreBtnTemplate} from './components/load-more-btn.js';
import {createTaskTemplate} from './components/task-template.js';
import {createSearchTemplate} from './components/search-template.js';
import {createFilterTemplate} from './components/filter-template.js';
import {createSortTemplate} from './components/sort-template.js';
import {createTaskEditTemplate} from './components/task-edit-template.js';
import {createBoardTemplate} from './components/board-template.js';
import {createTasksContainerTemplate} from './components/tasks-container-template.js';

const TASKS_AMOUNT = 3;
const TASKS_AMOUNT_MAX = 20;

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

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
render(menuContainer, createMenuTemplate());
render(mainContainer, createSearchTemplate());
render(mainContainer, createFilterTemplate());
render(mainContainer, createBoardTemplate());

const contentContainer = document.querySelector(`.board`);

render(contentContainer, createSortTemplate());
render(contentContainer, createTasksContainerTemplate());

// Контейнер для массива задач
const tasksContainer = document.querySelector(`.board__tasks`);

// Рендерим карточки
render(tasksContainer, createTaskEditTemplate());
render(tasksContainer, createTaskTemplate(), TASKS_AMOUNT);

// Кнопка "Load More"
render(contentContainer, createLoadMoreBtnTemplate());
