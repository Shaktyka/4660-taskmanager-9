import {createElement} from '../utils.js';

export class FilterContainer {
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
    return `<section class="main__filter filter container"></section>`.trim();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}

export default FilterContainer;
