export { getRandomArrayElement, randomNumber, shuffle, limitStr, createElement, updateItem, getTimeFromMins };

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(elements) {
  return elements[randomNumber(0, elements.length - 1)];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function limitStr(str, n) {
  return str.substr(0, n - 3) + '...';
}

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
}

function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
}

function getTimeFromMins(mins) {
  const days = Math.trunc(mins/1440);
  let hours;
  let minutes = mins % 60;
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  days ? hours = Math.trunc((mins%1440)/60): hours = Math.trunc(mins/60);
  if (hours < 10) {
    hours = '0' + hours;
  }

  if (days == 0 && hours == 0) {
    return minutes + 'M';
  } else if (days == 0) {
    return hours + 'H ' + minutes + 'M';
  }
  return days + 'D ' + hours + 'H ' + minutes + 'M';
}


