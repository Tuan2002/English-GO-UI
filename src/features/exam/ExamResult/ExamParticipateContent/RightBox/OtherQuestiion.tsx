import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { Radio, Skeleton } from "antd";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
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
  const { selectedQuestion, targetQuestionOfSkill, currentTargetQuestion, questionResult } = useSelector(
    (state: RootState) => state.examStore
  );
  useEffect(() => {
    if (currentTargetQuestion) {
      // scroll to current target question
      const element = document.getElementById(`sub-question-${currentTargetQuestion.questionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentTargetQuestion, selectedQuestion?.levelId]);
  console.log(questionResult);
  return (
    <div className={cx("list-sub-question")}>
      {selectedQuestion?.id ? (
        selectedQuestion?.subQuestions &&
        selectedQuestion?.subQuestions.length > 0 && (
          <div className={cx("sub-question-box")}>
            {selectedQuestion?.subQuestions.map((subQuestion) => {
              const result = questionResult?.results?.find((item) => item.question === subQuestion.id);
              const isCorrect = result?.answer === subQuestion.correctAnswer;
              return (
                <div key={subQuestion.id} id={`sub-question-${subQuestion.id}`} className={cx("sub-question-item")}>
                  <div className={cx("sub-question-content")}>
                    <span className={cx("question-order", { correct: isCorrect })}>
                      {targetQuestionOfSkill.find((item) => item.questionId === subQuestion.id)?.index}.
                    </span>
                    <span
                      className={cx("question-content", {
                        incorrect: !isCorrect,
                        correct: isCorrect,
                      })}
                    >
                      {subQuestion.content}
                    </span>
                  </div>
                  <div className={cx("sub-question-answers")}>
                    <Radio.Group className='full-width' value={result?.answer}>
                      {subQuestion.answers.map((answer) => (
                        <div key={answer.id} className={cx("answer-item", { correct: isCorrect })}>
                          <Radio disabled value={answer.id} id={`answer-${subQuestion.id}-${answer.id}`}>
                            {answer.answerContent}
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              );
            })}
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
