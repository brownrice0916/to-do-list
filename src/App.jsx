import TodoList from "components/ToDoList";
import WeeklyCalander from "components/WeeklyCalander";
import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";

const LayoutContainer = styled.div`
  display: flex;
  padding: 40px;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
  // 다른 스타일 속성 추가
`;

const LeftSection = styled.div`
  margin-right: 30px;
  flex: 1;
`;

const RightSection = styled.div`
  flex: 3;
`;

const StyledProfileImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: #000;
  border-radius: 100px;
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const getSelectedDate = (date) => {
    setSelectedDate(date);
  };
  const getTodoList = (todos) => {
    setTodoList(todos);
  };

  return (
    <LayoutContainer className="layout">
      <LeftSection>
        <p>프사</p>
        <StyledProfileImg></StyledProfileImg>
        <p>상태메세지</p>
        <p>아잉뿌잉뀨</p>
        <input type="text" placeholder="상태메세지를 입력하세요" />
      </LeftSection>

      <RightSection>
        <div>
          <WeeklyCalander
            todoList={todoList}
            getSelectedDate={getSelectedDate}
          ></WeeklyCalander>
        </div>

        <TodoList
          getTodoList={getTodoList}
          selectedDate={selectedDate}
        ></TodoList>
      </RightSection>
    </LayoutContainer>
  );
}

export default App;
