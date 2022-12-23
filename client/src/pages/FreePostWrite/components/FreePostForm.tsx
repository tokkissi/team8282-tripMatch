import React, { useRef, useState } from "react";
import Editor from "../../../components/Editor/Editor";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonContainer,
  Select,
  TitleContainer,
  TitleInputBox,
} from "./FreePostFormStyle";
import type { FreePostType } from "../../../type/freePost";
import AppSelect from "../../../components/AppSelect/AppSelect";
import {
  useCreateFreePostMutation,
  useUpdateFreePostMutation,
} from "../../../slice/freePostApi";

const FreePostForm = () => {
  const state: FreePostType = useLocation().state;
  const navigate = useNavigate();
  const [
    createFreePost,
    { isLoading: isLoadingCreate, isError: isErrorCreate },
  ] = useCreateFreePostMutation();
  const [
    updateFreePost,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate },
  ] = useUpdateFreePostMutation();

  const [contentInput, setContentInput] = useState("");
  const [regionSelect, setRegionSelect] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state) {
      const newObj: FreePostType = {
        communityId: state.communityId,
        comments: state.comments,
        createdAt: state.createdAt,
        author: state.author,
        // 여기까지의 값은 api 완성시 삭제 예정
        title: titleInput,
        region: regionSelect,
        category: categorySelect,
        content: contentInput,
      };
      updateFreePost(newObj);
      navigate(`/free/${state.communityId}`);
    } else {
      const newObj: FreePostType = {
        communityId: Date.now().toString(),
        comments: [],
        createdAt: "",
        author: { email: "111", nickname: "111", profileImg: "" },
        // 여기까지의 값은 api 완성시 삭제 예정
        title: titleInput,
        region: regionSelect,
        category: categorySelect,
        content: contentInput,
      };
      createFreePost(newObj);
      navigate("/free");
    }
  };

  const onClickCancle = () => {
    state ? navigate(`/free/${state.communityId}`) : navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <TitleContainer>
        <AppSelect
          options={[
            "서울",
            "경기도",
            "강원도",
            "충청도",
            "경상도",
            "전라도",
            "제주도",
            "기타",
          ]}
          className="region"
          onChange={(e) => setRegionSelect(e.target.value)}
        />
        <AppSelect
          options={["맛집", "액티비티", "교통", "숙소", "기타"]}
          className="category"
          onChange={(e) => setCategorySelect(e.target.value)}
        />
        <TitleInputBox>
          <input
            type="text"
            placeholder="ex) 12월 31일 부산 해돋이 보러갈 동행 2명 구합니다"
            defaultValue={state && state.title}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </TitleInputBox>
      </TitleContainer>
      <Editor
        initialValue={state && state.content}
        setContent={setContentInput}
      />
      <ButtonContainer>
        <Button type="button" onClick={onClickCancle}>
          취소
        </Button>
        <Button>{state ? "수정 완료" : "작성 완료"}</Button>
      </ButtonContainer>
    </form>
  );
};

export default FreePostForm;
