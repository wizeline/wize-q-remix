import publishQuestion from 'app/controllers/questions/publishQuestion';
import randomAccessToken from 'tests/utils';
import createQuestion from 'app/controllers/questions/create';
import slack from 'app/utils/backend/slackNotifications';

import {
  PIN_QUESTION_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from 'app/utils/constants';

describe('question controller: publish question', () => {
  const slackSpy = jest.spyOn(slack, 'createQuestionNotification').mockImplementation();

  afterEach(() => {
    slackSpy.mockClear();
  });

  it('return an error when provied no parameters', async () => {
    const response = await publishQuestion();

    expect(response.error).toBeDefined();
    expect(response.error.message).toBeDefined();
    expect(response.error.detail).toBeDefined();
    expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
    expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
    expect(response.successMessage).toBeUndefined();
    expect(response.question).toBeUndefined();
  });

  it('return an error when provide wrong paramaters', async () => {
    const response = await publishQuestion('1');

    expect(response.error).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBeDefined();
    expect(response.error.detail).toBeDefined();
    expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
    expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
    expect(response.successMessage).toBeUndefined();
    expect(response.question).toBeUndefined();
  });

  it('return an error when questionId is less that 1', async () => {
    const response = await publishQuestion(-1);

    expect(response.error).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBeDefined();
    expect(response.error.detail).toBeDefined();
    expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
    expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
    expect(response.successMessage).toBeUndefined();
    expect(response.question).toBeUndefined();
  });

  it('makes question public with valid parameters', async () => {
    // create a anonymous questions
    const anonymousQuestion = {
      question: 'This is an example of anonymous question',
      created_by_employee_id: 1,
      accessToken: randomAccessToken(),
      is_anonymous: true,
      assigned_to_employee_id: 3,
      assigned_department: 3,
      location: 'BNK',
    };
    const createQuestionResponse = await createQuestion(anonymousQuestion);
    expect(createQuestionResponse).toBeDefined();
    expect(createQuestion.errors).toBeUndefined();
    expect(createQuestionResponse.question).toBeDefined();
    expect(createQuestionResponse.question.question_id).toBeDefined();
    expect(createQuestionResponse.question.is_public).toBeDefined();

    // eslint-disable-next-line max-len
    const publishQuestionResponse = await publishQuestion(createQuestionResponse.question.question_id);
    expect(publishQuestionResponse).toBeDefined();
    expect(publishQuestionResponse.successMessage).toBeDefined();
    expect(publishQuestionResponse.error).toBeUndefined();
    expect(publishQuestionResponse.successMessage).toBe('The question has been published');
    expect(publishQuestionResponse.question.is_public).toBe(true);

    // Send slack notification
    expect(slackSpy).toHaveBeenCalledTimes(1);
  });
});
