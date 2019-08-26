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
