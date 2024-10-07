import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "../CategoryDetail.module.scss";
import classNames from "classnames/bind";
import HTMLDisplay from "@/components/HtmlDisplay";
import { Radio } from "antd";
const cx = classNames.bind(style);

const ModalShowQuestionDetail = () => {
  const { openModalShowQuestionDetail, selectedQuestion } = useSelector((state: RootState) => state.questionStore);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(QuestionActions.changeOpenModalShowQuestionDetail(false));
    dispatch(QuestionActions.changeSelectedQuestion(undefined));
    dispatch(QuestionActions.changeActionModal("create"));
  };
  const handleUpdateQuesiton = () => {
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch(QuestionActions.changeOpenModalShowQuestionDetail(false));
    dispatch(QuestionActions.changeActionModal("update"));
  };
  return (
    <ModalCustom
      confirmTitle='Update'
      width={800}
      scrollBody
      open={openModalShowQuestionDetail}
      onOK={handleUpdateQuesiton}
      onCancel={handleCancel}
      modalTitle={"Question Detail"}
    >
      <div className={cx("question-detail-wrapper")}>
        <div className={cx("question-box")}>
          {selectedQuestion?.attachedFile && selectedQuestion?.attachedFile?.trim() && (
            <div className={cx("question-file")}>
              <audio controls className={cx("file-audio", "full-width")}>
                <source src={selectedQuestion?.attachedFile} type='audio/mpeg' />
                Your browser does not support the audio element
              </audio>
            </div>
          )}
          {selectedQuestion?.description && selectedQuestion?.description?.trim() && (
            <div className={cx("question-description")}>
              <span>{selectedQuestion?.description}</span>
            </div>
          )}
          <div className={cx("question-content")}>
            <HTMLDisplay htmlContent={selectedQuestion?.questionContent ?? ""} />
          </div>
          {selectedQuestion?.questionNote && selectedQuestion?.questionNote?.trim() && (
            <div className={cx("question-note")}>
              "<span>{selectedQuestion?.questionNote}</span>"
            </div>
          )}
        </div>
        {selectedQuestion?.subQuestions && selectedQuestion?.subQuestions.length > 0 && (
          <div className={cx("sub-question-box")}>
            {selectedQuestion?.subQuestions.map((subQuestion, index) => (
              <div key={subQuestion.id} className={cx("sub-question-item")}>
                <div className={cx("sub-question-content")}>
                  <span className={cx("question-order")}>{index + 1}: </span>
                  <span className={cx("question-content")}>{subQuestion.content}</span>
                </div>
                <div className={cx("sub-question-answers")}>
                  {subQuestion.answers.map((answer) => (
                    <div key={answer.id} className={cx("answer-item")}>
                      <span className={cx("answer-order")}>
                        <Radio checked={answer.isCorrect} disabled />
                      </span>
                      <span className={cx("answer-content")}>{answer.answerContent}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalCustom>
  );
};
export default ModalShowQuestionDetail;
