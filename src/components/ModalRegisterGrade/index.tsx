/* eslint-disable @typescript-eslint/no-explicit-any */
import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch, RootState } from "@/stores";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCustom from "../Modal";
import style from "./ModalRegisterGrade.module.scss";
import EXAM_SKILLS from "@/constants/ExamSkills";
const cx = classNames.bind(style);

interface IModalRegisterGradeProps {
  open: boolean;
  onCancel: () => void;
  handleRegisterWithExaminer: () => void;
  selectedExamId?: string | null;
  selectedSkill?: string | null;
}
const ModalRegisterGrade = ({
  open,
  onCancel,
  selectedExamId,
  selectedSkill,
  handleRegisterWithExaminer,
}: IModalRegisterGradeProps) => {
  const [selectedType, setSelectedType] = useState<string>("type-1");
  const { loading, isSubmiting } = useSelector((state: RootState) => state.gradingStore);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleRegisterMark = () => {
    if (!selectedExamId || !selectedSkill) {
      toast.warning("Vui lòng chọn bài thi và kỹ năng để đăng ký chấm bài");
      return;
    }
    if (!selectedType) {
      toast.warning("Vui lòng chọn hình thức chấm bài");
      return;
    }
    if (selectedType === "type-1" && selectedSkill === EXAM_SKILLS.SPEAKING) {
      toast.warning("Chức năng này không khả dụng cho kỹ năng nói");
      return;
    }
    if (selectedType === "type-1" && selectedSkill === EXAM_SKILLS.WRITING) {
      // Handle register with AI
      dispatch(GradingActions.gradingWritingWithAI(selectedExamId)).then((response) => {
        if ((response as any).payload.success) {
          navigate(`${ROUTE_PATH.EXAM_HISTORY_GRADING_WITH_AI.replace(":examId", selectedExamId)}?skill=${selectedSkill}`);
        }
      });
      return;
    }
    if (selectedType === "type-2") {
      // handle register with examiner
      handleRegisterWithExaminer();
    }
  };

  return (
    <ModalCustom
      onOK={handleRegisterMark}
      width={500}
      open={open}
      onCancel={onCancel}
      showHeader={false}
      showCloseButton={false}
      maskClosable={false}
      maskLoading={loading || isSubmiting}
      isLoading={loading || isSubmiting}
    >
      <div className={cx("grade-register")}>
        <div className={cx("grade-register-header")}>
          <h3 className={cx("grade-register-title")}>Đăng ký chấm bài</h3>
          <p className={cx("grade-register-description")}>Để có thể chấm bài, bạn cần đăng ký một trong hai hình thức sau:</p>
        </div>
        <div className={cx("grade-list")}>
          <div
            onClick={() => setSelectedType("type-1")}
            className={cx("grade-item", { "selected-grade": selectedType === "type-1" })}
          >
            <img className={cx("grade-item-image")} src='https://cdn-icons-png.flaticon.com/512/4712/4712139.png' />
            <div className={cx("grade-item-content")}>
              <h4 className={cx("grade-item-title")}>
                Đăng ký chấm bài <br /> Sử dụng trí tuệ nhân tạo
              </h4>
            </div>
          </div>
          <div
            onClick={() => setSelectedType("type-2")}
            className={cx("grade-item", { "selected-grade": selectedType === "type-2" })}
          >
            <img
              className={cx("grade-item-image")}
              src='https://lh6.googleusercontent.com/proxy/dEeZD31HctQvn6J1GC9u2P60Xi5BbdDzlS6BIgLDr8uXIcBblzvhJNQCBEYpwk2E3LXlDhYmtt2FYuRQT3FIHuHcLKxPlHKF'
            />
            <div className={cx("grade-item-content")}>
              <h4 className={cx("grade-item-title")}>
                Đăng ký chấm bài <br /> Với giáo viên chấm bài
              </h4>
            </div>
          </div>
        </div>
      </div>
    </ModalCustom>
  );
};

export default ModalRegisterGrade;
