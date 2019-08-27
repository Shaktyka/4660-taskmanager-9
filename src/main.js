import {Menu} from './components/menu.js';
import {LoadMoreButton} from './components/load-more-btn.js';
import {Task} from './components/task.js';
import {Search} from './components/search.js';
import {Filter} from './components/filter.js';
import {EditTask} from './components/edit-task.js';
import {Board} from './components/board.js';
import {TasksContainer} from './components/tasks-container.js';
import {SortContainer} from './components/sort-container.js';
import {SortElement} from './components/sort-element.js';
import {FilterContainer} from './components/filter-container.js';
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
// let copiedTasksArray = [];

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
renderTaskArray(getRandomNumber(5, 20));
// copiedTasksArray = tasksArray.slice(); // Копия массива с карточками для вырезания

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
render(menuContainer, new Menu().getElement());
// ФОРМА ПОИСКА
render(mainContainer, new Search().getElement());

// ФИЛЬТРЫ
// + блок для фильтра
render(mainContainer, new FilterContainer().getElement());
const filterContainer = mainContainer.querySelector(`.main__filter`);

// Выявление просроченного дедлайна
const getTaskFormatDate = (date) => {
  return `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
};

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

// Рендеринг фильтра
const renderFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataObj) => {
    const isActiveFilter = dataObj.title === `All`;
    const amount = getFilteredTasksAmount(tasksArray, dataObj.title);
    const elements = new Filter(dataObj, amount, isActiveFilter).getElement();
    Array.from(elements).forEach((el) => {
      fragment.appendChild(el);
    });
  });
  container.appendChild(fragment);
};

renderFilter(filterContainer, filterData);

// КОНТЕНТ
render(mainContainer, new Board().getElement());
const contentContainer = document.querySelector(`.board`);

// Рендеринт sort фильтра
const renderSortFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataEl) => {
    const el = new SortElement(dataEl).getElement();
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

// Рендеринг карточек задач
const renderTasks = (container, tasksArr) => {
  let fragment = new DocumentFragment();
  tasksArr.forEach((taskEl) => {

    const task = new Task(taskEl).getElement();
    const editBtn = task.querySelector(`.card__btn--edit`);
    const editTask = new EditTask(taskEl).getElement();
    const editForm = editTask.querySelector(`form`);
    const textarea = editTask.querySelector(`textarea`);

    const documentEscKeydownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(task, editTask);
        document.removeEventListener(`keydown`, documentEscKeydownHandler);
      }
    };

    textarea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });

    textarea.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(editTask, task);
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      container.replaceChild(task, editTask);
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });

    fragment.appendChild(task);
  });
  container.appendChild(fragment);
};

// Рендеринг стартового контента
const renderStartContent = (container, tasksArr) => {
  if (tasksArr.length === 0) {
    // Рендерим текст, что карточек нет
    container.appendChild(createElement(TextNoTasks.AT_ALL));
  } else if (tasksArr.length === document.querySelector(`.filter__archive-count`).textContent) {
    // Рендерим спец. строку, когда, кроме архивных, задач нет
    container.appendChild(createElement(TextNoTasks.ONLY_ARCHIVED));
  } else {
    // chechIsOnlyArchivedTasks();
    // Рендерим sort-фильтр
    render(contentContainer, new SortContainer().getElement());
    const sortContainer = contentContainer.querySelector(`.board__filter-list`);
    renderSortFilter(sortContainer, sortFilterData);

    // Контейнер для карточек
    render(contentContainer, new TasksContainer().getElement());
    const tasksContainer = document.querySelector(`.board__tasks`);

    // Рендерим остальные карточки
    renderTasks(tasksContainer, tasksArray.slice(0, TasksAmount.START));

    // Рендерим кнопку "LoadMore"
    if (tasksArray.length > TasksAmount.START) {
      render(contentContainer, new LoadMoreButton().getElement());
      const loadMoreBtn = contentContainer.querySelector(`.load-more`);
      loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
    }
  }
};

// Стартовый рендеринг контента
renderStartContent(contentContainer, tasksArray);
