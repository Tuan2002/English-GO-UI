import ROUTE_PATH from "@/routes/routePath";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./ExamResult.module.scss";
import classNames from "classnames/bind";
import ExamScoreFooter from "./ExamFooter";
import ExamScoreContent from "./ExamParticipateContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { ExamActions } from "@/stores/examStore/examReducer";
import { LevelActions } from "@/stores/levelStore/levelReducer";
const cx = classNames.bind(style);

const ExamResult = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const queryParams = new URLSearchParams(location.search);
  const skill = queryParams.get("skill");
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  const { listLevel } = useSelector((state: RootState) => state.levelStore);
  const { selectedLevel, currentSkill } = useSelector((state: RootState) => state.examStore);

  useEffect(() => {
    dispatch(SkillActions.getAllSkills());
    dispatch(LevelActions.getAllLevels());
    if (!examId) {
      toast.error("Không tìm thấy mã bài thi");
      navigate(ROUTE_PATH.EXAM);
      return;
    }
    if (!skill) {
      navigate(`${ROUTE_PATH.EXAM_RESULT.replace(":examId", examId ?? "")}?skill=listening`);
    }
  }, []);
  useEffect(() => {
    const getLevelOfSkill = (skillId: string) => {
      const levelOfSkill = listLevel?.filter((level) => level.skillId === skillId);
      dispatch(ExamActions.changeListLevelOfSkill(levelOfSkill));
      if (!selectedLevel || !levelOfSkill?.find((level) => level.id === selectedLevel)) {
        dispatch(ExamActions.changeSelectedLevel(levelOfSkill?.[0]?.id));
      }
    };
    if (skill && listSkill.length > 0) {
      dispatch(ExamActions.changeCurrentSkill(skill));
      getLevelOfSkill(skill);
    }
  }, [skill, listSkill.length, listLevel, dispatch, selectedLevel]);
  useEffect(() => {
    if (!examId || !currentSkill) {
      return;
    }
    dispatch(
      ExamActions.getResultOfExam({
        examId,
        skillId: currentSkill,
      })
    );
  }, [currentSkill, dispatch, examId]);
  return (
    <div className={cx("exam-score-wrapper")}>
      <ExamScoreContent />
      <ExamScoreFooter />
    </div>
  );
};
export default ExamResult;
