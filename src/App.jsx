import TodoList from "components/ToDoList";
import WeeklyCalander from "components/WeeklyCalander";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import useSaveStateMsg from "hooks/useSaveStateMsg";
import { IoCheckbox } from "react-icons/io5";
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
  background-color: #ededed;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 30px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const imgUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(
  Math.random() * 100
)}`;
function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [stateMsg, setStateMsg] = useState({ value: "", isDone: false });
  const { data, loading, addData, updateData } = useSaveStateMsg("stateMsg");

  useEffect(() => {
    if (!loading) {
      setStateMsg(data);
    }
  }, [data, loading]);

  const handleInputChange = (e) => {
    setStateMsg({ ...stateMsg, value: e.target.value });
  };

  const onSaveStateMsg = () => {
    if (loading) return; // 예외 처리: 데이터 로딩 중에는 저장 불가능

    if (data) {
      // 이미 데이터가 있는 경우 업데이트
      updateData({ ...data, ...stateMsg });
    } else {
      // 데이터가 없는 경우 추가
      addData({ ...stateMsg, isDone: true });
    }
  };
  return (
    <LayoutContainer className="layout">
      <LeftSection>
        <StyledProfileImg>
          <img src={imgUrl} />
        </StyledProfileImg>
        <div style={{ display: "flex" }}>
          <input
            style={{ border: "none", borderBottom: "1px solid #000" }}
            value={stateMsg.value}
            onChange={handleInputChange}
            type="text"
            placeholder="상태메세지를 입력하세요"
          />

          <button
            onClick={onSaveStateMsg}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            <IoCheckbox />
          </button>
        </div>
      </LeftSection>

      <RightSection>
        <div>
          <WeeklyCalander
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            todos={todos}
          ></WeeklyCalander>
        </div>

        <TodoList
          selectedDate={selectedDate}
          setTodos={setTodos}
          todos={todos}
        ></TodoList>
      </RightSection>
    </LayoutContainer>
  );
}

export default App;
