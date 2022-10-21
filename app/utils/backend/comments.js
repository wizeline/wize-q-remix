import moment from 'moment';
import generateSessionIdHash from  '~/utils/backend/crypto';

export function generateMinMaxDates() {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  
    return {
      minDate: moment.utc().subtract(24, 'hours').format(DATE_FORMAT),
      maxDate: moment.utc().format(DATE_FORMAT),
    };
  }
  
export function canEditComment (comment, userEmail, sessionToken){
    const commentNotAnoymous = comment.userEmail;
    if (commentNotAnoymous) {
      const isCommentFromUser = userEmail === comment.userEmail;
      return isCommentFromUser;
    }

    const { minDate, maxDate } = generateMinMaxDates();
    const sessionHash = generateSessionIdHash(sessionToken, comment.id);
    const isValidDateRangeForEdit = moment(comment.createdAt).isBetween(minDate, maxDate);
    const isValidSessionHash = comment.sessionHash === sessionHash;
    return isValidSessionHash && isValidDateRangeForEdit;
}