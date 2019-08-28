import {Menu} from '../components/menu.js';
import {Board} from '../components/board.js';
import {TasksContainer} from '../components/tasks-container.js';
import {Task} from '../components/task.js';
import {EditTask} from '../components/edit-task.js';
import {SortFilter} from '../components/sort-filter.js';
import {NoTasksElement} from '../components/no-tasks-element.js';
import {LoadMoreButton} from '../components/load-more-btn.js';
import {render} from '../utils.js';

// Количество задач
const TasksAmount = {
  START: 8,
  STEP: 8,
  START_REST: 7
};

const NoTasksText = {
  ALL_ARCHIVED: `Click ADD NEW TASK in menu to create your first task`,
  NOT_AT_ALL: `Click ADD NEW TASK in menu to create your first task`
};

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sortFilter = new SortFilter();
    this._tasksContainer = new TasksContainer();
    this._loadMoreBtn = new LoadMoreButton();
  }

  // Логика отрисовки компонент
  init() {

    if (this._tasks.length === 0) {
      // Рендерим текст, что карточек нет
      this._container.appendChild(new NoTasksElement(NoTasksText.NOT_AT_ALL).getElement());
    } else if (this._tasks.length === document.querySelector(`.filter__archive-count`).textContent) {
      // Рендерим спец. строку, когда, кроме архивных, задач нет
      this._container.appendChild(new NoTasksElement(NoTasksText.ALL_ARCHIVED).getElement());
    } else {
      // Рендерим фильтр сортировки
      this._renderSortFilter();

      // Контейнер для карточек
      const tasksContainer = this._tasksContainer.getElement();
      render(this._container, tasksContainer);
      // const tasksContainer = document.querySelector(`.board__tasks`);

      // Рендерим карточки задач
      this._renderTasks(tasksContainer, this._tasks.slice(0, TasksAmount.START));
      // renderTasks(tasksContainer, tasksArray.slice(0, TasksAmount.START));

      // Рендерим кнопку "LoadMore"
      if (this._tasks.length > TasksAmount.START) {
        const loadMoreBtn = this._loadMoreBtn.getElement();
        loadMoreBtn.addEventListener(`click`, this._loadMoreBtnClickHandler);
        render(tasksContainer, loadMoreBtn);
      }
    }

  }

  // Рендерим SortFilter
  _renderSortFilter() {
    const sortFilter = this._sortFilter.getElement();
    render(this._container, sortFilter);
    sortFilter.addEventListener(`click`, (evt) => this._sortFilterClickHandler(evt));
  }

  // Рендерим карточки задач
  _renderTasks(container, tasksData) {
    // console.log(`рендер карточек`);
  }

  // Рендерим одну задачу
  _renderTask(taskData) {
    //
  }

  // При нажатии на фильтр сортировки
  _sortFilterClickHandler(evt) {
    evt.preventDefault();
    // console.log(evt.target);
  }

  // Обработчик клика по LoadMoreBtn
  _loadMoreBtnClickHandler(evt) {
    evt.preventDefault();
    console.log(evt.target);
  }

}

export default BoardController;


// Рендерим контейнер для карточек и LoadMore
// render(this._container, this._tasksContainer.getElement());
