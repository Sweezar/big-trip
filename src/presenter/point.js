import { RenderPosition, render, replace } from '../utils/render.js';
import EditFormView from '../view/edit-event-form.js';
import EventView from '../view/event.js';

export default class Point {
  constructor(container) {
    this._container = container;
    this._onEscKeydown = this._onEscKeydown.bind(this);
  }

  init(event) {
    this._event = event;
    this._eventCompanent = new EventView(this._event);
    this._eventEditCompanent = new EditFormView(this._event);
    this._renderEvent();
  }

  _replaceCardToForm() {
    replace(this._eventCompanent, this._eventEditCompanent);
  }

  _replaceFormToCard() {
    replace(this._eventEditCompanent, this._eventCompanent);
  }

  _onEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener('keydown', this._onEscKeydown);
    }
  }

  _renderEvent() {
    this._eventCompanent.setRollupClickHandler(() => {
      this._replaceCardToForm();
      document.addEventListener('keydown', this._onEscKeydown);
    });

    this._eventEditCompanent.setRollupClickHandler(() => {
      this._replaceFormToCard();
    });

    this._eventEditCompanent.setSubmitHandler(() => {
      this._replaceFormToCard();
    });

    render(this._container, this._eventCompanent, RenderPosition.BEFOREEND);
  }
}
