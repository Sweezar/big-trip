import AbstractView from './abstract';

function createNoEventTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoEvent extends AbstractView {
  getTemplate() {
    return createNoEventTemplate();
  }
}
