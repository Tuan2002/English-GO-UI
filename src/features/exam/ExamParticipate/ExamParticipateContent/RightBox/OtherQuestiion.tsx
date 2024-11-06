import { RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioChangeEvent, Skeleton } from "antd";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { IExamQuestion } from "@/types/exam/ExamTypes";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useEffect } from "react";
const cx = classNames.bind(style);

const QuestionSkeleton = () => {
  return (
    <div className={cx("question-skelton")}>
      <div className={cx("question-number")}>
        <Skeleton.Button active style={{ height: "50px" }} />
      </div>
      <div className={cx("question-content")}>
        <Skeleton.Input active block size='large' style={{ height: "50px", marginBottom: "10px" }} />
        <div className={cx("answer-item")}>
          <Skeleton.Avatar style={{ width: "20px", height: "20px" }} />
          <Skeleton.Input active block size='large' style={{ height: "30px", margin: "5px 0" }} />
        </div>
        <div className={cx("answer-item")}>
          <Skeleton.Avatar style={{ width: "20px", height: "20px" }} />
          <Skeleton.Input active block size='large' style={{ height: "30px", margin: "5px 0" }} />
        </div>
        <div className={cx("answer-item")}>
          <Skeleton.Avatar style={{ width: "20px", height: "20px" }} />
          <Skeleton.Input active block size='large' style={{ height: "30px", margin: "5px 0" }} />
        </div>
        <div className={cx("answer-item")}>
          <Skeleton.Avatar style={{ width: "20px", height: "20px" }} />
          <Skeleton.Input active block size='large' style={{ height: "30px", margin: "5px 0" }} />
        </div>
      </div>
    </div>
  );
};

const OtherQuestion = () => {
  const { selectedQuestion, listQuestionOfSkill, targetQuestionOfSkill, currentTargetQuestion } = useSelector(
    (state: RootState) => state.examStore
  );
  const dispatch = useDispatch();
  const handleChangeAnswer = (e: RadioChangeEvent, subquestionId: string) => {
    if (!selectedQuestion) return;
    const question: IExamQuestion = {
      ...selectedQuestion,
      subQuestions: selectedQuestion?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subquestionId) {
          return {
            ...subQuestion,
            selectedAnswerId: e.target.value,
          };
        }
        return subQuestion;
      }),
    };
    const newListQuestion = listQuestionOfSkill?.map((q) => {
      if (question.id === q.id) {
        return question;
      }
      return q;
    });
    const targetQuestions = targetQuestionOfSkill.map((target) => {
      if (target.questionId === subquestionId) {
        return {
          ...target,
          isDone: true,
        };
      }
      return target;
    });
    dispatch(ExamActions.changeSelectedQuestion(question));
    dispatch(ExamActions.changeListQuestionOfSkill(newListQuestion));
    dispatch(ExamActions.changeTargetQuestionOfSkill(targetQuestions));
  };
  useEffect(() => {
    if (currentTargetQuestion) {
      // scroll to current target question
      const element = document.getElementById(`sub-question-${currentTargetQuestion.questionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentTargetQuestion, selectedQuestion?.levelId]);
  return (
    <div className={cx("list-sub-question")}>
      {selectedQuestion?.id ? (
        selectedQuestion?.subQuestions &&
        selectedQuestion?.subQuestions.length > 0 && (
          <div className={cx("sub-question-box")}>
            {selectedQuestion?.subQuestions.map((subQuestion) => (
              <div key={subQuestion.id} id={`sub-question-${subQuestion.id}`} className={cx("sub-question-item")}>
                <div className={cx("sub-question-content")}>
                  <span className={cx("question-order")}>
                    {targetQuestionOfSkill.find((item) => item.questionId === subQuestion.id)?.index}.
                  </span>
                  <span className={cx("question-content")}>{subQuestion.content}</span>
                </div>
                <div className={cx("sub-question-answers")}>
                  <Radio.Group
                    onChange={(e) => handleChangeAnswer(e, subQuestion.id)}
                    className='full-width'
                    value={subQuestion.selectedAnswerId}
                  >
                    {subQuestion.answers.map((answer) => (
                      <div key={answer.id} className={cx("answer-item")}>
                        <Radio value={answer.id} id={`answer-${subQuestion.id}-${answer.id}`}>
                          {answer.answerContent}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
        </>
      )}
    </div>
  );
};
export default OtherQuestion;
