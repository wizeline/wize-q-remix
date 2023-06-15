/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
import { db } from 'app/utils/db.server';
import { getPagination } from 'app/controllers/users/list';

const buildWhereSearch = (value) => {
  if (!value) return {};
  return {
    name: {
      contains: value,
    },
  };
};

const buildWhereActive = (isActive) => {
  if (isActive === undefined) return {};
  return {
    is_active: isActive,
  };
};

const buildWhere = (value, isActive) => {
  const where = {
    ...buildWhereSearch(value),
    ...buildWhereActive(isActive),
  };

  return where;
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
  let page, size, search, active, allPages;

  if (params === undefined) {
    page = 0;
    size = 0;
    search = '';
    allPages = true;
    active = true;
  } else {
    page = params.page;
    size = params.size;
    search = params.search;
    active = params.active;
    allPages = params.allPages;
  }
  const { limit, offset } = getPagination(Number(page), Number(size));

  const count = await db.Departments.count({
    where: {},
  });
  const totalPages = Math.floor(count / limit) + 1;

  const departments = await db.Departments.findMany({
    where: buildWhere(search, active),
    take: calLimit(allPages, count, limit),
    skip: calOffset(allPages, offset, limit, totalPages),
    include: { ManagerDepartmet: true, AlternateManager: true },
  });
  return { departments, totalPages };
};

export default listDepartments;
