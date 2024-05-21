export const isFriday = () => {
  const t = new Date();
  return t.getDay() === 5;
};
export const isSaturday = () => {
  const t = new Date();
  return t.getDay() === 6;
};
