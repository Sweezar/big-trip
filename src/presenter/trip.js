import { RenderPosition, render } from '../utils/render.js';
import SortView from '../view/sort.js';
import ListView from '../view/trip-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';

export default class Trip {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortView();
    this._listCompanent = new ListView();
    this._noEvent = new NoEventView();
  }

  init(events) {
    this._events = events.slice();
    this._renderTripBoard();
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

  _renderTripBoard() {
    if (this._events.length == 0) {
      return this._renderNoEvents();
    }
    this._renderSort();
    this._renderList();

    this._events.forEach((event) => {
      new PointPresenter(this._listCompanent).init(event);
    });
  }
}

