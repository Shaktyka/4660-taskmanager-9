// Рендерит Фильтр
export const makeFilter = (data, amount, isActiveFilter = false) => {
  return `<input
      type="radio"
      id="filter__${data.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${amount === 0 ? `disabled` : ``}
      ${isActiveFilter ? `checked` : ``}
    />
    <label for="filter__${data.title}" class="filter__label">
      ${data.title} <span class="filter__${data.title}-count">${amount}</span>
    </label>`.trim();
};
