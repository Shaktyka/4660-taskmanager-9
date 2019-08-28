import {AbstractComponent} from './abstract-component.js';

export class Sort extends AbstractComponent {
  constructor({href, title}) {
    super();
    this._href = href;
    this._title = title;
    this._sortType = title.replace(/ /g, `-`).toLowerCase();
  }

  getTemplate() {
    return `<a href="${this._href}" data-sort="${this._sortType}" class="board__filter">SORT BY ${this._title}</a>`.trim();
  }
}

export default Sort;
