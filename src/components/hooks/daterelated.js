export const isFriday = () => {
  const t = new Date();
  return t.getDay() === 5;
};
