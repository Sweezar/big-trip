import { RenderPosition, render, remove } from '../utils/render.js';
import SortView from '../view/sort.js';
import ListView from '../view/trip-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { updateItem, sortBy } from '../utils/utils.js';
import { SortType, UpdateType, UserAction } from '../const.js';

export default class Trip {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;

    // this._sortComponent = new SortView();
    this._listCompanent = new ListView();
    this._noEventCompanent = new NoEventView();

    // this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._renderTripBoard();
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortBy.day);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortBy.time);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortBy.price);
    }

    return this._pointsModel.getPoints();
  }

  // _handleEventChange(updatedEvent) {
  //   this._events = updateItem(this._events, updatedEvent);
  //   this._eventPresenter[updatedEvent.id].init(updatedEvent);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        this._handleModelEvent(updateType, update); //------//
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTripBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    // this._sortEvents(sortType);
    this._currentSortType = sortType;
    // this._clearEventsList();
    this._clearTripBoard();
    this._renderTripBoard();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoEvents() {
    render(this._container, this._noEventCompanent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._container, this._listCompanent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const pointPresenter = new PointPresenter(this._listCompanent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(event);
    this._eventPresenter[event.id] = pointPresenter;
  }

  _clearTripBoard({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventCompanent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTripBoard() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount == 0) {
      return this._renderNoEvents();
    }
    this._renderSort();
    this._renderList();
    points.forEach((point) => {
      this._renderEvent(point);
    });
  }
}

