export const getWeekDays = (startDate) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() - startDate.getDay() + i + 1);
    weekDays.push({
      day: weekdays[i],
      date: currentDate,
    });
  }

  return weekDays;
};
