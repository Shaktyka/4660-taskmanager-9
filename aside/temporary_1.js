

// Рендеринт sort фильтра
// const renderSortFilter = (container, dataArr) => {
//   let fragment = new DocumentFragment();
//   dataArr.forEach((dataEl) => {
//     const el = new SortElement(dataEl).getElement();
//     fragment.appendChild(el);
//   });
//   container.appendChild(fragment);
// };

// ТЕПЕРЬ НАМ НАДО ОТРИСОВАТЬ КОНТЕНТ В ЗАВ-ТИ ОТ ДАННЫХ



// Обработчик нажатия на кнопку "Load More"
const onLoadMoreBtnClick = (evt) => {
  evt.preventDefault();
  // Добавление в контейнер ещё карточек из массива
};


// Рендеринг отдельной задачи
const renderTask = () => {
  const task = new Task(taskEl).getElement();
  const editBtn = task.querySelector(`.card__btn--edit`);
  const editTask = new EditTask(taskEl).getElement();
  const editForm = editTask.querySelector(`form`);
  const textarea = editTask.querySelector(`textarea`);

    const documentEscKeydownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(task, editTask);
        document.removeEventListener(`keydown`, documentEscKeydownHandler);
      }
    };

    textarea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });

    textarea.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(editTask, task);
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      container.replaceChild(task, editTask);
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });
};

// Рендеринг всех карточек
const renderTasks = (container, tasksArr) => {
  let fragment = new DocumentFragment();
  tasksArr.forEach((taskData) => {
    const task = renderTask(taskData);
    fragment.appendChild(task);
  });
  container.appendChild(fragment);
};






// Рендеринг стартового контента
const renderStartContent = (container, tasksArr) => {
  if (tasksArr.length === 0) {
    // Рендерим текст, что карточек нет
    container.appendChild(new NoTasksElement(NoTasksText.NOT_AT_ALL).getElement());
  } else if (tasksArr.length === document.querySelector(`.filter__archive-count`).textContent) {
    // Рендерим спец. строку, когда, кроме архивных, задач нет
    container.appendChild(new NoTasksElement(NoTasksText.ALL_ARCHIVED).getElement());
  } else {
    // chechIsOnlyArchivedTasks();
    // Рендерим sort-фильтр
    // render(contentContainer, new SortContainer().getElement());
    // const sortContainer = contentContainer.querySelector(`.board__filter-list`);
    // renderSortFilter(sortContainer, sortFilterData);

    // Контейнер для карточек
    render(contentContainer, new TasksContainer().getElement());
    const tasksContainer = document.querySelector(`.board__tasks`);

    // Рендерим остальные карточки
    renderTasks(tasksContainer, tasksArray.slice(0, TasksAmount.START));

    // Рендерим кнопку "LoadMore"
    if (tasksArray.length > TasksAmount.START) {
      render(contentContainer, new LoadMoreButton().getElement());
      const loadMoreBtn = contentContainer.querySelector(`.load-more`);
      loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
    }
  }

};

// Стартовый рендеринг контента
renderStartContent(contentContainer, tasksArray);













const renderTasks = (container, tasksArr) => {
  let fragment = new DocumentFragment();
  tasksArr.forEach((taskEl) => {

    const task = new Task(taskEl).getElement();
    const editBtn = task.querySelector(`.card__btn--edit`);
    const editTask = new EditTask(taskEl).getElement();
    const editForm = editTask.querySelector(`form`);
    const textarea = editTask.querySelector(`textarea`);

    const documentEscKeydownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(task, editTask);
        document.removeEventListener(`keydown`, documentEscKeydownHandler);
      }
    };

    textarea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });

    textarea.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(editTask, task);
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });

    editForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      container.replaceChild(task, editTask);
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    });

    fragment.appendChild(task);
  });
  container.appendChild(fragment);
};
