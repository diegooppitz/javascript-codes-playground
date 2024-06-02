'use client';
import React, { useEffect, useState } from 'react';
import CalendarNav from '@/components/calendar/calendar-nav';
import { getFormattedDateInfo } from '@/utils/dates/get_infos';
import { CalendarDataTypes, WeekDay, EventDataTypes } from '@/types';
import './calendar.scss';
import EventModal from '@/components/calendar/event-modal';
import CalendarDay from '@/components/calendar/calendar-day';

const Calendar: React.FC = () => {
  const [eventsData, setEventsData] = useState<EventDataTypes[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventModalData, setEventModalData] = useState({
    selectedDate: '',
    startTime: '',
    endTime: '',
  });
  const [weekToGo, setWeekToGo] = useState(0);

  const calendarData: CalendarDataTypes = getFormattedDateInfo(weekToGo);
  const weekData: WeekDay[] = calendarData.week;

  const openEventModal = async ({ selectedDate, eventData }) => {
    const newEventData = eventData || { selectedDate };

    setEventModalData(newEventData);
    setModalIsOpen(true);
  };

  const fetchEventsData = async () => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newEventsData = await response.json();
      setEventsData(newEventsData);
    } catch (error) {
      console.error('request error:', error);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <div data-testid="calendar-fullscreen" className="calendar-fullscreen">
      {weekData.length > 0 && (
        <>
          <CalendarNav
            calendarData={calendarData}
            setWeekToGo={setWeekToGo}
            weekToGo={weekToGo}
          />
          <div className="week-grid">
            {weekData.map((dayData, index) => (
              <CalendarDay
                key={index}
                openEventModal={openEventModal}
                dayData={dayData}
                eventsData={eventsData}
                index={index}
              />
            ))}
          </div>
          <EventModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            eventModalData={eventModalData}
          />
        </>
      )}
    </div>
  );
};

export default Calendar;
