import React from "react";
import styled from "styled-components";
import "./App.css";
import ProfileContainer from "components/ProfileContainer";
import Main from "components/Main";

const LayoutContainer = styled.div`
  display: flex;
  padding: 40px;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
`;

function App() {
  return (
    <LayoutContainer className="layout">
      <ProfileContainer />
      <Main />
    </LayoutContainer>
  );
}

export default App;
