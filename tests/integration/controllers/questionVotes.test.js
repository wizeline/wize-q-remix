import voteQuestion from 'app/controllers/questionVotes/voteQuestion';
import getQuestionById from 'app/controllers/questions/getQuestionById';
import createQuestion from 'app/controllers/questions/create';
import randomAccessToken from 'tests/utils';

import { db } from 'app/utils/db.server';

describe('question votes controller', () => {
  describe('vote question', () => {
    const dbFindUniqueQuestionOrThrowSpy = jest.spyOn(db.Questions, 'findUniqueOrThrow');
    const dbCreateVoteSpy = jest.spyOn(db.Votes, 'create');
    const dbDeleteVoteSpy = jest.spyOn(db.Votes, 'delete');

    it('returns an error when provided invalid id', async () => {
      const response = await voteQuestion('test', { id: 'google-oauth2|108653070533260305238' });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe('The provided parameters for the operation are not valid');
      expect(response.error.detail).toBe('The question id must be an integer not minor to 1');
      expect(dbFindUniqueQuestionOrThrowSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when the question id is not found', async () => {
      const response = await voteQuestion(404, { id: 'google-oauth2|108653070533260305238' });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe('The question with the id provided could not be found');
      expect(response.error.detail).toBe('The question with the id provided could not be found');
      expect(dbFindUniqueQuestionOrThrowSpy).toHaveBeenCalledTimes(1);
    });

    it('creates new vote for question', async () => {
      const voteResponse = await voteQuestion(3, { id: 'google-oauth2|108653070533267290373' });
      expect(voteResponse.response).toBeDefined();
      expect(voteResponse.response.upVoteCount).toBe(4);
      const getQuestionResponse = await getQuestionById(3, { id: 'google-oauth2|108653070533267290373' });
      expect(getQuestionResponse.question).toBeDefined();
      expect(getQuestionResponse.question.hasVoted).toBe(true);
      expect(getQuestionResponse.question.num_votes).toBe(4);
      expect(dbCreateVoteSpy).toHaveBeenCalledTimes(1);
    });

    it('deletes the previous vote record if exists for the user', async () => {
      const question = {
        question: 'Test question for voting',
        created_by_employee_id: 2,
        accessToken: randomAccessToken(),
        is_anonymous: false,
        assigned_department: 3,
        location: 'BNK',
      };

      const createQuestionResponse = await createQuestion(question);

      expect(createQuestionResponse).toBeDefined();
      expect(createQuestionResponse.errors).toBeUndefined();
      expect(createQuestionResponse.successMessage).toBeDefined();
      expect(createQuestionResponse.question).toBeDefined();

      const testQuestionId = createQuestionResponse.question.question_id;

      const firstUser = { id: 'google-oauth2|108653070533260301111' };
      const secondUser = { id: 'google-oauth2|108653070533260302222' };
      const thirdUser = { id: 'google-oauth2|108653070533260303333' };

      let voteResponse = await voteQuestion(testQuestionId, firstUser);
      expect(voteResponse.response).toBeDefined();
      expect(voteResponse.response.upVoteCount).toBe(1);

      voteResponse = await voteQuestion(testQuestionId, secondUser);
      expect(voteResponse.response).toBeDefined();
      expect(voteResponse.response.upVoteCount).toBe(2);

      voteResponse = await voteQuestion(testQuestionId, thirdUser);
      expect(voteResponse.response).toBeDefined();
      expect(voteResponse.response.upVoteCount).toBe(3);

      let getQuestionResponse = await getQuestionById(testQuestionId, secondUser);
      expect(getQuestionResponse.question).toBeDefined();
      expect(getQuestionResponse.question.hasVoted).toBe(true);
      expect(getQuestionResponse.question.num_votes).toBe(3);

      voteResponse = await voteQuestion(testQuestionId, secondUser);
      expect(voteResponse.response).toBeDefined();
      expect(voteResponse.response.voteSuccessfullyDeleted).toBe(true);
      expect(voteResponse.response.upVoteCount).toBe(2);
      expect(dbDeleteVoteSpy).toHaveBeenCalledTimes(1);

      getQuestionResponse = await getQuestionById(testQuestionId, secondUser);
      expect(getQuestionResponse.question).toBeDefined();
      expect(getQuestionResponse.question.hasVoted).toBe(false);
      expect(getQuestionResponse.question.num_votes).toBe(2);
    });
  });
});
