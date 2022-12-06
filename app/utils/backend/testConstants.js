const buildErrorMessage = (model) => `The response is a valid ${model}, it expects a ValidationError exception`;

module.exports = {
  NPS_ERROR_MESSAGE: buildErrorMessage('NPS'),
  ANSWER_ERROR_MESSAGE: buildErrorMessage('Answer'),
  COMMENT_ERROR_MESSAGE: buildErrorMessage('Comment'),
};
