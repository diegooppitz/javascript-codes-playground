import { CalendarDataTypes, WeekDay } from '@/types';
import { formatDateInfo, formatWeekDay } from '@/utils/dates/format_infos';
import { findSundayInfo } from './manage_infos';

const getSunday = (): Date => {
  return findSundayInfo();
};

const getToday = (): Date => {
  return new Date();
};

const getWeek = (weekToGo: number): WeekDay[] => {
  const sunday = getSunday();
  const targetSunday = new Date(sunday);
  targetSunday.setDate(sunday.getDate() + weekToGo * 7);

  const week = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(targetSunday);
    day.setDate(targetSunday.getDate() + index);

    return {
      name: formatWeekDay(day),
      date: day,
      weekDay: formatWeekDay(day),
    };
  });

  return week;
};

const mockWeek: WeekDay[] = Array.from({ length: 7 }).map((_, index) => {
  const day = new Date(getSunday());
  day.setDate(getSunday().getDate() + index);

  return {
    name: formatWeekDay(day),
    date: day,
    weekDay: formatWeekDay(day),
  };
});

export const getFormattedDateInfo = (
  weekToGo: number = 0
): CalendarDataTypes => {
  const { firstDayFormatted, lastDayFormatted, formattedRange } =
    formatDateInfo(getWeek(weekToGo));

  return {
    week: getWeek(weekToGo),
    firstDay: firstDayFormatted,
    lastDay: lastDayFormatted,
    currentYear: getToday().getFullYear(),
    today: getToday(),
    formattedRange: formattedRange,
  };
};

export const getCurrentTimeFormatted = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getNextRoundedTime = (
  formattedCurrentTime: string,
  skipTime: number
) => {
  const [currentHours, currentMinutes] = formattedCurrentTime
    .split(':')
    .map(Number);
  let nextRoundedTime = new Date();

  if (currentMinutes > skipTime) {
    nextRoundedTime.setHours(currentHours + 1);
    nextRoundedTime.setMinutes(0);
  } else {
    nextRoundedTime.setMinutes(skipTime);
  }

  const nextSuggestedHours = String(nextRoundedTime.getHours()).padStart(
    2,
    '0'
  );
  const nextSuggestedMinutes = String(nextRoundedTime.getMinutes()).padStart(
    2,
    '0'
  );
  return `${nextSuggestedHours}:${nextSuggestedMinutes}`;
};

export const mockEventData = {
  id: '',
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  allDay: false,
};

export const getEventSuggestedDate = () => {
  const formattedCurrentTime = getCurrentTimeFormatted();
  const startTime = getNextRoundedTime(formattedCurrentTime, 30);
  const endTime = getNextRoundedTime(formattedCurrentTime, 60);

  return { startTime, endTime }
};
