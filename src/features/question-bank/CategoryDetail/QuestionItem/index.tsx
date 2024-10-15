/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuestion } from "@/types/question/QuestionTypes";
import style from "./QuestionItem.module.scss";
import classNames from "classnames/bind";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonShow from "@/components/Button/ButtonShow";
import HTMLDisplay from "@/components/HtmlDisplay";
import { useDispatch } from "react-redux";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import { Switch } from "antd";
const cx = classNames.bind(style);
interface IQuestionItemProps {
  question: IQuestion;
  index: number;
}
const QuestionItem = ({ question, index }: IQuestionItemProps) => {
  const dispatch = useDispatch();
  const handleUpdateQuesiton = () => {
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch<any>(QuestionActions.getQuestionDetail(question.id));
    dispatch(QuestionActions.changeActionModal("update"));
    dispatch(QuestionActions.changeIsImporting(false));
  };
  const handleShowQuestionDetail = () => {
    dispatch<any>(QuestionActions.getQuestionDetail(question.id));
    dispatch(QuestionActions.changeOpenModalShowQuestionDetail(true));
    dispatch(QuestionActions.changeActionModal("show"));
  };
  const handleConfirmDelete = () => {
    dispatch<any>(QuestionActions.deleteQuestion(question.id));
  };
  const handleChangeSwitch = (checked: boolean) => {
    if (!checked) {
      dispatch<any>(QuestionActions.inactiveQuestion(question.id));
    } else {
      dispatch<any>(QuestionActions.activeQuestion(question.id));
    }
  };
  return (
    <div className={cx("question-item-wrapper")}>
      <div className={cx("question-header")}>
        <span className={cx("question-title")}>Question {index}</span>
        <div className={cx("action-box")}>
          <div className={cx("")}>
            <div className={cx("question-status")}>
              <Switch onClick={(e) => handleChangeSwitch(e)} checked={question.isActive} size='small' />
              <span>{question.isActive ? "Active" : "InActive"}</span>
            </div>
          </div>
          <div className={cx("action")}>
            <ButtonUpdate onClick={handleUpdateQuesiton} />
            <ButtonShow onClick={handleShowQuestionDetail} />
            <ButtonDelete
              confirmTitle='Are you sure you want to delete this question?'
              onConfirmDelete={handleConfirmDelete}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <div className={cx("question-body", "scrollbar")}>
        {question.attachedFile && (
          <audio controls className={cx("file-audio")}>
            <source src={question.attachedFile} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className={cx("question-content")}>
          <div className={cx("card-body")}>
            <HTMLDisplay htmlContent={question.questionContent ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionItem;
