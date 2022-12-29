import InfoContainerView from '../view/info-container.js';
import InfoMainView from '../view/info-main.js';
import CostView from '../view/cost.js';
import TabsView from '../view/tabs.js';
import FilterView from '../view/filters.js';
import { render } from '../utils/render.js';
import { RenderPosition } from '../utils/render.js';

export default class Header {
  constructor(container) {
    this._container = container;
    this._navigationContainer = this._container.querySelector('.trip-controls__navigation');
    this._infoContainer = new InfoContainerView();
    this._tabs = new TabsView();
    this._filter = new FilterView();
  }

  init(events) {
    if (events != 0) {
      this._events = events;
      this._infoMain = new InfoMainView(events);
      this._cost = new CostView(events);

      this._renderHeader();
    }
    this._renderTabs();
    this._renderFilter();
  }

  _renderTabs() {
    render(this._navigationContainer, this._tabs, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._navigationContainer, this._filter, RenderPosition.BEFOREEND);
  }

  _renderInfoContainer() {
    render(this._container, this._infoContainer, RenderPosition.AFTERBEGIN);
  }

  _renderInfoMain() {
    render(this._infoContainer, this._infoMain, RenderPosition.BEFOREEND);
  }

  _renderCost() {
    render(this._infoContainer, this._cost, RenderPosition.BEFOREEND);
  }

  _renderHeader() {
    this._renderInfoContainer();
    this._renderInfoMain();
    this._renderCost();
  }
}
