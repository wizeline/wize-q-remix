const { DEFAULT_MONTHS } = require('app/utils/backend/constants');
const createDateRange = require('app/utils/backend/dateUtils');
const { db } = require('app/utils/db.server');

const getPendingQuestionsForDepartment = async (department, pastMonths = DEFAULT_MONTHS) => {
  try {
    const { initialDate, lastDate } = createDateRange(new Date(), pastMonths);
    const pendingQuestions = await db.Questions.findMany({
      where: {
        assigned_to_employee_id: null,
        assigned_department: department.id,
        Answers: { none: {} },
        createdAt: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
        Comments: {
          every: {
            approvedBy: null,
          },
        },
      },
    });

    return { pendingQuestions };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getPendingQuestionsForDepartment,
};
