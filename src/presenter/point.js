import { RenderPosition, render, replace, remove } from '../utils/render.js';
import EditFormView from '../view/edit-event-form.js';
import EventView from '../view/event.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventCompanent = null;
    this._eventEditCompanent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventCompanent = this._eventCompanent;
    const prevEventEditCompanent = this._eventEditCompanent;

    this._eventCompanent = new EventView(this._event);
    this._eventEditCompanent = new EditFormView(this._event);

    this._eventCompanent.setRollupClickHandler(() => {
      this._replaceCardToForm();
      document.addEventListener('keydown', this._onEscKeydown);
    });

    this._eventCompanent.setFavoritClickHandler(this._handleFavoriteClick);

    this._eventEditCompanent.setRollupClickHandler(() => {
      this._replaceFormToCard();
    });

    this._eventEditCompanent.setSubmitHandler((data) => {
      this._handleSubmit(data);
      this._replaceFormToCard();
    });

    if (prevEventCompanent === null || prevEventEditCompanent === null) {
      this._renderEvent();
      return;
    }

    if (this._container.getElement().contains(prevEventCompanent.getElement())) {
      replace(prevEventCompanent, this._eventCompanent);
    }

    if (this._container.getElement().contains(prevEventEditCompanent.getElement())) {
      replace(prevEventEditCompanent, this._eventEditCompanent);
    }

    remove(prevEventCompanent);
    remove(prevEventEditCompanent);
  }

  destroy() {
    remove(this._eventCompanent);
    remove(this._eventEditCompanent);
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT){
      this._replaceFormToCard();
    }
  }

  _handleSubmit(data) {
    this._changeData(
      Object.assign(
        {},
        this._event,
        data,
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }

  _replaceCardToForm() {
    replace(this._eventCompanent, this._eventEditCompanent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventEditCompanent, this._eventCompanent);
    document.removeEventListener('keydown', this._onEscKeydown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _renderEvent() {
    render(this._container, this._eventCompanent, RenderPosition.BEFOREEND);
  }
}
