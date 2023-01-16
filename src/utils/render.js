import Abstract from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export function render(container, element, place) {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
}

export function replace(oldElem, newElem) {
  if (oldElem instanceof Abstract) {
    oldElem = oldElem.getElement();
  }
  if (newElem instanceof Abstract) {
    newElem = newElem.getElement();
  }
  oldElem.parentNode.replaceChild(newElem, oldElem);
}

export function remove(component) {
  if (component === null) {
    return;
  }

  if(!(component instanceof Abstract)) {
    throw new Error('Can remove only components!');
  }

  component.getElement().remove();
  component.removeElement();
}
