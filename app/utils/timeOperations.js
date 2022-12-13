import moment from 'moment';
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
