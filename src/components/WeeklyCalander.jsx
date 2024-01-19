import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
`;

const StyledDateWrap = styled.div`
  text-align: center;
`;

const WeeklyCalander = ({ getSelectedDate }) => {
  // 상태 변수: 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    sendSelectedDate(selectedDate);
  }, [selectedDate]);

  const getWeekDays = (startDate) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
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

  const sendSelectedDate = () => {
    getSelectedDate(selectedDate);
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
    <CalanderContainer>
      <StyledArrowButton onClick={handlePrevWeek}>&lt; </StyledArrowButton>
      <StyledArrowButton onClick={handleNextWeek}> &gt;</StyledArrowButton>
      <StyledCalander>
        {new Date().getMonth() + 1}

        {getWeekDays(selectedDate).map((dayInfo) => (
          <StyledDateWrap style={{ width: "100px" }} key={dayInfo.day}>
            <p>{dayInfo.day}</p>
            {isToday(dayInfo.date) ? (
              <StyledDateButton
                onClick={() => {
                  handleDateChange(dayInfo.date);
                }}
                style={{ color: "red" }}
              >
                {dayInfo.date.getDate()}
              </StyledDateButton>
            ) : (
              <StyledDateButton
                onClick={() => {
                  handleDateChange(dayInfo.date);
                }}
              >
                {dayInfo.date.getDate()}
              </StyledDateButton>
            )}
          </StyledDateWrap>
        ))}
      </StyledCalander>
    </CalanderContainer>
  );
};

export default WeeklyCalander;
