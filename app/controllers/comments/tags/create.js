/* eslint-disable camelcase */
import { db } from 'app/utils/db.server';
import { commentTagsCreatedSchema } from 'app/utils/validators/comments';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';

const createTag = async (params) => {
  const { value, error } = commentTagsCreatedSchema.validate(params);
  if (error) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        details: error,
      },
    };
  }
  try {
    const { tag_text } = value;
    const tag = await db.commenttags.create({
      data: {
        tag_text,
      },
    });
    return {
      successMessage: 'The tag was created succesfully.',
      tag,
    };
  } catch (cathError) {
    return {
      error: {
        message: 'Something went wrong creating the tag!',
        details: cathError,
      },
    };
  }
};

export default createTag;
