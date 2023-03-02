/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { profileQuestionsCreatedSchema } from 'app/utils/backend/validators/profile';
import { db } from 'app/utils/db.server';

const getQuestionsCreated = async (query) => {
  const { error, value } = profileQuestionsCreatedSchema.validate(query);
  const { employee_id } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  try {
    const validUser = await db.users.findUniqueOrThrow({
      where: {
        employee_id,
      },
    });

    const fetchQuestions = await db.Questions.findMany({
      where: {
        created_by_employee_id: validUser.employee_id,
      },
      include: {
        _count: {
          select: {
            Comments: true,
            Votes: true,
          },
        },
        Votes: true,
        Department: true,
      },
    });

    const questions = fetchQuestions.map((question) => {
    // eslint-disable-next-line array-callback-return, consistent-return
      const numLikes = question.Votes.filter((vote) => {
        if (vote.is_upvote || vote.is_upvote === null) {
          return { ...vote };
        }
      }).length;

      // eslint-disable-next-line array-callback-return, consistent-return
      const numDisklike = question.Votes.filter((vote) => {
        if (!vote.is_upvote && vote.is_upvote !== null) {
          return { ...vote };
        }
      }).length;

      return { ...question, numLikes, numDisklike };
    });

    return questions;
  } catch (_error) {
    console.log(_error);
    return {
      error: { message: 'The user was not found', detail: 'ID not found' },
    };
  }
};

export default getQuestionsCreated;
