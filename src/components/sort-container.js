import {AbstractComponent} from './abstract-component.js';

export class SortContainer extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list"></div>`.trim();
  }
}

export default SortContainer;
