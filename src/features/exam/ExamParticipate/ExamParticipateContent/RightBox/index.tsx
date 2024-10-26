import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import WritingQuestion from "./WritingQuestion";
import SpeakingQuestion from "./SpeakingQuestion";
import OtherQuestion from "./OtherQuestiion";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const RightBox = () => {
  const { selectedQuestion } = useSelector((state: RootState) => state.examStore);
  if (selectedQuestion?.skill?.id === "writing")
    return (
      <div className={cx("right-box-wrapper", "scrollbar")}>
        <WritingQuestion />
      </div>
    );
  if (selectedQuestion?.skill?.id === "speaking")
    return (
      <div className={cx("right-box-wrapper", "scrollbar")}>
        <SpeakingQuestion />
      </div>
    );
  return (
    <div className={cx("right-box-wrapper", "scrollbar")}>
      <OtherQuestion />
    </div>
  );
};
export default RightBox;
