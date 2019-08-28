import {AbstractComponent} from './abstract-component.js';

export class NoTasksElement extends AbstractComponent {
  constructor({text}) {
    super();
    this._text = text;
  }

  getTemplate() {
    return `<p class="board__no-tasks>${this._text}</p>`.trim();
  }
}

export default NoTasksElement;
