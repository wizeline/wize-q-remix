const { DEFAULT_MONTHS } = require('app/utils/constants');
const createDateRange = require('app/utils/dates/dateUtils');
const { db } = require('app/utils/db.server');

const getPendingQuestionsForDepartment = async (department, pastMonths = DEFAULT_MONTHS) => {
  try {
    const { initialDate, lastDate } = createDateRange(new Date(), pastMonths);
    const pendingQuestions = await db.questions.findMany({
      where: {
        assigned_to_employee_id: null,
        assigned_department: department.department_id,
        answers: { none: {} },
        createdat: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
        comments: {
          every: {
            approvedby: null,
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
