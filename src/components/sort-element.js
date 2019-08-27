// Возвращает фильтры сортировки
export const makeSortElement = (dataObj) => {
  return `<a href="${dataObj.href}" class="board__filter">SORT BY ${dataObj.title}</a>`.trim();
};
