import {createElement} from '../utils.js';

export class Filter {
  constructor(data, amount, isActiveFilter = false) {
    this._amount = amount;
    this._title = data.title;
    this._element = null;
    this._isActiveFilter = isActiveFilter;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<input type="radio" id="filter__${this._title.toLowerCase()}" class="filter__input visually-hidden" name="filter"
      ${this._amount === 0 ? `disabled` : ``}
      ${this._isActiveFilter ? `checked` : ``}
    />
    <label for="filter__${this._title.toLowerCase()}" class="filter__label">
      ${this._title.toLowerCase()} <span class="filter__${this._title.toLowerCase()}-count">${this._amount}</span>
    </label>`.trim();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}

export default Filter;
