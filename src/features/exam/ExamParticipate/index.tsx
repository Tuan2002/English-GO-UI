/* eslint-disable @typescript-eslint/no-explicit-any */
import ExamParticipateContent from "./ExamParticipateContent";
import ExamParticipateFooter from "./ExamParticipateFooter";
import style from "./ExamParticipate.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ExamActions } from "@/stores/examStore/examReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import ExamParticipateHeader from "./ExamParticipateHeader";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

const ExamParticipate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch<any>(SkillActions.getAllSkills());
    dispatch<any>(ExamActions.continueExam()).then((res: any) => {
      if (!res.payload.success) {
        // Redirect to exam list
        toast.error(res.payload.errorMessage);
        navigate(ROUTE_PATH.EXAM);
      }
    });
  }, []);
  return (
    <div className={cx("exam-participate-wrapper")}>
      <ExamParticipateHeader />
      <ExamParticipateContent />
      <ExamParticipateFooter />
    </div>
  );
};
export default ExamParticipate;
