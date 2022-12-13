/* eslint-disable camelcase */
import generateSessionIdHash from 'app/utils/backend/crypto';
import isEmptyObject from 'app/utils/backend/objectUtils';
import { createNPSSchema } from 'app/utils/backend/validators/nps';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { db } from 'app/utils/db.server';

const createNPS = async (params) => {
  const { error, value } = createNPSSchema.validate(params);

  if (error) {
    return {
      errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }],
    };
  }

  try {
    const { score, answer_id, user } = value;

    const npmCreated = await db.Nps.create({
      data: {
        answer_id,
        user: user.id,
        score,
        session_hash: generateSessionIdHash(user.id, answer_id),
      },
    });

    if (isEmptyObject(npmCreated)) {
      return {
        errors: [
          {
            message: 'something went wrong at created the netscore',
            detail: 'something went wrong at created the netscore',
          },
        ],
      };
    }

    return {
      npmCreated,
    };
  } catch (errorCatch) {
    return {
      errors: [
        {
          message: 'Something went wrong at created the netscore',
          detail: errorCatch,
        },
      ],
    };
  }
};

export default createNPS;
