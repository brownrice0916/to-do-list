import { getWeekDays } from "\bcommon/date";
import useFirestore from "hooks/useFirestore";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
const StyledButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 30px;
  margin-right: 10px;
`;

const StyledProgressBtn = styled.button`
  border: 1px solid #000;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledInputWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledListContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
const StyledInput = styled.input`
  width: 90%;
  height: 50px;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  //justify-content: center;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px;
`;

const StyledCheckBox = styled.button`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledConfirmBtn = styled.button`
  font-size: 2rem;
  cursor: pointer;
`;

const StyledCancelBtn = styled.button`
  font-size: 2rem;
  cursor: pointer;
`;

const StyledDoneDiv = styled.div`
  width: 90%;
  height: 50px;
  box-shadow: 5px 5px 5px 2px #ccc;
  margin-right: 10px;
  display: flex;
  //justify-content: center;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px;
`;

const StyledBtnWrap = styled.div``;
const ToDoList = ({ todos, setTodos, selectedDate }) => {
  // const [todos, setTodos] = useState([]);

  const [activeTab, setActiveTab] = useState("전체");

  const { addDocument, deleteDocument, updateDocument } = useFirestore(
    "todolist",
    selectedDate,
    setTodos
  );

  const handleAddTodo = async () => {
    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setHours(0, 0, 0, 0);

    const newTodo = {
      value: "",
      isEditing: true,
      date: newSelectedDate,
      isDone: false,
      isAdded: false,
      createdAt: new Date(),
    };

    const docId = await addDocument(newTodo);

    newTodo.docId = docId;

    setTodos([...todos, newTodo]);
    //setTodos([...todos, ""]);
  };

  const filteredTodos = useMemo(() => {
    const currentDayIndex = selectedDate.getDay();

    let filteredTodos = todos.filter((todo) => {
      return todo.date.getDay() === currentDayIndex;
    });
    if (activeTab === "진행중") {
      filteredTodos = filteredTodos.filter((todo) => !todo.isDone);
    } else if (activeTab === "완료") {
      filteredTodos = filteredTodos.filter((todo) => todo.isDone);
    }

    return filteredTodos;
  }, [selectedDate, todos, activeTab]);

  const handleInputChange = (docId, value) => {
    // setCurrentInput(value);
    const newTodoList = todos.map((todo) => {
      if (todo.docId === docId) {
        return { ...todo, value: value };
      }
      return todo;
    });
    setTodos(newTodoList);
  };

  const deleteTodo = (docId) => {
    const newTodos = todos.filter((todo) => todo.docId !== docId);
    deleteDocument(docId);
    setTodos(newTodos);
  };

  const finishEditing = async (docId, newTodo) => {
    //newTodo.isEditing = !newTodo.isEditing;
    // newTodo.isAdded = true;

    const newTodos = todos.map((todo) => {
      if (todo.docId === docId) {
        todo.isEditing = !todo.isEditing;
        return newTodo;
      }
      return todo;
    });
    updateDocument(docId, { ...newTodo, isDone: !newTodo.isEditing });
    setTodos(newTodos);
  };

  const finishTodo = (docId, newTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.docId === docId) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    updateDocument(docId, { ...newTodo, isDone: !newTodo.isDone });
    setTodos(newTodos);
  };

  const stateChangeHandler = (status) => {
    setActiveTab(status);
  };
  return (
    <>
      {" "}
      <div>
        <StyledButton onClick={handleAddTodo} className="text-center">
          To Do List +
        </StyledButton>
        {["전체", "진행중", "완료"].map((status, index) => (
          <StyledProgressBtn
            onClick={() => {
              stateChangeHandler(status);
            }}
            style={status === activeTab ? { backgroundColor: "yellow" } : {}}
            key={index}
          >
            {status}
          </StyledProgressBtn>
        ))}
        {filteredTodos &&
          filteredTodos.map((todo, index) => (
            <StyledListContainer key={index}>
              <StyledInputWrap>
                <StyledCheckBox>
                  <IoCheckbox
                    onClick={() => finishTodo(todo.docId, todo)}
                    style={todo.isDone ? { color: "red" } : { color: "black" }}
                  />
                </StyledCheckBox>

                {todo.isEditing ? (
                  <StyledInput
                    type="text"
                    value={todo.value}
                    onChange={(e) =>
                      handleInputChange(todo.docId, e.target.value)
                    }
                  />
                ) : (
                  <StyledDoneDiv
                    style={
                      todo.isDone
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {todo.value}
                  </StyledDoneDiv>
                )}
              </StyledInputWrap>
              <StyledBtnWrap>
                <StyledConfirmBtn
                  onClick={() => finishEditing(todo.docId, todo)}
                >
                  {todo.isEditing ? <GiConfirmed /> : <FaEdit />}
                </StyledConfirmBtn>
                <StyledCancelBtn
                  onClick={() => {
                    deleteTodo(todo.docId);
                  }}
                >
                  <MdDelete />
                </StyledCancelBtn>
              </StyledBtnWrap>
            </StyledListContainer>
          ))}
      </div>
    </>
  );
};

export default ToDoList;
