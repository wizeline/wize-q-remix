import { DEFAULT_ERROR_MESSAGE } from '../../utils/backend/constants';
import { questionCommentedSchema } from '../../utils/backend/validators/comments';
import { db } from '../../utils/db.server';
import { findUser } from '../users/find';

export const questionCommented = async (query) => {
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

      const questions = await db.Questions.findMany({
        where: {
          question_id: {
            in: values,
          },
        },
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
