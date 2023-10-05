export const parseGermanDate = (date: string): number => {
    // Split the date string into day, month, and year
    const [day, month, year] = date.split(".").map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.getTime() / 1000;
  };
  