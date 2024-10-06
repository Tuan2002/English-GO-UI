/* eslint-disable @typescript-eslint/no-explicit-any */
import CardCustom from "@/components/Card";
import { Button } from "antd";
import ModalSaveQuestion from "./ModalSaveQuestion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { QuestionActions } from "@/stores/questionStore/questionReducer";

const CategoryDetail = () => {
  const { levelId, skillId, categoryId } = useParams();
  const dispatch = useDispatch();
  const handleClickBtnCreateQuestion = () => {
    dispatch(QuestionActions.changeActionModal("create"));
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
  };
  useEffect(() => {
    dispatch<any>(LevelActions.getLevelById(levelId ?? ""));
    dispatch<any>(SkillActions.getSkillById(skillId ?? ""));
  }, [levelId, skillId, categoryId, dispatch]);
  return (
    <CardCustom showBackButton title='Category Detail' fullHeight>
      <div className='d-flex justify-content-end'>
        <Button type='dashed'>Import Question</Button>
        <Button onClick={handleClickBtnCreateQuestion} type='primary' className='ml-10'>
          Create Question
        </Button>
      </div>
      <div className='modal'>
        <ModalSaveQuestion />
      </div>
    </CardCustom>
  );
};
export default CategoryDetail;
