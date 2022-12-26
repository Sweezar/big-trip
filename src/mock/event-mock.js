import { randomNumber, getRandomArrayElement } from '../utils/utils';
import dayjs from 'dayjs';

const POINTS = [
  'Taxi' , 'Bus' , 'Train' , 'Ship' , 'Transport' , 'Drive' , 'Flight' , 'Check-in' , 'Sightseeing' , 'Restaurant',
];

const CITIES = [
  'Amsterdam', 'Chamonix', 'Geneva', 'Barcelona', 'Oslo', 'Riga', 'Tallinn', 'Warsaw', 'Vilnius', 'Johannesburg', 'Istanbul', 'Frankfurt', 'Dublin',
];

function generateDate() {
  const maxMinutesGap = 950;
  const minutesGap = randomNumber(0, maxMinutesGap);

  return dayjs().add(minutesGap, 'minutes').toDate();
}

export function generatePoint() {
  return {
    basePrice: randomNumber(10, 1500),
    dateFrom: `${generateDate()}`,
    dateTo: `${dayjs(generateDate()).add(950, 'minutes').toDate()}`,
    destination: generateDestination(),
    id: '0',
    isFavorite: Boolean(randomNumber(0,1)),
    offers: generateOffer(),
    type: `${getRandomArrayElement(POINTS)}`,
  };
}

function generateOffer() {
  return {
    type: `${getRandomArrayElement(POINTS)}`,
    offers: [
      {
        title: 'Upgrade to a business class',
        price: `${randomNumber(10, 150)}`,
      }, {
        title: 'Choose the radio station',
        price: `${randomNumber(10, 50)}`,
      },
    ],
  };
}

function generateDestination() {
  const city = `${getRandomArrayElement(CITIES)}`;
  return {
    description: `${city}, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `${city}`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${randomNumber(1,999)}`,
        description: `${city} parliament building`,
      },
      {
        src: `http://picsum.photos/300/200?r=${randomNumber(1,999)}`,
        description: `${city} parliament building`,
      },
      {
        src: `http://picsum.photos/300/200?r=${randomNumber(1,999)}`,
        description: `${city} parliament building`,
      },
      {
        src: `http://picsum.photos/300/200?r=${randomNumber(1,999)}`,
        description: `${city} parliament building`,
      },
      {
        src: `http://picsum.photos/300/200?r=${randomNumber(1,999)}`,
        description: `${city} parliament building`,
      },
    ],
  };
}
