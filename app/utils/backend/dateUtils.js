export const createDateRange = (startDate, months) => {
    // january = 0 ... december = 11
    const startDateCopy = new Date(startDate);
    const newDate = new Date(startDateCopy.setMonth(startDate.getMonth() + (months)));
    return {
        initialDate: months < 0 ? newDate : startDate,
        lastDate:  months < 0 ? startDate : newDate
    }
};
