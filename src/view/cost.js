import AbstractView from './abstract';

function createCostTemplate(events) {
  const result = events.reduce((sum, current) => sum + current.basePrice, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${result}</span>
  </p>`;
}

export default class Cost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createCostTemplate(this._events);
  }
}
