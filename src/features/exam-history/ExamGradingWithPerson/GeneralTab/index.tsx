import { RootState } from "@/stores";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import style from "./GeneralTab.module.scss";
import classNames from "classnames/bind";
import {
  ERegisterGradeStatus,
  RegisterGradeStatus,
} from "@/constants/RegisterGradeStatus";
import ExaminerItem from "./ExaminerItem";
import { IExaminerWithIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
const cx = classNames.bind(style);
const GeneralTab = () => {
  const { currentRegisteredGradingExam } = useSelector(
    (state: RootState) => state.gradingStore
  );

  return (
    <div>
      <Row>
        <Col span={12}>
          <div className={cx("header-title")}>
            <span className={cx("title-text")}>Thông tin bài thi</span>
          </div>
          <div className={cx("body-box")}>
            <div className={cx("box-item")}>
              <span className={cx("item-label")}>Mã bài thi</span>
              <span className={cx("item-text")}>
                {currentRegisteredGradingExam?.exam.examCode}
              </span>
            </div>
            <div className={cx("box-item")}>
              <span className={cx("item-label")}>Kỹ năng đăng ký</span>
              <span className={cx("item-text")}>
                {currentRegisteredGradingExam?.skillId === "speaking"
                  ? "Kỹ năng nói"
                  : "Kỹ năng viết"}
              </span>
            </div>
            <div className={cx("box-item")}>
              <span className={cx("item-label")}>Thí sinh đăng ký</span>
              <span className={cx("item-text")}>
                {currentRegisteredGradingExam?.contestant.fullName}
              </span>
            </div>
            <div className={cx("box-item")}>
              <span className={cx("item-label")}>Giám khảo chấm bài</span>
              <span className={cx("item-text")}>
                {currentRegisteredGradingExam?.examiner.fullName}
              </span>
            </div>
            <div className={cx("box-item")}>
              <span className={cx("item-label")}>Trạng thái bài thi</span>
              <span className={cx("item-text")}>
                {
                  RegisterGradeStatus[
                    currentRegisteredGradingExam?.status as ERegisterGradeStatus
                  ]
                }
              </span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={cx("header-title")}>
            <span className={cx("title-text")}>Thông tin giám khảo</span>
          </div>
          <div className={cx("body-box", "examiner-introduction-box")}>
            <ExaminerItem
              examinerIntroduction={
                currentRegisteredGradingExam?.examiner as IExaminerWithIntroduction
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GeneralTab;
