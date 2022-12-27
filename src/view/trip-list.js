import AbstractView from './abstract';

function createListTemplate() {
  return `<ul class="trip-events__list">
  
  </ul>`;
}

export default class List extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}
