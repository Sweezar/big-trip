import { generatePoint } from './mock/event-mock.js';
import { RenderPosition, render, replace } from './utils/render.js';
import InfoContainerView from './view/info-container.js';
import InfoMainView from './view/info-main.js';
import CostView from './view/cost.js';
import TabsView from './view/tabs.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import ListView from './view/trip-list.js';
import EditFormView from './view/edit-event-form.js';
import EventView from './view/event.js';
import NoEventView from './view/no-event.js';

const EVENTS_COUNT = 4;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const navigation = document.querySelector('.trip-controls__navigation');
const tabs = new TabsView();
render(navigation, tabs, RenderPosition.BEFOREEND);

const filter = new FilterView();
render(navigation, filter, RenderPosition.BEFOREEND);
const tripEventsContainer = document.querySelector('.trip-events');

if (events.length == 0) {
  const noEvent = new NoEventView();
  render(tripEventsContainer, noEvent, RenderPosition.BEFOREEND);
} else {
  const tripMain = document.querySelector('.trip-main');
  const InfoContainer = new InfoContainerView();
  render(tripMain, InfoContainer, RenderPosition.AFTERBEGIN);

  const sort = new SortView();
  render(tripEventsContainer, sort, RenderPosition.BEFOREEND);

  const infoMain = new InfoMainView(events);
  const cost = new CostView(events);
  render(InfoContainer, infoMain, RenderPosition.BEFOREEND);
  render(InfoContainer, cost, RenderPosition.BEFOREEND);

  const eventsList = new ListView();
  render(tripEventsContainer, eventsList, RenderPosition.BEFOREEND);

  for (let i = 0; i < EVENTS_COUNT; i++) {
    renderEvent(eventsList, events[i]);
  }
}

function renderEvent(eventListElement, event) {
  const eventCompanent = new EventView(event);
  const eventEditCompanent = new EditFormView(event);

  function replaceCardToForm() {
    replace(eventCompanent.getElement(), eventEditCompanent.getElement());
  }

  function replaceFormToCard() {
    replace(eventEditCompanent.getElement(), eventCompanent.getElement());
  }

  function onEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeydown);
    }
  }

  eventCompanent.setRollupClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  eventEditCompanent.setRollupClickHandler(() => {
    replaceFormToCard();
  });

  eventEditCompanent.setSubmitHandler(() => {
    replaceFormToCard();
  });

  render(eventListElement, eventCompanent, RenderPosition.BEFOREEND);
}


