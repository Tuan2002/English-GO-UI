import ModalCustom from "@/components/Modal";
import TextEditor from "@/components/TextEditor";
import { useEffect, useState } from "react";
import style from "../CategoryDetail.module.scss";
import classNames from "classnames/bind";
import { Input, Radio } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { IQuestionData, ISubQuestion, ISubQuestionAnswer } from "@/types/question/QuestionTypes";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import UploadFileAudio from "@/components/UploadFileAudio";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

const ModalSaveQuestion = () => {
  const [questionContent, setQuestionContent] = useState("");
  const [question, setQuestion] = useState<IQuestionData>();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const { categoryId, skillId, levelId } = useParams();
  const { currentLevel } = useSelector((state: RootState) => state.levelStore);
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChangeAudioFile = (file: File) => {
    setAudioFile(file);
  };
  useEffect(() => {
    if (categoryId && skillId && levelId && currentLevel?.subQuestionNumber) {
      const questionId = uuidv4();
      const subQuestions: ISubQuestion[] = [];
      for (let i = 0; i < currentLevel.subQuestionNumber; i++) {
        const subQuestionId = uuidv4();
        const subQuestionAnswers: ISubQuestionAnswer[] = [];
        for (let j = 0; j < 4; j++) {
          const answer: ISubQuestionAnswer = {
            id: uuidv4(),
            answerContent: "",
            isCorrect: false,
            subQuestionId,
            order: j,
          };
          subQuestionAnswers.push(answer);
        }
        subQuestions.push({
          id: subQuestionId,
          content: "",
          subQuestionAnswers,
          correctAnswer: undefined,
          questionId,
          order: i,
        });
      }
      const newQuestion: IQuestionData = {
        id: questionId,
        categoryId,
        skillId,
        levelId,
        questionContent: "",
        questionDescription: "",
        questionNote: "",
        attachedFile: skillId === "listening" ? "" : undefined,
        isDeleted: false,
        isActive: true,
        subQuestions,
      };
      setQuestion(newQuestion);
    }
  }, [categoryId, skillId, levelId, currentLevel?.subQuestionNumber]);
  const handleChangeQuestionData = (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
    if (question) {
      setQuestion({ ...question, [attribute]: e.target.value });
    }
  };
  const handleChangeSubQuestion = (e: React.ChangeEvent<HTMLInputElement>, subQuestionId: string, attribute: string) => {
    if (question) {
      const subQuestions = question?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          return { ...subQuestion, [attribute]: e.target.value };
        }
        return subQuestion;
      });
      setQuestion({ ...question, subQuestions });
    }
  };
  const handleChangeSubQuestionAnswer = (e: React.ChangeEvent<HTMLInputElement>, subQuestionId: string, answerId: string) => {
    if (question) {
      const subQuestions = question?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          const subQuestionAnswers = subQuestion.subQuestionAnswers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, answerContent: e.target.value };
            }
            return answer;
          });
          return { ...subQuestion, subQuestionAnswers };
        }
        return subQuestion;
      });
      setQuestion({ ...question, subQuestions });
    }
  };
  const handleChangeCorrectAnswer = (subQuestionId: string, answerId: string) => {
    if (question) {
      const subQuestions = question?.subQuestions?.map((subQuestion) => {
        if (subQuestion.id === subQuestionId) {
          const subQuestionAnswers = subQuestion.subQuestionAnswers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, isCorrect: true };
            }
            return { ...answer, isCorrect: false };
          });
          return { ...subQuestion, subQuestionAnswers, correctAnswer: answerId };
        }
        return subQuestion;
      });
      setQuestion({ ...question, subQuestions });
    }
  };
  const handleSaveQuestion = async () => {
    if (!questionContent || questionContent.trim() === "") {
      toast.warning("Question content is required");
      return;
    }
    if (!question?.subQuestions || question.subQuestions.length !== currentLevel?.subQuestionNumber) {
      toast.warning("Number of sub questions is not correct");
      return;
    }
    const checkSubQuestionContent = question.subQuestions.some(
      (subQuestion) => !subQuestion.content || subQuestion.content.trim() === ""
    );
    if (checkSubQuestionContent) {
      toast.warning("Please enter all sub question content");
      return;
    }
    const checkAnswerContent = question.subQuestions.some((subQuestion) =>
      subQuestion.subQuestionAnswers.some((answer) => !answer.answerContent || answer.answerContent.trim() === "")
    );
    if (checkAnswerContent) {
      toast.warning("Please enter all answer content");
      return;
    }
    const checkCorrectAnswer = question.subQuestions.some((subQuestion) => !subQuestion.correctAnswer);
    if (checkCorrectAnswer) {
      toast.warning("Please choose one correct answer for each sub question");
      return;
    }

    console.log(question);
  };
  return (
    <ModalCustom onOK={handleSaveQuestion} scrollBody open={true} onCancel={handleCancel} modalTitle='Create New Question'>
      <div className={cx("question-form")}>
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Description</span>
          <Input
            onChange={(e) => handleChangeQuestionData(e, "questionDescription")}
            value={question?.questionDescription}
            placeholder='Enter question description...'
          />
        </div>
        {skillId === "listening" && (
          <div className={cx("form-item")}>
            <span className={cx("form-label")}>File Attach</span>
            <UploadFileAudio onChangeAudio={handleChangeAudioFile} />
          </div>
        )}
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Content</span>
          <TextEditor height={350} value={questionContent} onChange={setQuestionContent} />
        </div>
        <div className={cx("form-item")}>
          <span className={cx("form-label")}>Question Note</span>
          <Input
            onChange={(e) => handleChangeQuestionData(e, "questionNote")}
            value={question?.questionNote}
            placeholder='Enter question note...'
          />
        </div>

        {question?.subQuestions && (
          <div className={cx("sub-questions")}>
            <div className={cx("sub-question-title")}>Sub Questions</div>
            <div className={cx("sub-question-list")}>
              {question.subQuestions.length > 0 &&
                question.subQuestions.map((subQuestion, index) => (
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
                        {subQuestion.subQuestionAnswers.map((answer) => (
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
