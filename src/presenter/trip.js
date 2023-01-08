import { RenderPosition, render } from '../utils/render.js';
import SortView from '../view/sort.js';
import ListView from '../view/trip-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/utils.js';

export default class Trip {
  constructor(container) {
    this._container = container;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._listCompanent = new ListView();
    this._noEvent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._renderTripBoard();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoEvents() {
    render(this._container, this._noEvent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._container, this._listCompanent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const pointPresenter = new PointPresenter(this._listCompanent, this._handleEventChange, this._handleModeChange);
    pointPresenter.init(event);
    this._eventPresenter[event.id] = pointPresenter;
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderTripBoard() {
    if (this._events.length == 0) {
      return this._renderNoEvents();
    }
    this._renderSort();
    this._renderList();
    this._events.forEach((event) => {
      this._renderEvent(event);
    });
  }
}

