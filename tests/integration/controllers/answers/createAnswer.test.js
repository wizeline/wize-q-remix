import createAnswer from 'app/controllers/answers/create';
import * as upsertQuestionEmbedding from 'app/controllers/embeddings/create';
import { db } from 'app/utils/db.server';
import slack from 'app/utils/slack/slackNotifications';

describe('createAnswer', () => {
  const dbCreateSpy = jest.spyOn(db.answers, 'create');
  const slackSpy = jest.spyOn(slack, 'createAnswerNotification').mockImplementation();
  const embeddingsUpsertSpy = jest.spyOn(upsertQuestionEmbedding, 'default').mockImplementation();
  const findUniqueSpy = jest.spyOn(db.questions, 'findUnique');

  afterEach(() => {
    embeddingsUpsertSpy.mockClear();
    slackSpy.mockClear();
    findUniqueSpy.mockClear();
  });

  it('creates valid answer', async () => {
    const answer = {
      answer_text: '_This_ is a **sample** ~~answer~~',
      answered_by_employee_id: 2,
      answered_question_id: 1,
    };

    const response = await createAnswer(
      answer,
      {
        allowEmbedding: true,
        sendSlackOnAnswerCreation: true,
      },
    );

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.answer).toBeDefined();

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(slackSpy).toHaveBeenCalled();
    expect(embeddingsUpsertSpy).toHaveBeenCalled();
  });

  it('does not send slack if flag is not active', async () => {
    const answer = {
      answer_text: '_This_ is a **sample** ~~answer~~',
      answered_by_employee_id: 2,
      answered_question_id: 1,
    };

    await createAnswer(
      answer,
      {
        allowEmbedding: true,
        sendSlackOnAnswerCreation: false,
      },
    );

    expect(slackSpy).not.toHaveBeenCalled();
  });

  it('does not send slack if question is not public', async () => {
    findUniqueSpy.mockResolvedValue({
      question_id: 123,
      question: 'Example question',
      is_public: false,
    });

    const answer = {
      answer_text: '_This_ is a **sample** ~~answer~~',
      answered_by_employee_id: 2,
      answered_question_id: 1,
    };

    await createAnswer(
      answer,
      {
        allowEmbedding: false,
        sendSlackOnAnswerCreation: false,
      },
    );

    expect(slackSpy).not.toHaveBeenCalled();
  });

  it('does not request embedding if flag not provided', async () => {
    const answer = {
      answer_text: '_This_ is a **sample** ~~answer~~',
      answered_by_employee_id: 2,
      answered_question_id: 1,
    };

    const response = await createAnswer(answer, {
      allowEmbedding: false,
      sendSlackOnAnswerCreation: true,
    });

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.answer).toBeDefined();

    expect(embeddingsUpsertSpy).toHaveBeenCalledTimes(0);
  });
});
