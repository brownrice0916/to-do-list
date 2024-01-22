import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoCheckbox } from "react-icons/io5";
import useSaveStateMsg from "hooks/useSaveStateMsg";
import CircularIndeterminate from "./CircularIndeterminate";

const StyledProfileContainer = styled.div`
  margin-right: 30px;
  /* flex: 1; */
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledProfileImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ededed;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 30px;
  cursor: pointer;
  margin-bottom: 30px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const StyledStateMsgContainer = styled.div`
  display: flex;

  & > input {
    border: none;
    border-bottom: 1px solid #000;
  }
  & > button {
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const imgUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(
  Math.random() * 100
)}`;

const ProfileContainer = () => {
  const [stateMsg, setStateMsg] = useState({ value: "", isDone: false });
  const { data, loading, addData, updateData } = useSaveStateMsg("stateMsg");

  useEffect(() => {
    if (!loading) {
      setStateMsg(data);
    } else {
      //setStateMsg("");
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
    <>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <StyledProfileContainer>
          <StyledProfileImg>
            <img alt="profile" src={imgUrl} />
          </StyledProfileImg>
          <StyledStateMsgContainer>
            <input
              value={stateMsg.value}
              onChange={handleInputChange}
              type="text"
              placeholder="상태메세지를 입력하세요"
            />

            <button onClick={onSaveStateMsg}>
              <IoCheckbox />
            </button>
          </StyledStateMsgContainer>
        </StyledProfileContainer>
      )}
    </>
  );
};

export default ProfileContainer;
