// Генерация случайного числа от min до max включительно
export const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

// Добавляет 0 к количеству минут < 10
export const addLeadZero = (units) => units < 10 ? (`0` + units) : units;

export default getRandomNumber;
