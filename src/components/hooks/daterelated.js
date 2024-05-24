export const isFriday = (date) => {
  const t = new Date(date);
  return t.getDay() === 5;
};
export const isSaturday = (date) => {
  const t = new Date(date);
  return t.getDay() === 6;
};
