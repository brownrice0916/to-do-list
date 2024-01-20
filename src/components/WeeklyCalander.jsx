import { getWeekDays } from "\bcommon/date";
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

const WeeklyCalander = ({ getSelectedDate, todoList }) => {
  // 상태 변수: 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  console.log("todoList", todoList);

  useEffect(() => {
    getSelectedDate(selectedDate);
  }, [selectedDate]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "0 auto",
          fontWeight: 800,
        }}
      >
        <div> {new Date().getMonth() + 1}월</div>
        <div>
          <StyledArrowButton onClick={handlePrevWeek}>&lt; </StyledArrowButton>
          <StyledArrowButton onClick={handleNextWeek}> &gt;</StyledArrowButton>
        </div>
      </div>
      <StyledCalander>
        {getWeekDays(selectedDate).map((dayInfo) => (
          <StyledDateWrap style={{ width: "100px" }} key={dayInfo.day}>
            <p>{dayInfo.day}</p>
            <StyledDateButton>{}</StyledDateButton>
            {isToday(dayInfo.date) ? (
              <div
                onClick={() => {
                  handleDateChange(dayInfo.date);
                }}
                style={{ color: "red" }}
              >
                {dayInfo.date.getDate()}
              </div>
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
