import {Menu} from '../components/menu.js';
import {Board} from '../components/board.js';
import {TasksContainer} from '../components/tasks-container.js';
import {Search} from '../components/search.js';
import {Filter} from '../components/filter.js';
import {EditTask} from '../components/edit-task.js';
import {SortFilter} from '../components/sort-filter.js';
import {FilterContainer} from '../components/filter-container.js';
import {NoTasksElement} from '../components/no-tasks-element.js';
import {LoadMoreButton} from '../components/load-more-btn.js';

export class BoardController {
  constructor(container, tasks) {
    // Добавляется в (.main__control - нужно искать в коде)
    this._menu = new Menu().getElement();
    // Контейнеры
    this._container = container; // main
    this._search = new Search().getElement();
    this._filterContainer = new FilterContainer().getElement();
    this._filter = new Filter().getElement();
    this._board = new Board().getElement();
    this._sort = new Sort().getElement();
    this._tasksContainer = new TasksContainer().getElement();
    this._loadMoreBtn = new LoadMoreButton().getElement();
    this._noTasksContainer = new NoTasksElement().getElement();
    // Задачи
    this._tasks = tasks;
  }

  // Логика отрисовки компонент
  init() {
    // ставляет контейнеры
    // Вызывает ф-цию по отрисовке задачи 
    // Рендерит кнопку LoadMore,
    // Навешиваниет на элементы обработчики
    console.log(`init`);
  }

  _renderTask(task) {
    //
  }

  _sortLinkClickHandler(evt) {
    // реализация сортировки
    evt.preventDefault();
  }

}

export default BoardController;
