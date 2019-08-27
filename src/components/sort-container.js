import {createElement} from '../utils.js';

export class SortContainer {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div class="board__filter-list"></div>`.trim();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}

export default SortContainer;
