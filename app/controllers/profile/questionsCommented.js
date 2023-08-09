import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import { questionCommentedSchema } from 'app/utils/validators/comments';
import { db } from 'app/utils/db.server';
import { findUser } from 'app/controllers/users/find';

const questionCommented = async (query) => {
  const { error, value } = questionCommentedSchema.validate(query);
  const { useremail } = value;

  if (error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const validEmail = await findUser(useremail);

    if (validEmail) {
      const ids = await db.comments.findMany({
        where: {
          useremail,
        },
        select: {
          questionid: true,
        },
      });

      const values = ids.map(({ questionid }) => questionid);

      const questions = await db.questions.findMany({
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
        message: `The user: ${useremail} was not found`,
        detail: `The user: ${useremail} was not found`,
      },
    };
  } catch (_error) {
    return {
      error: {
        message: `The user: ${useremail} was not found`,
        detail: `The user: ${useremail} was not found`,
      },
    };
  }
};

export default questionCommented;
