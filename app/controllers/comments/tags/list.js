import { getPagination } from 'app/controllers/users/list';
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
    searchTerm, limit, id, page,
  } = params;
  const { offset } = getPagination(Number(page || 0), Number(limit));
  const count = await db.commenttags.count({ where: buildWhere(searchTerm, parseInt(id, 10)) });
  const totalPages = Math.floor(count / limit) + 1;

  const tags = await db.commenttags.findMany({
    where: buildWhere(searchTerm, parseInt(id, 10)),
    take: parseInt(limit, 10) || DEFAULT_TAGS_LIMIT,
    skip: (offset / limit) > totalPages ? 0 : offset,
  });

  let tagByID;
  if (id) {
    tagByID = await db.commenttags.findUnique({
      where: { tag_id: parseInt(id, 10) },
    });
  }
  return { totalPages, tags: [tagByID, ...tags].filter((tag) => tag !== undefined) };
};

export default listTags;
