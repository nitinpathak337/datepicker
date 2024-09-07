export const formatWeekMonth = (weekOfMonth: string) => {
  switch (weekOfMonth) {
    case "first":
      return 1;
    case "second":
      return 2;
    case "third":
      return 3;
    case "fourth":
      return 4;
    case "fifth":
      return 5;
  }
};

export const getMultiplierBasedOnUnit = (unit: string) => {
  switch (unit) {
    case "days":
      return 1;
    case "weeks":
      return 7;
    case "months":
      return 30;
    case "years":
      return 365;
    default:
      return 1;
  }
};
