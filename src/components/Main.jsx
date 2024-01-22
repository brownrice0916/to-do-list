import TodoListContainer from "components/ToDoListContainer";
import WeeklyCalander from "components/WeeklyCalander";
import React, { useState } from "react";
import styled from "styled-components";
import CircularIndeterminate from "./CircularIndeterminate";

const StyledMainContainer = styled.div`
  flex: 3;
  display: ${(props) => (props.loading ? "none" : "block")};
`;
const StyledSpinner = styled.div`
  display: ${(props) => (props.loading ? "flex" : "none")};
  margin: 0 auto;
`;
const Main = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <StyledMainContainer loading={loading}>
        <WeeklyCalander
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          todos={todos}
        ></WeeklyCalander>
        <TodoListContainer
          selectedDate={selectedDate}
          setTodos={setTodos}
          todos={todos}
          setLoading={setLoading}
        ></TodoListContainer>
      </StyledMainContainer>
      <StyledSpinner loading={loading}>
        <CircularIndeterminate />
      </StyledSpinner>
    </>
  );
};

export default Main;
