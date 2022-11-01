module.exports = {
  // Database string limit constant. It should hold about one page worth of text.
  MINIMUM_ANSWER_LENGTH: 1,
  MAXIMUM_ANSWER_LENGTH: 3000,
  MINIMUM_COMMENT_LENGTH: 2,
  MAXIMUM_COMMENT_LENGTH: 3000,
  MINIMUM_QUESTION_LENGTH: 14,
  MAXIMUM_QUESTION_LENGTH: 500,
  DATE_FORMAT: 'MM-DD-YYYY',
  DATE_TIME_FORMAT: 'YYYY-MM-DDTHH:mm:ssZ',
  BASE_NUMBER: 10,
  NOTIFICATION_MINUTE_INTERVAL: 3,
  MAXIMUM_QUESTION_EXPORT_CSV_DAYS_RANGE: 90,
  MAXIMUM_QUESTION_EXPORT_CSV_MONTHS_RANGE: 3,
  DEFAULT_LIMIT: 20,
  DEFAULT_OFFSET: 0,
  MIN_NET_PROMOTER_SCORE: 1,
  MAX_NET_PROMOTER_SCORE: 4,
  DEFAULT_ERROR_MESSAGE: "An unknown error has occurred with your request.",
  COMMENT_AS_AN_ANSWER: "This question already has a comment as answer"
};
