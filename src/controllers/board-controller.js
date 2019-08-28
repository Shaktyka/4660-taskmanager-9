import {TasksContainer} from '../components/tasks-container.js';
import {Task} from '../components/task.js';
import {EditTask} from '../components/edit-task.js';
import {SortContainer} from '../components/sort-container.js';
import {NoTasksElement} from '../components/no-tasks-element.js';
import {LoadMoreButton} from '../components/load-more-btn.js';
import {Sort} from '../components/sort.js';
import {sortFilterData} from '../data.js';
import {render} from '../utils.js';

// Количество задач
const TasksAmount = {
  START: 8,
  STEP: 8,
  START_REST: 7
};

const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

const NoTasksText = {
  ALL_ARCHIVED: `Click ADD NEW TASK in menu to create your first task`,
  NOT_AT_ALL: `Click ADD NEW TASK in menu to create your first task`
};

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sortContainer = new SortContainer();
    this._tasksContainer = new TasksContainer();
    this._loadMoreBtn = new LoadMoreButton();
  }

  // Отрисовка контейнеров и карточек задач
  init() {
    if (this._tasks.length === 0) {
      this._container.appendChild(this._renderNoTasksMessage(NoTasksText.NOT_AT_ALL));
    } else if (this._tasks.length === document.querySelector(`.filter__archive-count`).textContent) {
      this._container.appendChild(this._renderNoTasksMessage(NoTasksText.ALL_ARCHIVED));
    } else {

      const sortContainer = this._sortContainer.getElement();
      render(this._container, sortContainer);
      this._renderSortFilter(sortContainer, sortFilterData);

      // Контейнер для карточек
      const tasksContainer = this._tasksContainer.getElement();
      render(this._container, tasksContainer);

      // Рендерим карточки задач
      this._renderTasks(tasksContainer, this._tasks.slice(0, TasksAmount.START));

      // Рендерим кнопку "LoadMore"
      if (this._tasks.length > TasksAmount.START) {
        const loadMoreBtn = this._loadMoreBtn.getElement();
        loadMoreBtn.addEventListener(`click`, this._loadMoreBtnClickHandler);
        render(tasksContainer, loadMoreBtn);
      }
    }
  }

  // Рендерим SortFilter
  _renderSortFilter(container, sortData) {
    let fragment = new DocumentFragment();

    sortData.forEach((sortObj) => {
      const sortEl = new Sort(sortObj).getElement();
      fragment.appendChild(sortEl);
    });

    container.appendChild(fragment);
    // this._sortContainer.getElement()
    // sortFilter.addEventListener(`click`, (evt) => this._sortFilterClickHandler(evt));
  }

  // Рендерим карточки задач
  _renderTasks(container, tasksArr) {
    let fragment = new DocumentFragment();

    tasksArr.forEach((taskData) => {
      const task = new Task(taskData).getElement();
      const editBtn = task.querySelector(`.card__btn--edit`);
      const editTask = new EditTask(taskData).getElement();
      const editForm = editTask.querySelector(`form`);
      const textarea = editTask.querySelector(`textarea`);

      const documentEscKeydownHandler = (evt) => {
        if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
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
  }

  // Рендерим одну задачу
  _renderTask() {
    // надо?
  }

  // Рендерим элемент с текстом об отсутствии карточек
  _renderNoTasksMessage(text) {
    return new NoTasksElement(text).getElement();
  }

  // При нажатии на фильтр сортировки
  _sortFilterClickHandler(evt) {
    evt.preventDefault();
    // console.log(evt.target);
  }

  // Обработчик клика по LoadMoreBtn
  _loadMoreBtnClickHandler(evt) {
    evt.preventDefault();
    // console.log(evt.target);
  }

}

export default BoardController;
