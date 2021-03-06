import dayjs from "dayjs";
import * as durationPlugin from "dayjs/plugin/duration";
dayjs.extend(durationPlugin);

const formatIntegerWithTwoDigits = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};


export const getTimeDifferenceInMs = (startDate, endDate) => {
  return endDate.diff(startDate);
};

const formatTimeDifference = (timeDifferenceInMs) => {
  const duration = dayjs.duration(timeDifferenceInMs);
  const formattedDays = formatIntegerWithTwoDigits(duration.days());
  const formattedHours = formatIntegerWithTwoDigits(duration.hours());
  const formattedMinutes = formatIntegerWithTwoDigits(duration.minutes());
  if (duration.asHours() < 1) {
    return `${formattedMinutes}M`;
  }
  if (duration.asDays() < 1) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }
  return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
};

export const formatTimeDifferenceBetweenDates = (startDate, endDate) => {
  const diffInMs = getTimeDifferenceInMs(startDate, endDate);
  return formatTimeDifference(diffInMs);
};

export const getDurationInDays = (startDate, endDate) => {
  return endDate.diff(startDate, `day`, true);
};

export const formatTime = (date) => {
  return date.format(`HH:mm`);
};

export const formatDate = (date) => {
  return date.format(`MMM D`);
};

export const formatDatePointEditing = (date) => {
  return dayjs(date).format(`DD/MM/YYYY HH:mm`);
};
