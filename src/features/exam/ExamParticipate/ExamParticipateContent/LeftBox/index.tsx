import { useSelector } from "react-redux";
import style from "./LeftBox.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import HTMLDisplay from "@/components/HtmlDisplay";
const cx = classNames.bind(style);
const LeftBox = () => {
  const { selectedQuestion } = useSelector((state: RootState) => state.examStore);
  return (
    <div className={cx("left-box-wrapper", "scrollbar")}>
      <div className={cx("level-info")}>
        <span className={cx("level-name")}>{selectedQuestion?.level?.displayName}: </span>
        {selectedQuestion?.level?.description && <span className={cx("level-desc")}>{selectedQuestion.level.description}</span>}
      </div>
      <div className={cx("question-info")}>
        {selectedQuestion?.description && (
          <div className={cx("question-description")}>
            <span>{selectedQuestion.description}</span>
          </div>
        )}
        <div className={cx("question-content")}>
          <HTMLDisplay htmlContent={selectedQuestion?.questionContent ?? ""} />
        </div>
        {selectedQuestion?.questionNote && (
          <div className={cx("question-note")}>
            <span>"{selectedQuestion.questionNote}"</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default LeftBox;
