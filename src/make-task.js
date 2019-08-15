import {getRandomNumber} from './utils.js';

// Секунд за неделю
const WEEK_SECONDS = 7 * 24 * 3600 * 1000;

// Задачи 
const descriptions = [
  `Пересмотреть лекцию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
  `Задать вопросы наставнику`,
  `Написать куратору`,
  `Изучить демки к модулю`,
  `Выполнить задание`,
  `Пройти курс по теме`
];

// Хэштеги
const hashtags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `demo`,
  `question`,
  `course`
];

// Цвета карточек
const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

// Возвращает true или false
const getBoolean = () => Math.random() >= 0.5;

// Перемешивает массив
const shuffleArray = (array) => {
  const copiedArray = array.slice();
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
};

// Возвращает х элементов из массива
const getElementsFromArray = (array, num) => shuffleArray(array).slice(0, num);

// Возвращает объект с рандомными данными для задачи
export const createTaskData = () => {
  return {
    description: descriptions[getRandomNumber(0, descriptions.length - 1)],
    dueDate: getRandomNumber(Date.now() - WEEK_SECONDS, Date.now() + WEEK_SECONDS),
    repeatingDays: {
      'Mo': getBoolean(),
      'Tu': getBoolean(),
      'We': getBoolean(),
      'Th': getBoolean(),
      'Fr': getBoolean(),
      'Sa': getBoolean(),
      'Su': getBoolean()
    },
    tags: `от 0 до 3 тегов рандомно из Set`,
    color: colors[getRandomNumber(0, colors.length - 1)],
    isFavorite: getBoolean(),
    isArchive: getBoolean()
  }
};

console.log(createTaskData());

// Написать код генерации случайного набора хэштегов
