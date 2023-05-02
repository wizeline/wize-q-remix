/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
import { db } from 'app/utils/db.server';
import { getPagination } from 'app/controllers/users/list';

const buildWhere = (value) => {
  if (!value) return {};
  return {
    name: {
      contains: value,
    },
  };
};

const calLimit = (allPages, count, limit) => {
  if (allPages) return count;
  return limit;
};

const calOffset = (allPages, offset, limit, totalPages) => {
  if (allPages) return 0;
  if ((offset / limit) > totalPages) return 0;

  return offset;
};

const listDepartments = async (params) => {
  let page, size, search, allPages;

  if (params === undefined) {
    page = 0;
    size = 0;
    search = '';
    allPages = true;
  } else {
    page = params.page;
    size = params.size;
    search = params.search;
    allPages = params.allPages;
  }
  const { limit, offset } = getPagination(Number(page), Number(size));

  const count = await db.Departments.count({
    where: {},
  });
  const totalPages = Math.floor(count / limit) + 1;

  const departments = await db.Departments.findMany({
    where: buildWhere(search),
    take: calLimit(allPages, count, limit),
    skip: calOffset(allPages, offset, limit, totalPages),
    include: { ManagerDepartmet: true, AlternateManager: true },
  });
  return { departments, totalPages };
};

export default listDepartments;
