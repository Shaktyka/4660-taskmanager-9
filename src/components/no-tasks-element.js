import {createElement} from '../utils.js';

export class NoTasksElement {
  constructor({text}) {
    this._element = null;
    this._text = text;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<p class="board__no-tasks>${this._text}</p>`.trim();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}

export default NoTasksElement;
