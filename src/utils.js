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

// Выявление повторяющихся задач
export const hasRepeatingDays = (object) => {
  return Object.keys(object).some((day) => day);
};

export default createElement;
