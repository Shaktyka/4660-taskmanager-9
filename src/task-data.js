import {getRandomNumber} from './utils.js';

// Миллисекунд за неделю
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

// Возвращает Set из num тегов
const getHashes = (array, num) => {
  const tagsSet = new Set();
  while (tagsSet.size < num) {
    tagsSet.add(array[getRandomNumber(0, array.length - 1)]);
  }
  return tagsSet;
};

// Возвращает объект с рандомными данными для задачи
export const makeTaskData = () => {
  return {
    description: descriptions[getRandomNumber(0, descriptions.length - 1)],
    dueDate: getRandomNumber(Date.now() - WEEK_SECONDS, Date.now() + WEEK_SECONDS),
    repeatingDays: {
      'mo': getBoolean(),
      'tu': getBoolean(),
      'we': getBoolean(),
      'th': getBoolean(),
      'fr': getBoolean(),
      'sa': getBoolean(),
      'su': getBoolean()
    },
    tags: getHashes(hashtags, getRandomNumber(0, 3)),
    color: colors[getRandomNumber(0, colors.length - 1)],
    isFavorite: getBoolean(),
    isArchive: getBoolean()
  }
};
