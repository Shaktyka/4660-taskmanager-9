import {Board} from '../components/board.js';
import {TasksContainer} from './components/tasks-container.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TasksContainer();
  }

  // Логика отрисовки компонент
  init() {
    // всю логику, по рендерингу задач
    // и кнопки LoadMore,
    // а так же навешиванию на них обработчиков
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
