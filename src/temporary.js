

/////////

// Добавляет компонент(ы) в контейнер
const render = (container, template, amount = 0) => {
  let content = null;
  if (amount) {
    content = new DocumentFragment();
    for (let i = 0; i < amount; i++) {
      content.appendChild(createElement(template));
    }
  } else {
    content = createElement(template);
  }
  container.appendChild(content);
};

/////////

// СОРТИРОВКА
// Рендеринт sort фильтра
const renderSortFilter = (container, dataArr) => {
  let fragment = new DocumentFragment();
  dataArr.forEach((dataEl) => {
    const el = createElement(makeSortElement(dataEl));
    fragment.appendChild(el);
  });
  container.appendChild(fragment);
};
render(contentContainer, createElement(makeSortContainer()));
const sortContainer = contentContainer.querySelector(`.board__filter-list`);
renderSortFilter(sortContainer, sortFilterData);

// Контейнер для карточек
render(contentContainer, createElement(makeTasksContainer()));
const tasksContainer = document.querySelector(`.board__tasks`);
// Рендерим карточки
// console.log(allTasks[0]);
//  render(tasksContainer, makeTaskEdit(allTasks[0]));
// Рендеринг карточек

const renderTasks = (tasksContainer, dataArr) => {
  
  
};

// render(tasksContainer, createElement(makeTask(makeTaskData())));

// Кнопка "Load More"
render(contentContainer, createElement(makeLoadMoreBtn()));
const loadMoreBtn = contentContainer.querySelector(`.load-more`);

// Обработчик нажатия на кнопку "Load More"
const onLoadMoreBtnClick = (evt) => {
  evt.preventDefault();
  // Добавление в контейнер ещё карточек из массива
};

loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);