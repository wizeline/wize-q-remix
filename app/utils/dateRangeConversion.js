const dateRangeConversion = (range) => {
  let startDate;
  let endDate;
  switch (range) {
    case 'today':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      return {
        startDate,
        endDate: new Date(),
      };
    case 'this_week':
      const curr = new Date();
      const first = curr.getDate() - curr.getDay();

      startDate = new Date(curr.setDate(first));
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date();

      return {
        startDate,
        endDate,
      };
    case 'this_month':
      const now = new Date();

      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date();

      return {
        startDate,
        endDate,
      };

    default:
      return undefined;
  }
};

export default dateRangeConversion;
