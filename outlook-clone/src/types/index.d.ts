import React from 'react';

export type CalendarDataTypes = {
  week: WeekDay[];
  firstDay: Date;
  lastDay: Date;
  currentYear: number;
  today: Date;
  formattedRange?: string;
};

export type CalendarNavPropsTypes = {
  calendarData: CalendarDataTypes | null;
  setWeekToGo: React.Dispatch<React.SetStateAction<number>>;
  weekToGo: number;
};

export type SuggestedDate = {
  selectedDate: string;
  startTime: string;
  endTime: string;
};

export type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventModalData: EventDataTypes;
};

export type EventDataTypes = {
  selectedDate?: string;
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  allDay?: boolean;
};

export type WeekDay = {
  name: string;
  weekDay: string;
  date: Date;
};
