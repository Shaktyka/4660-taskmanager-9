// Рендерит Фильтр
export const makeFilter = (data, isActiveFilter = false) => {
  return `<input
      type="radio"
      id="filter__${data.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${data.count === 0 ? `disabled` : ``}
      ${isActiveFilter ? `checked` : ``}
    />
    <label for="filter__${data.title}" class="filter__label">
      ${data.title} <span class="filter__${data.title}-count">${data.count}</span>
    </label>`.trim();
};
