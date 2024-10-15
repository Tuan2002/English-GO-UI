/* eslint-disable @typescript-eslint/no-explicit-any */
import CardCustom from "@/components/Card";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import { RootState } from "@/stores";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import style from "./CreateQuestion.module.scss";
import classNames from "classnames/bind";
import ModalImportQuestion from "./ModalImportQuestion";
import QuestionDetail from "../components/QuestionDetail";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import ButtonDelete from "@/components/Button/ButtonDelete";
import ModalSaveQuestion from "../components/ModalSaveQuestion";
import { IQuestionDetail } from "@/types/question/QuestionTypes";
import { toast } from "react-toastify";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);
const CreateQuestion = () => {
  const { levelId, skillId, categoryId } = useParams();
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  const { currentLevel } = useSelector((state: RootState) => state.levelStore);
  const { currentCategory } = useSelector((state: RootState) => state.categoryStore);
  const { listCreateQuestions, isSubmitting } = useSelector((state: RootState) => state.questionStore);
  const [attachedFile, setAttachedFile] = useState<{ [key: string]: File } | undefined>();
  const dispatch = useDispatch();
  const handleClickBtnCreateQuestion = () => {
    dispatch(QuestionActions.changeActionModal("create"));
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch(QuestionActions.changeIsImporting(true));
    dispatch(
      QuestionActions.initSelectedQuestion({
        skillId: skillId ?? "",
        levelId: levelId ?? "",
        categoryId: categoryId ?? "",
        subQuestionNumber: currentLevel?.subQuestionNumber ?? 0,
      })
    );
  };
  const handleClickBtnImportQuestion = () => {
    dispatch(QuestionActions.changeOpenModalImportQuestion(true));
  };
  const handleUpdateQuesiton = (question: IQuestionDetail) => {
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch(QuestionActions.changeActionModal("update"));
    dispatch(QuestionActions.changeIsImporting(true));
    dispatch(QuestionActions.setSelectedQuestion({ question, subQuestionNumber: currentLevel?.subQuestionNumber ?? 0 }));
  };
  const handleConfirmDelete = (questionId: string) => {
    const newListCreateQuestions = listCreateQuestions?.filter((question) => question.id !== questionId);
    dispatch(QuestionActions.changeListCreateQuestions(newListCreateQuestions));
  };
  const handleChooseFile = (questionId: string, file: File) => {
    setAttachedFile({ ...attachedFile, [questionId]: file });
  };
  const handleClickBtnSaveQuestion = async () => {
    if (listCreateQuestions?.length === 0) {
      toast.error("Please create question before save");
      return;
    }
    let checkError = false;
    const listQuestionAfterCheck = listCreateQuestions?.map((question) => {
      const selectedQuestion = { ...question };
      if (!selectedQuestion?.questionContent || !selectedQuestion?.questionContent.trim()) {
        checkError = true;
        selectedQuestion.error = "Question content is required";
        return selectedQuestion;
      }
      if (!selectedQuestion?.subQuestions || selectedQuestion.subQuestions.length !== currentLevel?.subQuestionNumber) {
        checkError = true;
        selectedQuestion.error = `Please enter ${currentLevel?.subQuestionNumber} sub questions for level ${currentLevel?.displayName} of ${currentSkill?.displayName}`;
        return selectedQuestion;
      }
      const checkSubQuestionContent = selectedQuestion.subQuestions.some(
        (subQuestion) => !subQuestion.content || subQuestion.content.trim() === ""
      );
      if (checkSubQuestionContent) {
        checkError = true;
        selectedQuestion.error = "Please enter all sub question content";
        return selectedQuestion;
      }
      const checkAnswerContent = selectedQuestion.subQuestions.some((subQuestion) =>
        subQuestion.answers.some((answer) => !answer.answerContent || answer.answerContent.trim() === "")
      );
      if (checkAnswerContent) {
        checkError = true;
        selectedQuestion.error = "Please enter all answer content";
        return selectedQuestion;
      }
      const checkCorrectAnswer = selectedQuestion.subQuestions.some((subQuestion) => !subQuestion.correctAnswer);
      if (checkCorrectAnswer) {
        checkError = true;
        selectedQuestion.error = "Please choose one correct answer for each sub question";
        return selectedQuestion;
      }
      if (skillId === "listening" && (!selectedQuestion?.attachedFile || !selectedQuestion.attachedFile?.trim())) {
        checkError = true;
        selectedQuestion.error = "Listening question must have audio file";
        return selectedQuestion;
      }
      selectedQuestion.error = undefined;
      return selectedQuestion;
    });
    if (checkError) {
      dispatch(QuestionActions.changeListCreateQuestions(listQuestionAfterCheck));
      return;
    }

    dispatch(QuestionActions.changeIsSubmitting(true));
    const audioFileUrl: {
      [key: string]: string;
    } = {};
    if (attachedFile) {
      const uploader = Object.keys(attachedFile).map((key) => {
        if (!listQuestionAfterCheck.find((question) => question.id === key)) {
          return;
        }
        const file = attachedFile[key];
        return uploadService.uploadAnAudio(file, CloudPresets.AUDIO).then((res) => {
          return {
            questionId: key,
            audioUrl: res.data.secure_url,
          };
        });
      });
      const data = await Promise.all(uploader);
      data.forEach((item) => {
        if (item) {
          audioFileUrl[item.questionId] = item.audioUrl;
        }
      });
    }
    listQuestionAfterCheck.map((question) => {
      question.attachedFile = audioFileUrl[question.id];
      return question;
    });
    dispatch<any>(QuestionActions.createNewQuestion(listQuestionAfterCheck)).then(() => {
      window.history.back();
    });
  };
  useEffect(() => {
    dispatch(QuestionActions.changeListCreateQuestions([]));
  }, []);
  useEffect(() => {
    dispatch<any>(LevelActions.getLevelById(levelId ?? ""));
    dispatch<any>(SkillActions.getSkillById(skillId ?? ""));
    dispatch<any>(CategoryAction.getCategoryById(categoryId ?? ""));
  }, [levelId, skillId, categoryId, dispatch]);

  return (
    <CardCustom
      showBackButton
      title={`${currentSkill?.displayName} / ${currentLevel?.displayName} / ${currentCategory?.name}`}
      fullHeight
    >
      <div className={cx("create-question-wrapper")}>
        <div className='d-flex justify-content-end align-items-center'>
          <div className='d-flex justify-content-end'>
            {listCreateQuestions?.length > 0 && (
              <Button loading={isSubmitting} onClick={handleClickBtnSaveQuestion} type='primary' className='ml-10'>
                Save
              </Button>
            )}
            <Button onClick={handleClickBtnImportQuestion} type='primary' className='ml-10'>
              Import Question
            </Button>
            <Button onClick={handleClickBtnCreateQuestion} type='primary' className='ml-10'>
              Create Question
            </Button>
          </div>
        </div>
        <div className='mt-10'>
          {listCreateQuestions?.length > 0 &&
            listCreateQuestions.map((question, index) => (
              <div key={question.id} className={cx("question-item-wrapper", { "question-error": question.error })}>
                <div className={cx("question-header")}>
                  <span className={cx("question-title")}>Question {index + 1}</span>
                  <div className={cx("action-box")}>
                    {question?.error && <div className={cx("error")}>{question.error}</div>}
                    <div className={cx("action")}>
                      <ButtonUpdate onClick={() => handleUpdateQuesiton(question)} />
                      <ButtonDelete
                        confirmTitle='Are you sure you want to delete this question?'
                        onConfirmDelete={() => handleConfirmDelete(question.id)}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("question-body", "scrollbar")}>
                  <div className={cx("question-content")}>
                    <QuestionDetail question={question} />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div>
          <ModalImportQuestion />
          <ModalSaveQuestion onChangeAudioFile={handleChooseFile} />
        </div>
      </div>
    </CardCustom>
  );
};
export default CreateQuestion;
