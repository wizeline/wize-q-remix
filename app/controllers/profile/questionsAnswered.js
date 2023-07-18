import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import { profileQuestionsAnsweredSchema } from 'app/utils/validators/profile';
import { db } from 'app/utils/db.server';

const questionsAnswered = async (query) => {
  const { error, value } = profileQuestionsAnsweredSchema.validate(query);
  const { employee_id: employeeId } = value;

  if (error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const userFound = await db.users.findUnique({
      where: {
        employee_id: employeeId,
      },
    });

    if (!userFound) {
      return {
        error: {
          message: 'The provided user was not found',
          detail: `The user with id: ${employeeId} was not found`,
        },
      };
    }

    const fetchQuestions = await db.Questions.findMany({
      where: {
        Answers: {
          some: {
            answered_by_employee_id: employeeId,
          },
        },
      },
      include: {
        _count: {
          select: {
            Comments: true,
            Votes: true,
          },
        },
        Votes: true,
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

    return { questions };
  } catch (_error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: _error }] };
  }
};

export default questionsAnswered;
