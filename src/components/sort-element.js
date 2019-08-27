import {createElement} from '../utils.js';

export class SortElement {
  constructor({href, title}) {
    this._element = null;
    this._href = href;
    this._title = title;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<a href="${this._href}" class="board__filter">SORT BY ${this._title}</a>`.trim();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}

export default SortElement;
