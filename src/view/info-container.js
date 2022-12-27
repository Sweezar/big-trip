import AbstractView from './abstract';

export function createInfoTemplate() {
  return `<section class="trip-main__trip-info  trip-info">

  </section>`;
}

export default class InfoContainer extends AbstractView {
  getTemplate() {
    return createInfoTemplate();
  }
}
