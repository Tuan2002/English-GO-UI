import style from "./QuestionItem.module.scss";
import classNames from "classnames/bind";
import TextEditor from "@/components/TextEditor";
import { IResultOfQuestion } from "@/types/exam/ExamTypes";
const cx = classNames.bind(style);

interface IResultOfWritingProps {
  questionResult?: IResultOfQuestion;
}

const ResultOfWritingQuestion = ({ questionResult }: IResultOfWritingProps) => {
  return (
    <div className={cx("writing-answer-box")}>
      <div className={cx("answer-title")}>
        <span>Kết quả bài viết:</span>
      </div>
      <div className={cx("writing-input-box")}>
        <TextEditor
          height={200}
          placeholder='Enter your answer of your question here!'
          showToolbar={false}
          value={questionResult?.results[0]?.answer ?? ""}
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
};
export default ResultOfWritingQuestion;
