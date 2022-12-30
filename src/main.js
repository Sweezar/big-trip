import { generatePoint } from './mock/event-mock.js';
import TripPresenter from './presenter/trip.js';
import HeaderPresenter from './presenter/header.js';

const EVENTS_COUNT = 4;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const tripMain = document.querySelector('.trip-main');

const headerPresenter = new HeaderPresenter(tripMain);
headerPresenter.init(events);

const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripEventsContainer);
tripPresenter.init(events);
