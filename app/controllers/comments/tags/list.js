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

const buildWhere = (searchTerm) => {
  const where = {
    ...whereSearchTerm(searchTerm),
  };
  return where;
};

const ListTags = async (params) => {
  const { searchTerm, limit, offset } = params;
  const tags = await db.commenttags.findMany({
    where: buildWhere(searchTerm),
    take: limit || DEFAULT_TAGS_LIMIT,
    skip: offset || 0,
  });

  return { tags };
};

export default ListTags;
