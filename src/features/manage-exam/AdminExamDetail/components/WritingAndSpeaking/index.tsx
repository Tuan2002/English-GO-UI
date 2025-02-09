import style from "./WritingAndSpeaking.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import QuestionItem from "../QuestionItem";
const cx = classNames.bind(style);

const WritingAndSpeakingTab = () => {
  const { listQuestionOfSkill, resultOfQuestion } = useSelector((state: RootState) => state.examStore);
  return (
    <div className={cx("exam-listening", "full-height")}>
      <div className='full-height scrollbar'>
        {listQuestionOfSkill?.map((question, index) => {
          const questionResult = resultOfQuestion?.find((item) => item.questionId === question.id);
          return <QuestionItem questionResult={questionResult} index={index} key={question.id} question={question} />;
        })}
      </div>
    </div>
  );
};
export default WritingAndSpeakingTab;
