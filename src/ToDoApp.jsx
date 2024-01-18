import React, { useState } from "react";

import "react-calendar/dist/Calendar.css";

const TodoApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    setTodos([...todos, ""]);
  };

  const handleInputChange = (index, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = value;
    setTodos(updatedTodos);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // 선택한 날짜에 따라 투두리스트를 업데이트할 수 있습니다.
  };

  const getWeekDays = (startDate) => {
    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() - startDate.getDay() + i);
      weekDays.push({
        day: weekdays[i],
        date: currentDate,
      });
    }

    return weekDays;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handlePrevWeek = () => {
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setSelectedDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setSelectedDate(newStartDate);
  };

  return (
    <div>
      <div className="week-navigation">
        <button onClick={handlePrevWeek}>&lt; 이전 주</button>
        <button onClick={handleNextWeek}>다음 주 &gt;</button>
      </div>
      <div style={{ display: "flex" }}>
        {getWeekDays(selectedDate).map((dayInfo) => (
          <div style={{ width: "100px" }} key={dayInfo.day}>
            <p>{dayInfo.day}</p>
            {isToday(dayInfo.date) ? (
              <p className="today-marker">
                오늘: {dayInfo.date.getMonth() + 1}/{dayInfo.date.getDate()}
              </p>
            ) : (
              <p>
                {dayInfo.date.getMonth() + 1}/{dayInfo.date.getDate()}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <h1>투두리스트</h1>
        {todos.map((todo, index) => (
          <div key={index}>
            <input
              type="text"
              value={todo}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddTodo}>추가하기</button>
      </div>

      {/* 여기에 투두리스트 컴포넌트를 추가하여 선택한 날짜에 따른 일정을 표시할 수 있습니다. */}
    </div>
  );
};

export default TodoApp;
