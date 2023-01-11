import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement() {
    const oldElem = this.getElement();
    const parent = oldElem.parentElement;
    this.removeElement();

    const newElem = this.getElement();

    parent.replaceChild(newElem, oldElem);

    this.restoreHandlers();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);
    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
