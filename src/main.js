import { createInfoTemplate } from './view/info-container.js';
import { createInfoMainTemplate } from './view/info-main.js';
import { createCostTemplate } from './view/cost.js';
import { createTabsTemplate } from './view/tabs.js';
import { createFilterTemplate } from './view/filters.js';
import { createSortTemplate } from './view/sort.js';
import { createListTemplate } from './view/trip-list.js';
import { createEditFormTemplate } from './view/edit-event-form.js';
import { createEventTemplate } from './view/event.js';
import { generatePoint } from './mock/event-mock.js';

const EVENTS_COUNT = 4;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

const tripMain = document.querySelector('.trip-main');
render(tripMain, createInfoTemplate(), 'afterBegin');

const tripInfoContainer = document.querySelector('.trip-info');
render(tripInfoContainer, createInfoMainTemplate(events), 'beforeend');
render(tripInfoContainer, createCostTemplate(events), 'beforeend');

const navigation = document.querySelector('.trip-controls__navigation');
render(navigation, createTabsTemplate(), 'beforeend');
render(navigation, createFilterTemplate(), 'beforeend');

const tripEventsContainer = document.querySelector('.trip-events');
render(tripEventsContainer, createSortTemplate(), 'beforeend');
render(tripEventsContainer, createListTemplate(), 'beforeend');

const eventsList = document.querySelector('.trip-events__list');
render(eventsList, createEditFormTemplate(events[0]), 'beforeend');

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(eventsList, createEventTemplate(events[i]), 'beforeend');
}
