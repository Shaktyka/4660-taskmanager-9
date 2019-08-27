// Массив названий месяцов года
export const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

// Генерация случайного числа от min до max включительно
export const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

// Добавляет 0 к количеству минут < 10
export const addLeadZero = (units) => units < 10 ? (`0` + units) : units;

// Рендеринг элемента из разметки
export const createElement = (string) => {
  const div = document.createElement(`div`);
  div.innerHTML = string;
  // Для HTML -коллекций
  if (div.children.length > 1) {
    return div.children;
  }
  return div.firstChild;
};

// Удаляет элемент из DOM
export const unrender = (element) => {
  if (element) {
    element.remove();
    element.removeElement();
  }
};

// Выявление повторяющихся задач
export const hasRepeatingDays = (object) => {
  return Object.keys(object).some((day) => day);
};

// Возвращает AM или PM
export const getAMPM = (date) => {
  return date.getHours() >= 0 && date.getHours() < 12 ? `AM` : `PM`;
};
// Просроченные задачи
// new Date(obj.dueDate) < Date.now()

export default createElement;
