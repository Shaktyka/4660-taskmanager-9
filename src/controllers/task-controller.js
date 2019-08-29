
export class TaskController {
  constructor(container, data) {
  	// элемент, к которому контроллер будет всё аппендить
  	// данные, которын нужно отображать
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  init() {

  }
}
