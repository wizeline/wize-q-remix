import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { questionCommentedSchema } from 'app/utils/backend/validators/comments';
import { db } from 'app/utils/db.server';
import { findUser } from 'app/controllers/users/find';

const questionCommented = async (query) => {
  const { error, value } = questionCommentedSchema.validate(query);
  const { userEmail } = value;

  if (error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const validEmail = await findUser(userEmail);

    if (validEmail) {
      const ids = await db.Comments.findMany({
        where: {
          userEmail,
        },
        select: {
          questionId: true,
        },
      });

      const values = ids.map(({ questionId }) => questionId);

      const fetchQuestions = await db.Questions.findMany({
        where: {
          question_id: {
            in: values,
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

      return {
        questions,
      };
    }
    return {
      error: {
        message: `The user: ${userEmail} was not found`,
        detail: `The user: ${userEmail} was not found`,
      },
    };
  } catch (_error) {
    return {
      error: {
        message: `The user: ${userEmail} was not found`,
        detail: `The user: ${userEmail} was not found`,
      },
    };
  }
};

export default questionCommented;
