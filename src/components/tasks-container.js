import {AbstractComponent} from './abstract-component.js';

export class TasksContainer extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`.trim();
  }
}

export default TasksContainer;
