import TextEditor from "@/components/TextEditor";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
const cx = classNames.bind(style);
const WritingQuestion = () => {
  const { questionResult } = useSelector((state: RootState) => state.examStore);

  return (
    <div className={cx("writing-answer-box")}>
      <div className={cx("writing-input-box")}>
        <TextEditor
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
export default WritingQuestion;
