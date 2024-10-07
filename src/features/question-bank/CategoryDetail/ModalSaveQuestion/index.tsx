/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalCustom from "@/components/Modal";
import TextEditor from "@/components/TextEditor";
import { useState } from "react";
import style from "../CategoryDetail.module.scss";
import classNames from "classnames/bind";
import { Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useParams } from "react-router-dom";
import UploadFileAudio from "@/components/UploadFileAudio";
import { toast } from "react-toastify";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);

const ModalSaveQuestion = () => {
  const dispatch = useDispatch();
  const { openModalSaveQuestion, selectedQuestion, actionModal, isSubmitting } = useSelector(
    (state: RootState) => state.questionStore
  );
  const { currentLevel } = useSelector((state: RootState) => state.levelStore);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const { categoryId, skillId, levelId } = useParams();
  const handleCancel = () => {
    dispatch(QuestionActions.changeOpenModalSaveQuestion(false));
    dispatch(QuestionActions.changeIsSubmitting(false));
    dispatch(
      QuestionActions.initSelectedQuestion({ categoryId, skillId, levelId, subQuestionNumber: currentLevel?.subQuestionNumber })
    );
    dispatch(QuestionActions.changeActionModal("create"));
  };
  const handleChangeAudioFile = (file: File) => {
    setAudioFile(file);
  };
  // useEffect(() => {
  //   if (categoryId && skillId && levelId && currentLevel?.subQuestionNumber) {
  //     dispatch(
  //       QuestionActions.initSelectedQuestion({ categoryId, skillId, levelId, subQuestionNumber: currentLevel.subQuestionNumber })
  //     );
  //   }
  // }, [categoryId, skillId, levelId, currentLevel?.subQuestionNumber, dispatch, openModalSaveQuestion]);
  const handleChangeQuestionData = (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
    if (selectedQuestion) {
      dispatch(QuestionActions.changeSelectedQuestion({ ...selectedQuestion, [attribute]: e.target.value }));
    }
  };
  const handleChangeQuestionContent = (content: string) => {
    if (selectedQuestion) {
      dispatch(QuestionActions.changeSelectedQuestion({ ...selectedQuestion, questionContent: content }));
    }
  };
  const handleChangeSubQuestion = (e: React.ChangeEvent<HTMLInputElement>, subQuestionId: string, attribute: string) => {
    if (selectedQuestion) {
      const subQuestions = selectedQuestion?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          return { ...subQuestion, [attribute]: e.target.value };
        }
        return subQuestion;
      });
      dispatch(QuestionActions.changeSelectedQuestion({ ...selectedQuestion, subQuestions }));
    }
  };
  const handleChangeSubQuestionAnswer = (e: React.ChangeEvent<HTMLInputElement>, subQuestionId: string, answerId: string) => {
    if (selectedQuestion) {
      const subQuestions = selectedQuestion?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          const answers = subQuestion.answers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, answerContent: e.target.value };
            }
            return answer;
          });
          return { ...subQuestion, answers };
        }
        return subQuestion;
      });
      dispatch(QuestionActions.changeSelectedQuestion({ ...selectedQuestion, subQuestions }));
    }
  };
  const handleChangeCorrectAnswer = (subQuestionId: string, answerId: string) => {
    if (selectedQuestion) {
      const subQuestions = selectedQuestion?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          const answers = subQuestion.answers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, isCorrect: true };
            }
            return { ...answer, isCorrect: false };
          });
          return { ...subQuestion, answers, correctAnswer: answerId };
        }
        return subQuestion;
      });
      dispatch(QuestionActions.changeSelectedQuestion({ ...selectedQuestion, subQuestions }));
    }
  };
  const handleSaveQuestion = async () => {
    if (!selectedQuestion?.questionContent || !selectedQuestion?.questionContent.trim()) {
      toast.warning("Question content is required");
      return;
    }
    if (!selectedQuestion?.subQuestions || selectedQuestion.subQuestions.length !== currentLevel?.subQuestionNumber) {
      toast.warning("Number of sub questions is not correct");
      return;
    }
    const checkSubQuestionContent = selectedQuestion.subQuestions.some(
      (subQuestion) => !subQuestion.content || subQuestion.content.trim() === ""
    );
    if (checkSubQuestionContent) {
      toast.warning("Please enter all sub question content");
      return;
    }
    const checkAnswerContent = selectedQuestion.subQuestions.some((subQuestion) =>
      subQuestion.answers.some((answer) => !answer.answerContent || answer.answerContent.trim() === "")
    );
    if (checkAnswerContent) {
      toast.warning("Please enter all answer content");
      return;
    }
    const checkCorrectAnswer = selectedQuestion.subQuestions.some((subQuestion) => !subQuestion.correctAnswer);
    if (checkCorrectAnswer) {
      toast.warning("Please choose one correct answer for each sub question");
      return;
    }
    const dataSave = {
      ...selectedQuestion,
    };
    dispatch(QuestionActions.changeIsSubmitting(true));
    try {
      if (audioFile) {
        const uploadAudio = await uploadService.uploadAnAudio(audioFile, CloudPresets.AUDIO);
        dataSave.attachedFile = uploadAudio.data.secure_url;
      }
    } catch {
      toast.error("Upload audio file failed");
      dispatch(QuestionActions.changeIsSubmitting(false));
      return;
    }
    if (skillId === "listening" && dataSave?.attachedFile === null) {
      toast.warning("Listening question must have audio file");
      return;
    }

    if (actionModal === "create") {
      dispatch<any>(QuestionActions.createNewQuestion(dataSave));
    } else {
      dispatch<any>(QuestionActions.updateQuestion(dataSave));
    }
  };
  return (
    <ModalCustom
      onOK={handleSaveQuestion}
      scrollBody
      open={openModalSaveQuestion}
      onCancel={handleCancel}
      isLoading={isSubmitting}
      modalTitle={actionModal === "create" ? "Create New Question" : "Update Question"}
    >
      <div className={cx("question-form")}>
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Description</span>
          <Input
            onChange={(e) => handleChangeQuestionData(e, "description")}
            value={selectedQuestion?.description}
            placeholder='Enter question description...'
          />
        </div>
        {skillId === "listening" && (
          <div className={cx("form-item")}>
            <span className={cx("form-label")}>File Attach</span>
            <UploadFileAudio defaultAudio={selectedQuestion?.attachedFile} onChangeAudio={handleChangeAudioFile} />
          </div>
        )}
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Content</span>
          <TextEditor height={350} value={selectedQuestion?.questionContent ?? ""} onChange={handleChangeQuestionContent} />
        </div>
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Note</span>
          <Input
            onChange={(e) => handleChangeQuestionData(e, "questionNote")}
            value={selectedQuestion?.questionNote}
            placeholder='Enter question note...'
          />
        </div>

        {selectedQuestion?.subQuestions && selectedQuestion.subQuestions.length > 0 && (
          <div className={cx("sub-questions")}>
            <div className={cx("sub-question-title")}>Sub Questions</div>
            <div className={cx("sub-question-list")}>
              {selectedQuestion.subQuestions.map((subQuestion, index) => (
                <div key={subQuestion.id} className={cx("sub-question-item")}>
                  <div className={cx("sub-question-content")}>
                    <span className={cx("sub-question-label")}>Question {index + 1}</span>
                    <Input
                      onChange={(e) => handleChangeSubQuestion(e, subQuestion.id, "content")}
                      value={subQuestion.content}
                      size='large'
                      placeholder='Enter sub question content...'
                    />
                  </div>
                  <Radio.Group
                    onChange={(e) => handleChangeCorrectAnswer(subQuestion.id, e.target.value)}
                    value={subQuestion.correctAnswer}
                    className='full-width'
                  >
                    <div className={cx("sub-question-answers")}>
                      {subQuestion.answers.map((answer) => (
                        <div key={answer.id} className={cx("answer-item")}>
                          <span className={cx("sub-question-label")}>
                            <Radio value={answer.id} />
                          </span>
                          <Input
                            onChange={(e) => handleChangeSubQuestionAnswer(e, subQuestion.id, answer.id)}
                            value={answer.answerContent}
                            placeholder='Enter answer content...'
                          />
                        </div>
                      ))}
                    </div>
                  </Radio.Group>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalCustom>
  );
};
export default ModalSaveQuestion;
