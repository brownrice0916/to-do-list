import useFirestore from "hooks/useFirestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
`;

const StyledInputWrap = styled.div`
  flex: 1;
  display: flex;
`;

const StyledListContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const StyledInput = styled.input`
  width: 90%;
  height: 50px;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledConfirmBtn = styled.button`
  background-color: blue;
  color: #fff;
`;

const StyledCancelBtn = styled.button`
  background-color: red;
  color: #fff;
`;

const StyledDoneDiv = styled.div`
  width: 90%;
  height: 50px;
  box-shadow: 5px 5px 5px 2px #ccc;
  margin-right: 10px;
`;

const StyledBtnWrap = styled.div``;
const ToDoList = ({ selectedDate }) => {
  const [todos, setTodos] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);

  const {
    data,
    loading,
    addDocument,
    deleteDocument,
    updateDocument,
    getCollectionData,
  } = useFirestore("todolist", selectedDate.toLocaleDateString("ko-KR"));

  const handleAddTodo = () => {
    setTodos([
      ...todos,
      {
        value: "",
        isEditing: true,
        date: selectedDate.toLocaleDateString("ko-KR"),
        isDone: false,
        isAdded: false,
        index: nextIndex,
      },
    ]);
    //setTodos([...todos, ""]);
  };

  useEffect(() => {
    if (!loading) {
      setTodos(data);
    }
  }, [data, loading]);

  const handleInputChange = (index, value) => {
    const newTodoList = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, value: value };
      }
      return todo;
    });

    setTodos(newTodoList);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    deleteDocument(id);
  };

  const finishEditing = async (id, value) => {
    value.isEditing = !value.isEditing;
    // console.log(value);
    setNextIndex(nextIndex + 1);
    if (!value.isAdded) {
      value.isAdded = true;
      value.index = nextIndex;

      try {
        const newTodoId = await addDocument(value);
        await getCollectionData(selectedDate.toLocaleDateString("ko-KR"));
        const addedTodo = data.find((todo) => todo.id === newTodoId);

        if (addedTodo) {
          setTodos([...todos, addedTodo]);
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      updateDocument(id, { value: value.value });
    }
  };

  const finishTodo = (id, isDone) => {
    const newTodoList = todos.map((todo, i) => {
      if (todo.id === id) {
        return { ...todo, isDone: !isDone };
      }
      return todo;
    });
    setTodos(newTodoList);
  };

  return (
    <>
      {" "}
      <div>
        <StyledButton onClick={handleAddTodo} className="text-center">
          To Do List +
        </StyledButton>
        <StyledProgressBtn>전체</StyledProgressBtn>
        <StyledProgressBtn>진행중</StyledProgressBtn>
        <StyledProgressBtn>완료</StyledProgressBtn>
        {todos &&
          todos.map((todo, index) => (
            <StyledListContainer key={index}>
              <StyledInputWrap>
                <input
                  onClick={() => finishTodo(todo.id)}
                  type="checkbox"
                  id="horns"
                  name="horns"
                />

                {todo.isEditing ? (
                  <StyledInput
                    type="text"
                    value={todo.value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ) : (
                  <StyledDoneDiv>{todo.value}</StyledDoneDiv>
                )}
              </StyledInputWrap>
              <StyledBtnWrap>
                <StyledConfirmBtn onClick={() => finishEditing(todo.id, todo)}>
                  {todo.isEditing ? "확인" : "수정"}
                </StyledConfirmBtn>
                <StyledCancelBtn
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  삭제
                </StyledCancelBtn>
              </StyledBtnWrap>
            </StyledListContainer>
          ))}
      </div>
    </>
  );
};

export default ToDoList;
