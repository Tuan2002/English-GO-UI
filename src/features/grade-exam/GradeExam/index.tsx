import HTMLDisplay from "@/components/HtmlDisplay";
import { AppDispatch, RootState } from "@/stores";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { IFeedbackDetail, IGradeQuestionWithPersonRequest } from "@/types/gradingFeedback/GradingFeedbackType";
import { Button, Select } from "antd";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./GradeExam.module.scss";
import GradeExamForm from "./GradeExamForm";
import GradeFeedback from "./GradeFeedback";
import CardCustom from "@/components/Card";
import EXAM_SKILLS from "@/constants/ExamSkills";
const cx = classNames.bind(style);

const gradeFeedbackInitialState: IFeedbackDetail = {
  overall_feedback: [],
  score: "0",
  corrected_essay: [],
  feedbackDetail: [],
};

const ExamGradingWithAI = () => {
  const { registeredGradeExamId } = useParams();
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") as "writing" | "speaking";
  const dispatch: AppDispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const { listQuestionLevel, selectedQuestionLevel, selectedQuestion, isSubmiting, loading } = useSelector(
    (state: RootState) => state.gradingStore
  );
  const [isGradingQuestion, setIsGradingQuestion] = useState(false);

  const [gradeFeedbackValue, setGradeFeedbackValue] = useState<IFeedbackDetail>(gradeFeedbackInitialState);

  const handleQuestionLevelChange = (value: string) => {
    if (isGradingQuestion) {
      toast.warning("Bạn đang chấm bài thi này, vui lòng hoàn thành trước khi chọn bài thi khác");
      return;
    }
    dispatch(GradingActions.setSelectedQuestionLevel(value));
  };

  useEffect(() => {
    if (!registeredGradeExamId) {
      return;
    }
    dispatch(GradingActions.getGradingFeedbackWithPerson(registeredGradeExamId));
  }, [dispatch, registeredGradeExamId]);

  const feedback: IFeedbackDetail | null = useMemo(() => {
    const feedback = selectedQuestion?.gradeFeedback?.feedback;
    if (!selectedQuestion?.gradeFeedback?.id || !feedback) {
      return null;
    }
    let parsedFeedback = null;
    try {
      parsedFeedback = JSON.parse(feedback);
    } catch (error) {
      console.error("Error parsing feedback JSON", error);
      parsedFeedback = {};
    }
    return parsedFeedback;
  }, [selectedQuestion?.gradeFeedback?.id, selectedQuestion?.gradeFeedback?.feedback]);

  const changeGradeFeedbackValue = (value: IFeedbackDetail) => {
    setGradeFeedbackValue(value);
  };

  const handleCancelUpdate = () => {
    setIsGradingQuestion(false);
    if (feedback) {
      setGradeFeedbackValue(feedback);
    } else {
      setGradeFeedbackValue(gradeFeedbackInitialState);
    }
  };

  const handleSaveUpdate = () => {
    const feedbackData: IGradeQuestionWithPersonRequest = {
      levelId: selectedQuestionLevel ?? "",
      skillId: skill,
      examId: selectedQuestion?.examId ?? "",
      examinerId: currentUser?.id ?? "",
      score: gradeFeedbackValue.score,
      feedback: JSON.stringify(gradeFeedbackValue),
      registerGradeExamId: registeredGradeExamId ?? "",
    };
    dispatch(GradingActions.gradeQuestionWithPerson(feedbackData)).then((res) => {
      if (res.payload.success) {
        toast.success("Chấm điểm thành công");
        setIsGradingQuestion(false);
        setGradeFeedbackValue(gradeFeedbackInitialState);
        dispatch(GradingActions.getGradingFeedbackWithPerson(registeredGradeExamId ?? ""));
      }
    });
  };

  const handleStartUpdate = () => {
    if (!registeredGradeExamId) {
      return;
    }
    setIsGradingQuestion(true);
    if (feedback) {
      setIsGradingQuestion(true);
      setGradeFeedbackValue(feedback);
    } else {
      setGradeFeedbackValue(gradeFeedbackInitialState);
    }
  };

  return (
    <CardCustom showBackButton fullHeight loading={isSubmiting || loading} cardHeader={`Chấm điểm bài thi `}>
      <div className={cx("exam-grading-with-ai")}>
        <div className={cx("header-box")}>
          <Select
            className='full-width'
            style={{ maxWidth: 350 }}
            showSearch
            value={selectedQuestionLevel}
            onChange={(value) => handleQuestionLevelChange(value)}
            placeholder='Chọn bài thi của bạn'
            options={listQuestionLevel}
          />
        </div>
        {selectedQuestion && (
          <>
            <div className={cx("box-item", "question-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Đề bài</span>
              </div>
              <div className={cx("question-description")}>{selectedQuestion.question.description}</div>
              <div className={cx("question-content")}>
                <HTMLDisplay htmlContent={selectedQuestion.question?.questionContent ?? ""} />
              </div>
              <div className={cx("question-note")}>{selectedQuestion.question.questionNote}</div>
            </div>
            <div className={cx("box-item", "answer-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Câu trả lời</span>
              </div>
              {selectedQuestion.question?.skillId === EXAM_SKILLS.WRITING ? (
                <div className={cx("answer-content")}>
                  <HTMLDisplay htmlContent={selectedQuestion.results[0].answer} />
                </div>
              ) : (
                <div className={cx("speaking-answer-content")}>
                  {selectedQuestion.results[0] && selectedQuestion.results[0].answer?.trim() !== "" ? (
                    <audio style={{ width: "100%", maxWidth: 500 }} className={cx("speaking-audio")} controls>
                      <source src={selectedQuestion.results[0].answer} type='audio/mpeg' />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  ) : (
                    <div className={cx("no-answer")}>
                      <span>Thí sinh chưa thực hiện câu hỏi này!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={cx("box-item", "feedback-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Nhận xét về câu trả lời</span>
              </div>
              <div className='mt-10 mb-10 d-flex justify-content-center gap-10'>
                {isGradingQuestion ? (
                  <>
                    <Button onClick={handleCancelUpdate} type='primary' danger>
                      Huỷ bỏ
                    </Button>
                    <Button onClick={handleSaveUpdate} type='primary'>
                      Lưu nhận xét
                    </Button>
                  </>
                ) : feedback ? (
                  <Button onClick={handleStartUpdate} type='primary'>
                    Chỉnh sửa nhận xét
                  </Button>
                ) : null}
              </div>
              {!feedback && !isGradingQuestion && (
                <div className={cx("no-feedback")}>
                  <span>Câu hỏi này chưa được chấm!</span>
                  <Button onClick={() => setIsGradingQuestion(true)} type='primary'>
                    Chấm bài
                  </Button>
                </div>
              )}
              {feedback && !isGradingQuestion && <GradeFeedback skill='writing' feedback={feedback} />}
              {isGradingQuestion && (
                <GradeExamForm
                  changeGradeFeedbackValue={changeGradeFeedbackValue}
                  skill={skill}
                  gradeFeedbackValue={gradeFeedbackValue}
                />
              )}
            </div>
          </>
        )}
      </div>
    </CardCustom>
  );
};

export default ExamGradingWithAI;
