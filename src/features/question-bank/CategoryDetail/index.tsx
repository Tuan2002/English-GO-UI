/* eslint-disable @typescript-eslint/no-explicit-any */
import CardCustom from "@/components/Card";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import { RootState } from "@/stores";
import QuestionItem from "./QuestionItem";
import ModalShowQuestionDetail from "./ModalShowQuestionDetail";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import ModalSaveQuestion from "../components/ModalSaveQuestion";

const CategoryDetail = () => {
  const { levelId, skillId, categoryId } = useParams();
  const navigate = useNavigate();
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  const { listQuestions } = useSelector((state: RootState) => state.questionStore);
  const { currentLevel } = useSelector((state: RootState) => state.levelStore);
  const { currentCategory } = useSelector((state: RootState) => state.categoryStore);
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const dispatch = useDispatch();
  const handleClickBtnCreateQuestion = () => {
    dispatch(QuestionActions.changeActionModal("create"));
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch(
      QuestionActions.initSelectedQuestion({
        skillId: skillId ?? "",
        levelId: levelId ?? "",
        categoryId: categoryId ?? "",
        subQuestionNumber: currentLevel?.subQuestionNumber ?? 0,
      })
    );
    dispatch(QuestionActions.changeIsImporting(false));
  };
  const handleGotoImportQuestionPage = () => {
    navigate(`create-question`);
  };
  useEffect(() => {
    dispatch<any>(LevelActions.getLevelById(levelId ?? ""));
    dispatch<any>(SkillActions.getSkillById(skillId ?? ""));
    dispatch<any>(CategoryAction.getCategoryById(categoryId ?? ""));
  }, [levelId, skillId, categoryId, dispatch]);
  useEffect(() => {
    dispatch<any>(QuestionActions.getQuestionByCategory({ categoryId: categoryId ?? "", status }));
  }, [categoryId, dispatch, status]);
  return (
    <CardCustom
      showBackButton
      title={`${currentSkill?.displayName} / ${currentLevel?.displayName} / ${currentCategory?.name}`}
      fullHeight
    >
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <Select
            defaultValue={"all"}
            value={status}
            onChange={(e: "all" | "active" | "inactive") => setStatus(e)}
            className='mr-10'
            style={{ width: 200 }}
            placeholder='Filter by status'
          >
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='inactive'>Inactive</Select.Option>
            <Select.Option value='all'>All</Select.Option>
          </Select>
        </div>
        <div className='d-flex justify-content-end'>
          <Button type='primary' danger>
            Deleted Question
          </Button>
          <Button onClick={handleGotoImportQuestionPage} type='dashed' className='ml-10'>
            Import Question
          </Button>
          <Button onClick={handleClickBtnCreateQuestion} type='primary' className='ml-10'>
            Create Question
          </Button>
        </div>
      </div>
      <div className='list-quesiton mt-10'>
        {listQuestions?.length > 0 &&
          listQuestions.map((question, index) => <QuestionItem index={index + 1} key={question.id} question={question} />)}
      </div>
      <div className='modal'>
        <ModalSaveQuestion />
        <ModalShowQuestionDetail />
      </div>
    </CardCustom>
  );
};
export default CategoryDetail;
