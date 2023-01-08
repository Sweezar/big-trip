import { RenderPosition, render } from '../utils/render.js';
import SortView from '../view/sort.js';
import ListView from '../view/trip-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { updateItem, sortBy } from '../utils/utils.js';
import { SortType } from '../const.js';

export default class Trip {
  constructor(container) {
    this._container = container;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = new SortView();
    this._listCompanent = new ListView();
    this._noEvent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._renderTripBoard();
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleSortTypeChange(sortType) {
    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderTripBoard();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._events.sort(sortBy.day);
        break;
      case SortType.TIME:
        this._events.sort(sortBy.time);
        break;
      case SortType.PRICE:
        this._events.sort(sortBy.price);
        break;
      default:
        break;
    }

    this._currentSortType = sortType;
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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderList() {
    render(this._container, this._listCompanent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const pointPresenter = new PointPresenter(this._listCompanent, this._handleEventChange, this._handleModeChange);
    pointPresenter.init(event);
    this._eventPresenter[event.id] = pointPresenter;
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

