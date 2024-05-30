export const isFriday = (date) => {
  const t = new Date(date);
  return t.getDay() === 5;
};
export const isSaturday = (date) => {
  const t = new Date(date);
  return t.getDay() === 6;
};
export const calculateHours = (startTimeStr, endTimeStr) => {
  const isValidTimeFormat = (timeStr) => {
    const timeParts = timeStr.split(":");
    if (timeParts.length !== 2) return false;
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    return (
      !isNaN(hours) &&
      !isNaN(minutes) &&
      hours >= 0 &&
      hours < 24 &&
      minutes >= 0 &&
      minutes < 60
    );
  };
  if (!isValidTimeFormat(startTimeStr) || !isValidTimeFormat(endTimeStr)) {
    throw new Error("Invalid time format");
  }
  const startTimeParts = startTimeStr.split(":");
  const startHours = parseInt(startTimeParts[0], 10);
  const startMinutes = parseInt(startTimeParts[1], 10);
  const endTimeParts = endTimeStr.split(":");
  const endHours = parseInt(endTimeParts[0], 10);
  const endMinutes = parseInt(endTimeParts[1], 10);
  const startTime = new Date();
  startTime.setHours(startHours, startMinutes, 0, 0);
  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0, 0);
  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }
  const timeDifference = endTime.getTime() - startTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference;
};
