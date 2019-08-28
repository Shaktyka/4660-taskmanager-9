import {AbstractComponent} from './abstract-component.js';

export class Filter extends AbstractComponent {
  constructor(title, amount, isActiveFilter = false) {
    super();
    this._amount = amount;
    this._title = title;
    this._isActiveFilter = isActiveFilter;
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
}

export default Filter;
