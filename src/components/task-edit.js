import {addLeadZero} from '../utils.js';

// Массив названий месяцов года
const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

// Возвращает AM или PM
const getAMPM = (date) => {
  return date.getHours() > 0 && date.getHours() < 12 ? `AM` : `PM`;
};

// Возвращает карточку с формой создания задачи
export const makeTaskEdit = ({description, dueDate, repeatingDays, tags, color, isArchive, isFavorite}) => {
  // console.log(repeatingDays);
  const date = new Date(dueDate);
  const repeatingTask = Object.keys(repeatingDays).some((day) => repeatingDays[day]);

  return `<article class="card card--edit card--${color} ${repeatingTask ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites ${isFavorite ? `card__btn--disabled` : ``}">
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${dueDate ? `no` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="23 September"
                            name="date"
                            value="${date.getDate() ? (date.getDate() + ` ` + months[date.getMonth()] + ` ` + addLeadZero(date.getHours()) + `:` + addLeadZero(date.getMinutes()) + ` ` + getAMPM(date)) : ``}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${repeatingTask ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days" ${repeatingTask ? `` : `disabled`}>
                        <div class="card__repeat-days-inner">
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-mo-1"
                            name="repeat"
                            value="mo"
                            ${repeatingDays[`mo`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-mo-1"
                            >mo</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-tu-1"
                            name="repeat"
                            value="tu"
                            ${repeatingDays[`tu`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-tu-1"
                            >tu</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-we-1"
                            name="repeat"
                            value="we"
                            ${repeatingDays[`we`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-we-1"
                            >we</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-th-1"
                            name="repeat"
                            value="th"
                            ${repeatingDays[`th`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-th-1"
                            >th</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-fr-1"
                            name="repeat"
                            value="fr"
                            ${repeatingDays[`fr`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-fr-1"
                            >fr</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            name="repeat"
                            value="sa"
                            id="repeat-sa-1"
                            ${repeatingDays[`sa`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-sa-1"
                            >sa</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-su-1"
                            name="repeat"
                            value="su"
                            ${repeatingDays[`su`] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-su-1"
                            >su</label
                          >
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
                          <span class="card__hashtag-name">
                            #${tag}
                          </span>
                        </span>`).join(``)}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>

                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      <input
                        type="radio"
                        id="color-black-1"
                        class="card__color-input card__color-input--black visually-hidden"
                        name="color"
                        value="black"
                        ${color === `black` ? `checked` : ``}
                      />
                      <label
                        for="color-black-1"
                        class="card__color card__color--black"
                        >black</label
                      >
                      <input
                        type="radio"
                        id="color-yellow-1"
                        class="card__color-input card__color-input--yellow visually-hidden"
                        name="color"
                        value="yellow"
                        ${color === `yellow` ? `checked` : ``}
                      />
                      <label
                        for="color-yellow-1"
                        class="card__color card__color--yellow"
                        >yellow</label
                      >
                      <input
                        type="radio"
                        id="color-blue-1"
                        class="card__color-input card__color-input--blue visually-hidden"
                        name="color"
                        value="blue"
                        ${color === `blue` ? `checked` : ``}
                      />
                      <label
                        for="color-blue-1"
                        class="card__color card__color--blue"
                        >blue</label
                      >
                      <input
                        type="radio"
                        id="color-green-1"
                        class="card__color-input card__color-input--green visually-hidden"
                        name="color"
                        value="green"
                        ${color === `green` ? `checked` : ``}
                      />
                      <label
                        for="color-green-1"
                        class="card__color card__color--green"
                        >green</label
                      >
                      <input
                        type="radio"
                        id="color-pink-1"
                        class="card__color-input card__color-input--pink visually-hidden"
                        name="color"
                        value="pink"
                        ${color === `pink` ? `checked` : ``}
                      />
                      <label
                        for="color-pink-1"
                        class="card__color card__color--pink"
                        >pink</label
                      >
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
    </article>`.trim();
};
