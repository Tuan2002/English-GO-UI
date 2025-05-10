import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch, RootState } from "@/stores";
import { ExaminerIntroductionActions } from "@/stores/examinerIntroduciton/examinerReducer";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { IExaminerWithIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
import { IGradeExamWithPersonRequest } from "@/types/gradingFeedback/GradingFeedbackType";
import { Checkbox, Col, Row } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCustom from "../Modal";
import ExaminerItem from "./ExaminerItem";
import style from "./ModalSelectExaminerToGrading.module.scss";
const cx = classNames.bind(style);

interface IModalSelectExaminerToGradingProps {
  open: boolean;
  onCancel: () => void;
  listExaminerIntroductions: IExaminerWithIntroduction[];
  selectedExamId: string | null;
  selectedSkill: string | null;
}
const ModalSelectExaminerToGrading = ({
  open,
  onCancel,
  listExaminerIntroductions,
  selectedExamId,
  selectedSkill,
}: IModalSelectExaminerToGradingProps) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.gradingStore);
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const { selectedExaminer } = useSelector(
    (state: RootState) => state.examinerIntroductionStore
  );
  const [isRandomSelectExaminer, setIsRandomSelectExaminer] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const changeSelectedExaminer = (examinerId: string | null) => {
    dispatch(ExaminerIntroductionActions.changeSelectedExaminer(examinerId));
    if (isRandomSelectExaminer && examinerId !== null) {
      setIsRandomSelectExaminer(false);
    }
  };
  const handleRegisterWithExaminer = () => {
    if (!isRandomSelectExaminer && selectedExaminer === null) {
      toast.warning(
        "Vui lòng chọn giám khảo chấm bài hoặc tích chọn giám khảo ngẫu nhiên"
      );
      return;
    }
    setOpenModalConfirm(true);
  };
  const handleConfirmRegisterWithExaminer = () => {
    if (selectedExaminer === null && !isRandomSelectExaminer) {
      toast.warning(
        "Vui lòng chọn giám khảo chấm bài hoặc tích chọn giám khảo ngẫu nhiên"
      );
      return;
    }
    if (!selectedExamId || !selectedSkill) {
      toast.warning("Vui lòng bài thi và kĩ năng cần chấm");
      return;
    }
    const registerData: IGradeExamWithPersonRequest = {
      examId: selectedExamId ?? "",
      skillId: selectedSkill ?? "",
      examinerId: selectedExaminer,
      contestantId: currentUser?.id ?? "",
    };
    dispatch(GradingActions.registerGradingExamWithPerson(registerData)).then(
      (res) => {
        if (res.payload.success) {
          console.log(res);
          toast.success("Đăng ký chấm bài thành công");
          onCancel();
          navigate(
            `${ROUTE_PATH.EXAM_HISTORY_GRADING_WITH_PERSON.replace(
              ":registeredGradeExamId",
              res.payload.data.registerGradeExamId
            )}?skill=${selectedSkill}`
          );
        }
      }
    );
  };
  useEffect(() => {
    if (isRandomSelectExaminer) {
      dispatch(ExaminerIntroductionActions.changeSelectedExaminer(null));
    }
  }, [dispatch, isRandomSelectExaminer]);
  return (
    <ModalCustom
      onOK={handleRegisterWithExaminer}
      width={900}
      open={open}
      onCancel={onCancel}
      showCloseButton={false}
      maskClosable={false}
      maskLoading={loading}
      confirmTitle="Đăng ký chấm bài"
      cancelTitle="Huỷ bỏ"
      modalTitle="Chọn giám khảo chấm bài"
      scrollBody
    >
      <div className={cx("list-examiner")}>
        <div className={cx("select-random-examiner")}>
          <Checkbox
            checked={isRandomSelectExaminer}
            onChange={(e) => setIsRandomSelectExaminer(e.target.checked)}
            id="checkbox"
          />
          <label htmlFor="checkbox">Chọn giám khảo ngẫu nhiên</label>
        </div>
        <Row gutter={[16, 16]}>
          {listExaminerIntroductions.map((examinerIntroduciton, index) => (
            <Col span={24} sm={12} md={8} key={index}>
              <ExaminerItem
                selectedExaminer={selectedExaminer}
                changeSelectedExaminer={changeSelectedExaminer}
                examinerIntroduction={examinerIntroduciton}
              />
            </Col>
          ))}
        </Row>
      </div>
      <ModalCustom
        onOK={handleConfirmRegisterWithExaminer}
        width={500}
        open={openModalConfirm && open}
        onCancel={() => setOpenModalConfirm(false)}
        showCloseButton={false}
        maskClosable={false}
        // maskLoading={loading}
        confirmTitle="Xác nhận"
        cancelTitle="Huỷ bỏ"
        modalTitle="Xác nhận đăng ký chấm bài"
      >
        <div className={cx("modal-confirm")}>
          <img
            className={cx("confirm-image")}
            src="https://lh6.googleusercontent.com/proxy/dEeZD31HctQvn6J1GC9u2P60Xi5BbdDzlS6BIgLDr8uXIcBblzvhJNQCBEYpwk2E3LXlDhYmtt2FYuRQT3FIHuHcLKxPlHKF"
          />
          <p className={cx("confirm-text")}>
            Bạn có chắc chắn muốn đăng ký giảng viên này chấm bài không?
          </p>
          <p>
            Sau khi xác nhận, bạn không thể đổi giảng viên chấm bài của mình
          </p>
        </div>
      </ModalCustom>
    </ModalCustom>
  );
};

export default ModalSelectExaminerToGrading;
