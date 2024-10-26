import { RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioChangeEvent } from "antd";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { IExamQuestion } from "@/types/exam/ExamTypes";
import { ExamActions } from "@/stores/examStore/examReducer";
const cx = classNames.bind(style);

const OtherQuestion = () => {
  const { selectedQuestion, listQuestionOfSkill } = useSelector((state: RootState) => state.examStore);
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
    dispatch(ExamActions.changeSelectedQuestion(question));
    dispatch(ExamActions.changeListQuestionOfSkill(newListQuestion));
  };
  return (
    <div className={cx("list-sub-question")}>
      {selectedQuestion?.subQuestions && selectedQuestion?.subQuestions.length > 0 && (
        <div className={cx("sub-question-box")}>
          {selectedQuestion?.subQuestions.map((subQuestion, index) => (
            <div key={subQuestion.id} className={cx("sub-question-item")}>
              <div className={cx("sub-question-content")}>
                <span className={cx("question-order")}>{index + 1}: </span>
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
      )}
    </div>
  );
};
export default OtherQuestion;
