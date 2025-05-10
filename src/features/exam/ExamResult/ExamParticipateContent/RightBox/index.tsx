import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import WritingQuestion from "./WritingQuestion";
import SpeakingQuestion from "./SpeakingQuestion";
import OtherQuestion from "./OtherQuestiion";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import EXAM_SKILLS from "@/constants/ExamSkills";
const cx = classNames.bind(style);
interface RightBoxProps {
  isScroll?: boolean;
}
const RightBox = ({ isScroll = true }: RightBoxProps) => {
  const { selectedQuestion } = useSelector((state: RootState) => state.examStore);
  if (selectedQuestion?.skill?.id === EXAM_SKILLS.WRITING)
    return (
      <div className={cx("right-box-wrapper", { scrollbar: isScroll })}>
        <WritingQuestion />
      </div>
    );
  if (selectedQuestion?.skill?.id === EXAM_SKILLS.SPEAKING)
    return (
      <div className={cx("right-box-wrapper", { scrollbar: isScroll })}>
        <SpeakingQuestion />
      </div>
    );
  return (
    <div className={cx("right-box-wrapper", { scrollbar: isScroll })}>
      <OtherQuestion />
    </div>
  );
};
export default RightBox;
