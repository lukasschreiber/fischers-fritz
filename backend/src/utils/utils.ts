export const parseGermanDate = (date: string): number => {
    // Split the date string into day, month, and year
    const [day, month, year] = date.split(".").map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.getTime() / 1000;
};

export const parseLongGermanDate = (date: string): number => {
  const germanMonths = {
      'Januar': 0,
      'Jan.': 0,
      'Februar': 1,
      'Feb.': 1,
      'März': 2,
      'April': 3,
      'Apr.': 3,
      'Mai': 4,
      'Juni': 5,
      'Juli': 6,
      'August': 7,
      'Aug.': 7,
      'September': 8,
      'Sep.': 8,
      'Oktober': 9,
      'Okt.': 9,
      'November': 10,
      'Nov.': 10,
      'Dezember': 11,
      'Dez.': 11
  };

  const dateComponents = date.split(' ');
  const day = parseInt(dateComponents[0], 10);
  const month = germanMonths[dateComponents[1] as keyof typeof germanMonths];
  const year = parseInt(dateComponents[2], 10);
  const dateObject = new Date(year, month, day);
  return dateObject.getTime() / 1000;
};