import { NextApiRequest, NextApiResponse } from 'next';
import { EventDataTypes } from '@/types';

let eventsData: EventDataTypes[] = [
  {
    id: '2089',
    title: 'Planning Meeting',
    date: '2024-06-02',
    startTime: '13:30',
    endTime: '14:00',
    allDay: false,
    description: '',
  },
  {
    id: '3080',
    title: 'Grooming Meeting',
    date: '2024-06-03',
    startTime: '13:30',
    endTime: '14:00',
    allDay: false,
    description: '',
  },
];

const generateUniqueId = (): string => {
  let id: string;
  do {
    id = (Math.floor(Math.random() * 9000) + 1000).toString();
  } while (eventsData.some(event => event.id === id));
  return id;
};

const getEventById = (id: string) => eventsData.find(event => event.id === id);

const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const event = getEventById(id);
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(404).json({ error: 'Event not found' });
    }
  }
  res.status(200).json(eventsData);
};

const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newEventData = {
      ...req.body,
      id: generateUniqueId(),
    };
    eventsData.push(newEventData);

    res.status(201).json(newEventData);
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const eventIndex = eventsData.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const updatedEventData = { ...eventsData[eventIndex], ...req.body };
  eventsData[eventIndex] = updatedEventData;
  
  res.status(200).json(updatedEventData);
};

const calendar = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    case 'PUT':
      handlePut(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default calendar;
