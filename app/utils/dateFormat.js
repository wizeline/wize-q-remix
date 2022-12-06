import moment from 'moment';

function getFormattedDate(date) {
  return moment(date).format('DD/MMM/YYYY');
}

export default getFormattedDate;
