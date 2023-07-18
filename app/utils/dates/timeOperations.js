import moment from 'moment';
import { scheduledMinutesOffset } from 'app/config/emails.json';
import getFormattedDate from './dateFormat';

export function getTimeDiff(time) {
  return moment(time).fromNow();
}

export function getDateData(time) {
  const diff = moment.duration(moment().diff(time)).years();
  if (diff > 0) {
    return getFormattedDate(time);
  }
  return getTimeDiff(time);
}

export const subtractOriginalDate = (date, hours) => {
  const result = new Date(date);
  result.setHours(result.getHours() - hours);

  // Substract an offset of minutes to not have race conditions with scheduler
  const minutesOffset = scheduledMinutesOffset ?? 5;
  result.setMinutes(result.getMinutes() - minutesOffset);
  return result;
};
