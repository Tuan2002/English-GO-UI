import style from "./QuestionItem.module.scss";
import classNames from "classnames/bind";
import { IResultOfQuestion } from "@/types/exam/ExamTypes";
const cx = classNames.bind(style);

interface IResultOfSpeakingProps {
  questionResult?: IResultOfQuestion;
}

const ResultOfSpeakingQuestion = ({ questionResult }: IResultOfSpeakingProps) => {
  return (
    <div className={cx("speaking-answer-box")}>
      <div className={cx("answer-title")}>
        <span>Kết quả bài nói:</span>
        {!questionResult?.results[0]?.answer && (
          <span className={cx("result-error")}>Bài nói chưa được thực hiện hoặc quá trình lưu bị lỗi</span>
        )}
      </div>
      <div className={cx("speaking-input-box")}>
        <audio controls className={cx("audio-player")}>
          {questionResult?.results[0]?.answer && <source src={questionResult?.results[0]?.answer} type='audio/mpeg' />}
        </audio>
      </div>
    </div>
  );
};
export default ResultOfSpeakingQuestion;
