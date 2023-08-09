import { db } from 'app/utils/db.server';
import listQuestions from 'app/controllers/questions/list';
import { DEFAULT_LIMIT } from 'app/utils/constants';
import { NOT_ASSIGNED_DEPARTMENT_ID } from 'app/utils/filterConstants';

describe('listQuestions', () => {
  const dbListSpy = jest.spyOn(db.questions, 'findMany');

  describe('on basic list call', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({});
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('includes num_votes', () => {
      response.forEach((question) => {
        expect(question.num_votes).toBeDefined();
      });
    });

    it('includes numComments', () => {
      response.forEach((question) => {
        expect(question.numComments).toBeDefined();
      });
    });

    it(`returns results with length equal or less than ${DEFAULT_LIMIT}`, () => {
      expect(response.length).toBeLessThanOrEqual(DEFAULT_LIMIT);
    });
  });

  describe('on list call with limit of 5', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        limit: 5,
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results with length equal or less than 5', () => {
      expect(response.length).toEqual(5);
    });
  });

  describe('on list call with offset of 5', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        offset: 5,
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results with an offset of 5', () => {
      expect(response[0].question_id).toEqual(6);
      expect(response[2].question_id).toEqual(3);
    });
  });

  describe('on list call with sort of most commented', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        orderBy: 'most_commented',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results sorted by most commented', () => {
      expect(response[0].numComments).toBeDefined();
      expect(response[0].numComments)
        .toBeGreaterThanOrEqual(response[response.length - 1].numComments);
    });

    it('top results are pinned', () => {
      expect(response[0].is_pinned).toEqual(true);
    });
  });

  describe('on list call with sort of oldest', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        orderBy: 'oldest',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results sorted by oldest', () => {
      const secondToLastQuestion = response[response.length - 2];
      const lastQuestion = response[response.length - 1];
      expect(lastQuestion.question_id).toBeGreaterThanOrEqual(secondToLastQuestion.question_id);
    });

    it('top results are pinned', () => {
      expect(response[0].is_pinned).toEqual(true);
    });
  });

  describe('on list call with sort of newest', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        orderBy: 'newest',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results sorted by newest', () => {
      const secondToLastQuestion = response[response.length - 2];
      const lastQuestion = response[response.length - 1];
      expect(secondToLastQuestion.question_id).toBeGreaterThanOrEqual(lastQuestion.question_id);
    });

    it('top results are pinned', () => {
      expect(response[0].is_pinned).toEqual(true);
    });
  });

  describe('on list call with sort of popularity', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        orderBy: 'popular',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns results sorted by popular', () => {
      const secondQuestion = response[response.length - 2];
      const lastQuestion = response[response.length - 1];
      expect(secondQuestion.numVotes).toBeGreaterThanOrEqual(lastQuestion.numVotes);
    });

    it('top results are pinned', () => {
      expect(response[0].is_pinned).toEqual(true);
    });
  });

  describe('on list call with answers', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        status: 'answered',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions that have been answered', () => {
      expect(response.length).toEqual(2);
    });
  });

  describe('on list call with no answers', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        status: 'not_answered',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions that have not been answered', () => {
      expect(response.length).toEqual(6);
    });
  });

  describe('on list call with filter for GDL location', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        location: 'GDL',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions with location set to GDL', () => {
      expect(response.length).toEqual(6);

      response.forEach((question) => {
        expect(question.location).toEqual('GDL');
      });
    });
  });

  describe('on list call with filter for not assigned deparment', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        department: NOT_ASSIGNED_DEPARTMENT_ID,
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions with no deparment set', () => {
      expect(response.length).toEqual(6);

      response.forEach((question) => {
        expect(question.assigned_department).toEqual(NOT_ASSIGNED_DEPARTMENT_ID);
      });
    });
  });

  describe('on list call with a specific filter assigned deparment', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        department: 14,
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions assigned to Delivery deparment', () => {
      expect(response.length).toEqual(1);

      response.forEach((question) => {
        expect(question.assigned_department).toEqual(14);
      });
    });
  });

  describe('on list call with a specific date', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        dateRange: {
          startDate: '2022-02-15T00:00:00.000Z',
          endDate: '2022-02-16T24:00:00.000Z',
        },
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions created in 2022-02-15', () => {
      expect(response.length).toEqual(1);
    });
  });

  describe('on list call with a specific date range', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        dateRange: {
          startDate: '2021-03-24T00:00:00.000Z',
          endDate: '2021-03-28T00:00:00.000Z',
        },
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns questions created between 2021-03-24 and 2021-03-25', () => {
      expect(response.length).toEqual(2);
    });
  });

  describe('on list call with a question text search', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        search: 'I enroll',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns question with text \'I enroll\'', () => {
      expect(response.length).toEqual(1);
      expect(response[0].question).toContain('I enroll');
    });
  });

  describe('on list call with a answer text search', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        search: 'There are many variations',
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('returns question that has answer with text \'There are many variations\'', () => {
      expect(response.length).toEqual(1);
      expect(response[0].question_id).toEqual(3);
    });
  });

  describe('on list call with provided user', () => {
    let response;

    beforeAll(async () => {
      response = await listQuestions({
        user: {
          id: 'google-oauth2|111766391199351256706',
          email: 'patrick.shu@wizeline.com',
        },
      });
    });

    it('calls database', () => {
      expect(dbListSpy).toHaveBeenCalled();
    });

    it('returns results defined', () => {
      expect(response).toBeDefined();
    });

    it('shows hasVotes atrribute as true on questions that provided user has voted', () => {
      expect(response.some((question) => question.hasVoted === true)).toBeTruthy();
    });

    it('shows hasScored atrribute as true on questions that provided user has scored', () => {
      expect(response.some((question) => question.hasScored === true)).toBeTruthy();
    });

    it('shows can_edit atrribute as true on questions that provided user has voted', () => {
      expect(response.some((question) => question.can_edit === true)).toBeTruthy();
    });
  });
});
