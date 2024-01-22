import React from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

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
  box-shadow: 5px 5px 5px 2px #ccc;
  border: none;
  font-size: 1.2rem;
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
  font-size: 1rem;
`;

const StyledBtnWrap = styled.div``;

const ToDoList = ({
  todo,
  todos,
  setTodos,
  deleteDocument,
  updateDocument,
}) => {
  const handleInputChange = (docId, value) => {
    // setCurrentInput(value);
    const newTodoList = todos.map((todo) =>
      todo.docId === docId ? { ...todo, value: value } : todo
    );

    setTodos(newTodoList);
  };

  const deleteTodo = (docId) => {
    const newTodos = todos.filter((todo) => todo.docId !== docId);
    deleteDocument(docId);
    setTodos(newTodos);
  };

  const finishEditing = async (docId, newTodo) => {
    const newTodos = todos.map((todo) =>
      todo.docId === docId ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    updateDocument(docId, { ...newTodo, isDone: !newTodo.isEditing });
    setTodos(newTodos);
  };

  const finishTodo = (docId, newTodo) => {
    const newTodos = todos.map((todo) =>
      todo.docId === docId ? { ...todo, isDone: !todo.isDone } : todo
    );
    updateDocument(docId, { ...newTodo, isDone: !newTodo.isDone });
    setTodos(newTodos);
  };

  return (
    <StyledListContainer>
      <StyledInputWrap>
        <StyledCheckBox>
          <IoCheckbox
            onClick={() => finishTodo(todo.docId, todo)}
            style={todo.isDone ? { color: "#ffd400" } : { color: "#999" }}
          />
        </StyledCheckBox>

        {todo.isEditing ? (
          <StyledInput
            type="text"
            value={todo.value}
            onChange={(e) => handleInputChange(todo.docId, e.target.value)}
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
        <StyledConfirmBtn onClick={() => finishEditing(todo.docId, todo)}>
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
  );
};

export default ToDoList;
