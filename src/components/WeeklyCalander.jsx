import { getWeekDays } from "\bcommon/date";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const CalanderContainer = styled.div`
  flex: 1;
  margin-bottom: 30px;
`;

const StyledCalander = styled.div`
  display: flex;
  margin: 0 auto;
`;

const StyledDateButton = styled.button`
  background-color: #ededed;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  cursor: pointer;
`;

const StyledArrowButton = styled.button`
  cursor: pointer;
  & > svg {
    font-size: 1.1rem;
    font-weight: 900;
  }
`;

const StyledDateWrap = styled.div`
  text-align: center;
  border-radius: 1rem;
`;

const WeeklyCalander = ({ selectedDate, setSelectedDate, todos }) => {
  // 상태 변수: 선택된 날짜
  const [weekDays, setWeekDays] = useState(getWeekDays(selectedDate));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  //
  useEffect(() => {
    const newWeekDays = getWeekDays(selectedDate);
    todos.forEach((todo) => {
      const dayIndex = todo.date.getDay() === 0 ? 6 : todo.date.getDay() - 1;

      newWeekDays[dayIndex].todosCount++;
    });
    setWeekDays(newWeekDays);
  }, [todos, selectedDate]);
  //

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

  const getMonthAndWeek = () => {
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedWeek = Math.ceil(selectedDate.getDate() / 7);
    return `${selectedMonth}월 ${selectedWeek}주차`;
  };

  return (
    <CalanderContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "0 auto",
          fontWeight: 800,
        }}
      >
        <div> {getMonthAndWeek()}</div>
        <div>
          <StyledArrowButton onClick={handlePrevWeek}>
            <IoIosArrowBack />
          </StyledArrowButton>
          <StyledArrowButton onClick={handleNextWeek}>
            <IoIosArrowForward />
          </StyledArrowButton>
        </div>
      </div>
      <StyledCalander>
        {weekDays.map((dayInfo) => (
          <StyledDateWrap
            onClick={() => {
              handleDateChange(dayInfo.date);
            }}
            style={{ width: "100%" }}
            key={dayInfo.day}
          >
            <p>{dayInfo.day}</p>
            <StyledDateButton
              style={{
                ...(selectedDate.getDay() === dayInfo.date.getDay() && {
                  backgroundColor: "#ffd400",
                }),
              }}
            >
              {dayInfo.todosCount}
            </StyledDateButton>
            {isToday(dayInfo.date) ? (
              <div onClick={() => {}}>{dayInfo.date.getDate()}</div>
            ) : (
              <div
                onClick={() => {
                  handleDateChange(dayInfo.date);
                }}
              >
                {dayInfo.date.getDate()}
              </div>
            )}
          </StyledDateWrap>
        ))}
      </StyledCalander>
    </CalanderContainer>
  );
};

export default WeeklyCalander;
