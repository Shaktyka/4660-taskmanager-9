import {AbstractComponent} from './abstract-component.js';

export class Sort extends AbstractComponent {
  constructor({href, title}) {
    super();
    this._href = href;
    this._title = title;
  }

  getTemplate() {
    return `<a href="${this._href}" class="board__filter">SORT BY ${this._title}</a>`.trim();
  }
}

export default Sort;
