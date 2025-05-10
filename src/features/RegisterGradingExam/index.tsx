import ModalRegisterGrade from "@/components/ModalRegisterGrade";
import ModalSelectExaminerToGrading from "@/components/ModalSelectExaminerToGrading";
import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch, RootState } from "@/stores";
import { ExaminerIntroductionActions } from "@/stores/examinerIntroduciton/examinerReducer";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { ICheckRegisterGradingWithPersonRequest } from "@/types/gradingFeedback/GradingFeedbackType";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface RegisterGradingExamRef {
  handleRegisterGradingExam: (examId: string, skillId: string) => void;
}

const RegisterGradingExam = forwardRef<RegisterGradingExamRef>((_, ref) => {
  const navigate = useNavigate();
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [openModalRegisterGrade, setOpenModalRegisterGrade] = useState(false);
  const [
    openModalSelectExaminerToGrading,
    setOpenModalSelectExaminerToGrading,
  ] = useState(false);
  const { listExaminerIntroductions } = useSelector(
    (state: RootState) => state.examinerIntroductionStore
  );
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const dispatch: AppDispatch = useDispatch();
  const handleRegisterGradingExam = (examId: string, skillId: string) => {
    setOpenModalRegisterGrade(true);
    setSelectedExamId(examId);
    setSelectedSkill(skillId);
  };

  const handleRegisterWithExaminer = () => {
    const checkIsRegisteredData: ICheckRegisterGradingWithPersonRequest = {
      examId: selectedExamId ?? "",
      skillId: selectedSkill ?? "",
      contestantId: currentUser?.id ?? "",
    };
    dispatch(
      GradingActions.checkRegisterGradingExamWithPerson(checkIsRegisteredData)
    ).then((res) => {
      console.log("res", res);
      if (!res.payload.success) {
        toast.error(res.payload.message);
      }
      if (res.payload.data.isRegistered) {
        navigate(
          `${ROUTE_PATH.EXAM_HISTORY_GRADING_WITH_PERSON.replace(
            ":registeredGradeExamId",
            res.payload.data.registerGradeExamId
          )}?skill=${selectedSkill}`
        );
      } else {
        setOpenModalSelectExaminerToGrading(true);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    handleRegisterGradingExam,
  }));

  useEffect(() => {
    dispatch(ExaminerIntroductionActions.getAllExaminerIntroduction());
  }, [dispatch]);
  return (
    <div>
      <ModalRegisterGrade
        handleRegisterWithExaminer={handleRegisterWithExaminer}
        selectedExamId={selectedExamId}
        selectedSkill={selectedSkill}
        open={openModalRegisterGrade}
        onCancel={() => setOpenModalRegisterGrade(false)}
      />
      <ModalSelectExaminerToGrading
        listExaminerIntroductions={listExaminerIntroductions}
        selectedExamId={selectedExamId}
        selectedSkill={selectedSkill}
        open={openModalSelectExaminerToGrading}
        onCancel={() => setOpenModalSelectExaminerToGrading(false)}
      />
    </div>
  );
});

export default RegisterGradingExam;
