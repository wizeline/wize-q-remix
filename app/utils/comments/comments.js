import moment from 'moment';
import generateSessionIdHash from '../crypto';

export function generateMinMaxDates() {
  const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

  return {
    minDate: moment.utc().subtract(24, 'hours').format(DATE_FORMAT),
    maxDate: moment.utc().format(DATE_FORMAT),
  };
}

export function canEditComment(comment, userEmail, sessionToken) {
  const commentNotAnoymous = comment.useremail;
  if (commentNotAnoymous) {
    const isCommentFromUser = userEmail === comment.useremail;
    return isCommentFromUser;
  }

  const { minDate, maxDate } = generateMinMaxDates();
  const sessionhash = generateSessionIdHash(sessionToken, comment.id);
  const isValidDateRangeForEdit = moment(comment.createdAt).isBetween(minDate, maxDate);
  const isValidSessionHash = comment.sessionhash === sessionhash;
  return isValidSessionHash && isValidDateRangeForEdit;
}
