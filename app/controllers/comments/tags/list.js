import { DEFAULT_TAGS_LIMIT } from 'app/utils/constants';
import { db } from 'app/utils/db.server';

const whereSearchTerm = (searchTerm) => {
  if (!searchTerm) { return {}; }

  return {
    tag_text: {
      contains: searchTerm,
    },
  };
};

const whereNotID = (id) => {
  if (!id) { return {}; }

  return {
    NOT: [{
      tag_id: id,
    }],
  };
};

const buildWhere = (searchTerm, id) => {
  const where = {
    ...whereSearchTerm(searchTerm),
    ...whereNotID(id),
  };
  return where;
};

const listTags = async (params) => {
  const {
    searchTerm, limit, offset, id,
  } = params;
  const tags = await db.commenttags.findMany({
    where: buildWhere(searchTerm, parseInt(id, 10)),
    take: limit || DEFAULT_TAGS_LIMIT,
    skip: offset || 0,
  });

  let tagByID;
  if (id) {
    tagByID = await db.commenttags.findUnique({
      where: { tag_id: parseInt(id, 10) },
    });
  }
  return { tags: [tagByID, ...tags].filter((tag) => tag !== undefined) };
};

export default listTags;
