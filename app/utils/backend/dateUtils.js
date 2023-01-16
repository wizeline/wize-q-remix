const createDateRange = (startDate, months) => {
  // january = 0 ... december = 11
  const startDateCopy = new Date(startDate);
  const newDate = new Date(startDateCopy.setMonth(startDate.getMonth() + (months)));
  const initialDate = months < 0 ? newDate : startDate;
  const lastDate = months < 0 ? startDate : newDate;
  return {
    initialDate,
    lastDate: new Date(lastDate.setDate(lastDate.getDate() + 1)),
  };
};

export default createDateRange;
