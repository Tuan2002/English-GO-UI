import { Col, Row, Skeleton } from "antd";
import style from "./ListeningAndReading.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import QuestionItem from "../QuestionItem";
import { ITargetQuestionOfSkill } from "@/types/exam/ExamTypes";
import { ExamActions } from "@/stores/examStore/examReducer";
const cx = classNames.bind(style);

const ListeningAndReadingTab = () => {
  const { listQuestionOfSkill, targetQuestionOfSkill, resultOfQuestion } = useSelector((state: RootState) => state.examStore);
  const dispatch: AppDispatch = useDispatch();
  const handleChangeTargetQuestion = (question: ITargetQuestionOfSkill) => {
    dispatch(ExamActions.changeCurrentTargetQuestion(question));
  };
  return (
    <div className={cx("exam-listening", "full-height", "scrollbar")}>
      <Row align={"stretch"} className='full-height'>
        <Col span={18} xs={24} sm={14} md={16} lg={18} className='full-height'>
          <div className='full-height scrollbar'>
            {listQuestionOfSkill?.map((question, index) => {
              const questionResult = resultOfQuestion?.find((item) => item.questionId === question.id);
              return <QuestionItem questionResult={questionResult} index={index} key={question.id} question={question} />;
            })}
          </div>
        </Col>
        <Col span={6} xs={24} sm={10} md={8} lg={6}>
          <div className={cx("info-box", "scrollbar")}>
            <div className={cx("questions")}>
              {targetQuestionOfSkill && targetQuestionOfSkill?.length > 0 ? (
                targetQuestionOfSkill.map((target, index) => {
                  return (
                    <span
                      onClick={() => handleChangeTargetQuestion(target)}
                      key={index}
                      className={cx("question-item", { active: target.isDone })}
                    >
                      {index + 1}
                    </span>
                  );
                })
              ) : (
                <div className='skeleton scrollbar' style={{ display: "flex", gap: "10px", flexWrap: "wrap", height: "80px" }}>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      active
                      size='small'
                      style={{ width: "30px", height: "30px", minWidth: "30px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ListeningAndReadingTab;
