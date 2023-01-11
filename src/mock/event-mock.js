import { randomNumber, getRandomArrayElement } from '../utils/utils';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

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
    id: nanoid(),
    isFavorite: Boolean(randomNumber(0,1)),
    offers: generateOffer(),
    type: `${getRandomArrayElement(POINTS)}`,
  };
}

function generateOffer() {
  return [
    {
      title: 'Upgrade to a business class',
      price: `${randomNumber(10, 150)}`,
    },
  ];
}

function generateDestination() {
  const city = `${getRandomArrayElement(CITIES)}`;
  return {
    name: city,
    description: `${city}, is a beautiful city, a true asian pearl, with crowded streets.`,
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
