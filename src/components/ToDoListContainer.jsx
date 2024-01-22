import useFirestore from "hooks/useFirestore";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ToDoList from "./TodoList";

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

const ToDoListContainer = ({ todos, setTodos, selectedDate, setLoading }) => {
  // const [todos, setTodos] = useState([]);

  const [activeTab, setActiveTab] = useState("전체");

  const { loading, addDocument, deleteDocument, updateDocument } = useFirestore(
    "todolist",
    selectedDate,
    setTodos
  );

  const handleAddTodo = async () => {
    const newSelectedDate = new Date(selectedDate.toDateString());

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

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading, setLoading]);

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

  const stateChangeHandler = (status) => {
    setActiveTab(status);
  };
  return (
    <>
      <div>
        <StyledButton onClick={handleAddTodo} className="text-center">
          To Do List +
        </StyledButton>
        {["전체", "진행중", "완료"].map((status, index) => (
          <StyledProgressBtn
            onClick={() => {
              stateChangeHandler(status);
            }}
            style={status === activeTab ? { backgroundColor: "#ffd400" } : {}}
            key={index}
          >
            {status}
          </StyledProgressBtn>
        ))}
        {filteredTodos &&
          filteredTodos.map((todo, index) => (
            <ToDoList
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              deleteDocument={deleteDocument}
              updateDocument={updateDocument}
              key={index}
            />
          ))}
      </div>
    </>
  );
};

export default ToDoListContainer;
