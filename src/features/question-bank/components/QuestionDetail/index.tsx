import HTMLDisplay from "@/components/HtmlDisplay";
import { IQuestionDetail } from "@/types/question/QuestionTypes";
import { Radio } from "antd";
import style from "./QuestionDetail.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface IQuestionDetailProps {
  question: IQuestionDetail;
}
const QuestionDetail = ({ question }: IQuestionDetailProps) => {
  return (
    <div className={cx("question-detail-wrapper")}>
      <div className={cx("question-box")}>
        {question?.attachedFile && question?.attachedFile?.trim() && (
          <div className={cx("question-file")}>
            <audio controls className={cx("file-audio", "full-width")}>
              <source src={question?.attachedFile} type='audio/mpeg' />
              Your browser does not support the audio element
            </audio>
          </div>
        )}
        {question?.description && question?.description?.trim() && (
          <div className={cx("question-description")}>
            <span>{question?.description}</span>
          </div>
        )}
        <div className={cx("question-content")}>
          <HTMLDisplay htmlContent={question?.questionContent ?? ""} />
        </div>
        {question?.questionNote && question?.questionNote?.trim() && (
          <div className={cx("question-note")}>
            "<span>{question?.questionNote}</span>"
          </div>
        )}
      </div>
      {question?.subQuestions && question?.subQuestions.length > 0 && (
        <div className={cx("sub-question-box")}>
          {question?.subQuestions?.map((subQuestion, index) => (
            <div key={subQuestion?.id} className={cx("sub-question-item")}>
              <div className={cx("sub-question-content")}>
                <span className={cx("question-order")}>{index + 1}: </span>
                <span className={cx("question-content")}>{subQuestion?.content}</span>
              </div>
              <div className={cx("sub-question-answers")}>
                {subQuestion?.answers?.map((answer) => (
                  <div key={answer?.id} className={cx("answer-item")}>
                    <span className={cx("answer-order")}>
                      <Radio checked={answer?.isCorrect} disabled />
                    </span>
                    <span className={cx("answer-content")}>{answer?.answerContent}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default QuestionDetail;
