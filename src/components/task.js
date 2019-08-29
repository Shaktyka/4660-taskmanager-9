import {addLeadZero, MONTHS} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';

export class Task extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    super();
    this._color = color;
    this._date = new Date(dueDate);
    this._description = description;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
    this._isRepeating = Object.keys(repeatingDays).some((day) => repeatingDays[day]);
    this._repeatingDays = repeatingDays;
    this._tags = tags;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${this._isRepeating ? `card--repeat` : ``} ${this._date < (new Date() - 24 * 3600 * 1000) ? `card--deadline` : ``}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}">
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${this._description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    ${this._date ? `<div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${this._date.getDate()} ${MONTHS[this._date.getMonth()]}</span>
                          <span class="card__time">${addLeadZero(this._date.getHours())}:${addLeadZero(this._date.getMinutes())} ${this._date.getHours() >= 12 ? `PM` : `AM`}</span>
                        </p>
                      </div>
                    </div>` : ``}

                    ${this._tags.size > 0 ? `<div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                          <span class="card__hashtag-name">
                            #${tag}
                          </span>
                        </span>`).join(``)}
                      </div>
                    </div>` : ``}
                  </div>
                </div>
              </div>
            </div>
    </article>`.trim();
  }
}

export default Task;
