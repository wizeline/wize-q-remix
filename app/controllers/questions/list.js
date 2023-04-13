/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {
  DEFAULT_LIMIT, DEFAULT_OFFSET, COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD, DEFAULT_MONTHS,
} from 'app/utils/backend/constants';
import { ALL_DEPARTMENTS, NOT_ASSIGNED_DEPARTMENT_ID } from 'app/utils/backend/filterConstants';
import createDateRange from 'app/utils/backend/dateUtils';
import { db } from 'app/utils/db.server';

const getOrderBy = (order) => {
  const orderListBy = {
    oldest: [
      {
        is_pinned: 'desc',
      },
      {
        question_id: 'asc',
      },
    ],
    newest: [
      {
        is_pinned: 'desc',
      },
      {
        question_id: 'desc',
      },
    ],
    most_commented: [
      {
        is_pinned: 'desc',
      },
      {
        Comments: {
          _count: 'desc',
        },
      },
    ],
  };
  return orderListBy[order] || orderListBy.newest;
};

const buildWhereStatus = (status) => {
  let filter = {};

  switch (status) {
    case 'answered':
      filter = {
        Answers: {
          some: {},
        },
      };
      break;
    case 'not_answered':
      filter = {
        Answers: {
          none: {},
        },
      };
      break;
    default:
      break;
  }

  return filter;
};

const buildWhereLocation = (location) => {
  if (!location) return {};

  return {
    location,
  };
};

const buildWhereDepartment = (department) => {
  if (department === undefined || department === ALL_DEPARTMENTS) return {};

  if (department === NOT_ASSIGNED_DEPARTMENT_ID) {
    return {
      assigned_department: null,
    };
  }

  return { assigned_department: department };
};

const buildWhereDateRange = (dateRange) => {
  if (dateRange && dateRange.startDate && dateRange.endDate) {
    return {
      createdAt: {
        lte: new Date(dateRange.endDate),
        gte: new Date(dateRange.startDate),
      },
    };
  }

  return {};
};

const buildWhereSearch = (search) => {
  if (!search) return {};

  return {
    OR: [
      {
        question: {
          contains: search,
        },
      },
      {
        Answers: {
          some: {
            answer_text: {
              contains: search,
            },
          },
        },
      },
    ],
  };
};

const buildWhereLastXMonths = (numMonths, dateRange, search) => {
  if (typeof numMonths === 'number' && (!dateRange && !search)) {
    const { initialDate, lastDate } = createDateRange(new Date(), numMonths);
    return {
      OR: [{
        createdAt: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
      }, {
        is_pinned: true,
      },
      ],
    };
  }
  return {};
};
const buildWhereIsAdminSearch = (isAdmin) => {
  if (isAdmin) {
    return {};
  }

  return { is_enabled: true };
};

const buildWhere = ({
  status, search, location, department, dateRange, isAdmin,
}) => {
  const where = {
    ...buildWhereStatus(status),
    ...buildWhereLocation(location),
    ...buildWhereDepartment(department),
    ...buildWhereDateRange(dateRange),
    ...buildWhereSearch(search),
    ...buildWhereLastXMonths(DEFAULT_MONTHS, dateRange, search),
    ...buildWhereIsAdminSearch(isAdmin),
  };
  return where;
};

const sortQuestions = (sortType, questions) => {
  let _sortQuestions;
  switch (sortType) {
    case 'popular':
      _sortQuestions = questions.sort((a, b) => {
        if (a.numVotes > b.numVotes) return -1;
        if (a.numVotes < b.numVotes) return 1;
        return 0;
      });
      break;
    case 'unpopular':
      _sortQuestions = questions.sort((a, b) => {
        if (a.numVotes > b.numVotes) return 1;
        if (a.numVotes < b.numVotes) return -1;
        return 0;
      });
      break;
    default:
      _sortQuestions = [...questions];
      break;
  }
  return _sortQuestions.sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return 0;
  });
};

const listQuestions = async (params) => {
  const {
    limit, offset, orderBy, status, location, department, dateRange, search, user,
  } = params;

  const fetchedQuestions = await db.Questions.findMany({
    where: buildWhere({
      status,
      location,
      department,
      dateRange,
      search,
      isAdmin: user ? user.is_admin : false,
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
          AnsweredBy: true,
        },
      },
      Comments: {
        include: {
          CommentVote: true,
          Approver: true,
          User: true,
        },
      },
      created_by: true,
      assigned_to: { select: { full_name: true } },
      Department: true,
    },
  });

  const hasUserData = user && user.id;

  let questions = fetchedQuestions.map((question) => {
    const hasAnswer = question.Answers.length > 0;

    let can_edit;

    // eslint-disable-next-line array-callback-return, consistent-return
    const numLikes = question.Votes.filter((vote) => {
      if (vote.is_upvote || vote.is_upvote === null) {
        return { ...vote };
      }
    }).length;

    // eslint-disable-next-line array-callback-return, consistent-return
    const numDisklike = question.Votes.filter((vote) => {
      if (!vote.is_upvote && vote.is_upvote !== null) {
        return { ...vote };
      }
    }).length;

    const hasLike = (hasUserData
    && question.Votes.some(
      (vote) => (vote.is_upvote || vote.is_upvote === null) && vote.user === user.id,
    )
    ) ?? false;

    const hasDislike = (hasUserData
      && question.Votes.some(
        (vote) => (!vote.is_upvote && vote.is_upvote !== null) && vote.user === user.id,
      )
    ) ?? false;

    if (question.created_by) {
      can_edit = user && user.email && user.email === question.created_by.email;
    } else {
      // TODO: Check for anonymous comments
    }
    const hasCommentApproved = question.Comments.some((comment) => comment.approvedBy !== null);
    const CommentsComplete = question.Comments.map((comment) => {
      const value = comment.CommentVote.reduce((prev, current) => prev + current.value, 0);

      return {
        ...comment,
        votes: value,
      };
    });
    const hasCommunityAnswer = CommentsComplete.some((comment) => comment.votes >= COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD);
    delete question.Comments;

    return {
      ...question,
      hasVoted: (hasUserData && question.Votes.some((vote) => vote.user === user.id)) ?? false,
      hasScored: (hasUserData
        && hasAnswer && question.Answers[0].Nps.some((nps) => nps.user === user.id)) ?? false,
      numComments: question._count.Comments,
      numVotes: numLikes - numDisklike,
      can_edit,
      hasCommentApproved,
      hasCommunityAnswer,
      Comments: CommentsComplete,
      numLikes,
      numDisklike,
      hasLike,
      hasDislike,
    };
  });

  questions = sortQuestions(orderBy, questions);
  return questions;
};

export default listQuestions;
