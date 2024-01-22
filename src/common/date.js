export const getWeekDays = (selectedDate) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const weekDays = [];

  const newSelectedDate = new Date(selectedDate.toDateString());

  let currentDay = newSelectedDate.getDay();

  // 일요일이면 7로 변경
  if (newSelectedDate.getDay() === 0) currentDay = 7;

  const startDate = newSelectedDate.getDate() - currentDay + 1;

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(newSelectedDate);

    currentDate.setDate(startDate + i);

    weekDays.push({
      day: weekdays[i],
      date: currentDate,
      todosCount: 0,
    });
  }

  return weekDays;
};
