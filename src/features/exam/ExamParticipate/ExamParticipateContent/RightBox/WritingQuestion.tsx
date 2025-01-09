import TextEditor from "@/components/TextEditor";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
const cx = classNames.bind(style);
const WritingQuestion = () => {
  const { selectedQuestion, listQuestionOfSkill } = useSelector((state: RootState) => state.examStore);
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    const newSelectedQuestion = {
      ...selectedQuestion,
      questionData: value,
    };
    const newListQuestionOfSkill = listQuestionOfSkill?.map((question) =>
      question.id === newSelectedQuestion.id ? newSelectedQuestion : question
    );
    dispatch(ExamActions.changeSelectedQuestion(newSelectedQuestion));
    dispatch(ExamActions.changeListQuestionOfSkill(newListQuestionOfSkill));
  };
  return (
    <div className={cx("writing-answer-box")}>
      <div className={cx("writing-input-box")}>
        <TextEditor
          height={300}
          placeholder='Enter your answer of your question here!'
          showToolbar={false}
          value={selectedQuestion?.questionData ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default WritingQuestion;
