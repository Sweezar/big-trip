import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

export function createInfoMainTemplate(events) {
  dayjs.extend(minMax);

  const route = events.map((item) => {
    return item.destination.name;
  }).join(' &mdash; ');

  const timesFrom = events.map((item) => {
    return dayjs(item.dateFrom);
  });

  const timesTo = events.map((item) => {
    return dayjs(item.dateTo);
  });

  return `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dayjs.min(timesFrom).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs.max(timesTo).format('MMM DD')}</p>
    </div>`;
}
