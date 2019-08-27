import {AbstractComponent} from './abstract-component.js';

export class FilterContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="main__filter filter container"></section>`.trim();
  }
}

export default FilterContainer;
