'use client';
import React from 'react';
import { formatDate } from '@/utils/dates/format_infos';
import { EventDataTypes } from '@/types';
import '@/app/(pages)/calendar/calendar.scss';

interface CalendarDayProps {
  openEventModal: (params: {
    eventModalData: string;
    eventData?: EventDataTypes;
  }) => Promise<void>;
  dayData: any;
  eventsData: EventDataTypes[];
  index: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  openEventModal,
  dayData,
  eventsData,
  index,
}) => {
  const { monthDay, weekDay, dateIsToday } = dayData;
  const dayDate = formatDate(dayData.date);
  const isToday = dateIsToday ? 'date-day-today date-day' : 'date-day';

  const fetchEventById = async (eventId: string | null) => {
    try {
      const response = await fetch(`/api/calendar?id=${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const eventData = await response.json();
      openEventModal({ eventModalData: dayDate, eventData });
    } catch (error) {
      console.error('request error:', error);
    }
  };

  return (
    <div key={index} className="date-column">
      <div data-testid={`date-wrapper-${index}`} className="date-wrapper">
        <span data-testid={`week-day-${index}`} className="week-day">
          {weekDay}
        </span>
        <span data-testid={`month-day-${index}`} className={isToday}>
          {monthDay}
        </span>
      </div>
      <div
        className="date-column-inner"
        onClick={() => openEventModal({ eventModalData: dayDate })}
      ></div>
      <div className="events-wrapper">
        {eventsData.map((event, index) => {
          const eventId = event.id ?? '';
          const eventDate = event.date ? formatDate(new Date(event.date)) : '';

          if (eventDate === dayDate) {
            return (
              <div
                key={index}
                className="event-block"
                onClick={() => fetchEventById(eventId)}
              >
                <strong>{event.title}</strong>
                <div>{`${event.startTime} - ${event.endTime}`}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
