import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "~/utils/backend/constants";
import { ALL_DEPARTMENTS, NOT_ASSIGNED_DEPARTMENT_ID } from "~/utils/backend/filterConstants";
import { db } from "~/utils/db.server"

const getOrderBy = (order) => {
  const orderListBy = {
    oldest: [
      {
        is_pinned: "desc"
      },
      {
        question_id: "asc"
      }
    ],
    newest: [
      {
        is_pinned: "desc"
      },
      {
        question_id: "desc"
      }
    ],
    popular: [
      {
        is_pinned: "desc"
      },
      {
        Votes: {
          _count: "desc"
        }
      }
    ],
    most_commented: [
      {
        is_pinned: "desc"
      },
      {
        Comments: {
          _count: "desc"
        }
      }
    ],
  };
  return orderListBy[order] || orderListBy.newest;
}

const buildWhereStatus = (status) => {
  let filter = {};

  switch (status) {
    case 'answered':
      filter = {
        Answers: {
          some: {}
        }
      };
    break;
    case 'not_answered':
      filter = {
        Answers: {
          none: {}
        }
      };
    default:
  }

  return filter;
}

const buildWhereLocation = (location) => {
  if (!location) return {};

  return {
    location: location,
  };
}

const buildWhereDepartment = (department) => {
  if (department === undefined || department === ALL_DEPARTMENTS) return {};

  if (department === NOT_ASSIGNED_DEPARTMENT_ID) {
    return {
      assigned_department: null,
    }
  }

  return { assigned_department: department };
}

const buildWhereDateRange = (dateRange) => {
  if (dateRange && dateRange.startDate && dateRange.endDate) {

    return {
      createdAt: {
        lte: new Date(dateRange.endDate),
        gte: new Date(dateRange.startDate),
      }
    }
  }

  return {};
}

const buildWhereSearch = (search) => {
  if (!search) return {};

  return {
    OR: [
      {
        question: {
          contains: search,
        }
      },
      {
        Answers: {
          some: {
            answer_text: {
              contains: search,
            }
        }
        }
      },
    ]
  }
}

const buildWhere = ({ status, search, location, department, dateRange }) => {
  const where = {
    ...buildWhereStatus(status),
    ...buildWhereLocation(location),
    ...buildWhereDepartment(department),
    ...buildWhereDateRange(dateRange),
    ...buildWhereSearch(search),
  };
  return where;
}

export const listQuestions = async (params) => {
  const { limit, offset, orderBy, status, location, department, dateRange, search, user } = params;

  const fetchedQuestions = await db.Questions.findMany({
    where: buildWhere({
      status,
      location,
      department,
      dateRange,
      search
    }),
    take: limit || DEFAULT_LIMIT,
    skip: offset || DEFAULT_OFFSET,
    orderBy: getOrderBy(orderBy),
    include: {
      _count: {
        select: {
          Comments: true,
          Votes: true,
        },
      },
      Votes: true,
      Answers: {
        include: {
          Nps: true,
        }
      },
      created_by: true,
    }
  });

  const hasUserData = user && user.id;

  return fetchedQuestions.map((question) => {
    const hasAnswer = question.Answers.length > 0;

    let can_edit;

    // TODO: Add canUndoNps validation

    if (question.created_by) {
      can_edit = user && user.email && user.email === question.created_by.email
    } else {
      // TODO: Check for anonymous comments
    }

    return {
      ...question,
      hasVoted: (hasUserData && question.Votes.some((vote) => vote.user === user.id)) ?? false,
      hasScored: (hasUserData && hasAnswer && question.Answers[0].Nps.some((nps) => nps.user === user.id)) ?? false,
      num_votes: question._count.Votes,
      numComments: question._count.Comments,
      can_edit: can_edit
    }
  });
}