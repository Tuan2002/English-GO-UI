import CardScroll from "@/components/CardScroll";
import HTMLDisplay from "@/components/HtmlDisplay";
import { AppDispatch, RootState } from "@/stores";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { IFeedbackDetail } from "@/types/gradingFeedback/GradingFeedbackType";
import { Select } from "antd";
import classNames from "classnames/bind";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import style from "./ExamGradingWithAI.module.scss";
import { GradeTargetLabels } from "@/constants/GradeTargets";
const cx = classNames.bind(style);
const ExamGradingWithAI = () => {
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") as "writing" | "speaking";
  const { examId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { listQuestionLevel, selectedQuestionLevel, selectedQuestion } =
    useSelector((state: RootState) => state.gradingStore);

  const handleQuestionLevelChange = (value: string) => {
    dispatch(GradingActions.setSelectedQuestionLevel(value));
  };
  useEffect(() => {
    if (!examId || !skill) {
      return;
    }
    dispatch(GradingActions.getGradingFeedbackWithAI({ examId, skill }));
  }, [dispatch, examId, skill]);
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
  }, [
    selectedQuestion?.gradeFeedback?.id,
    selectedQuestion?.gradeFeedback?.feedback,
  ]);
  console.log("feedback", feedback);
  return (
    <CardScroll
      showBackButton
      cardHeader={`Chấm điểm bài thi ${
        skill === "speaking" ? "nói" : "viết"
      } với AI`}
    >
      <div className={cx("exam-grading-with-ai")}>
        <div className={cx("header-box")}>
          <Select
            className="full-width"
            style={{ maxWidth: 350 }}
            showSearch
            value={selectedQuestionLevel}
            onChange={(value) => handleQuestionLevelChange(value)}
            placeholder="Chọn bài thi của bạn"
            // filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={listQuestionLevel}
          />
        </div>
        {selectedQuestion && (
          <>
            <div className={cx("box-item", "question-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Đề bài</span>
              </div>
              <div className={cx("question-description")}>
                {selectedQuestion.question.description}
              </div>
              <div className={cx("question-content")}>
                <HTMLDisplay
                  htmlContent={selectedQuestion.question?.questionContent ?? ""}
                />
              </div>
              <div className={cx("question-note")}>
                {selectedQuestion.question.questionNote}
              </div>
            </div>
            <div className={cx("box-item", "answer-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Câu trả lời</span>
              </div>
              <div className={cx("answer-content")}>
                <HTMLDisplay htmlContent={selectedQuestion.results[0].answer} />
              </div>
            </div>
            <div className={cx("box-item", "feedback-box")}>
              <div className={cx("header-title")}>
                <span className={cx("title-text")}>Phản hồi từ AI</span>
              </div>
              <div className={cx("feedback-content")}>
                <div className={cx("grade-comment-item")}>
                  <h5 className={cx("item-title")}>1. Nhận xét chung:</h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.overall_feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                  <h5 className={cx("score-title")}>
                    {"=>  "}Cho điểm: <span>{feedback?.score} / 10.0 điểm</span>
                  </h5>
                </div>
                {feedback?.feedbackDetail?.map((item, index) => (
                  <div
                    key={index}
                    className={cx("grade-comment-item", "mt-10")}
                  >
                    <h5 className={cx("item-title")}>
                      {index + 2}. {GradeTargetLabels[item.title]}
                    </h5>
                    <ul className={cx("list-comment")}>
                      {item.feedback?.map((item, index) =>
                        item?.trim() === "" ? null : (
                          <li key={index} className={cx("comment-item")}>
                            - {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
                {skill === "writing" &&
                  feedback?.corrected_essay &&
                  feedback?.corrected_essay?.length > 0 && (
                    <div className={cx("grade-comment-item", "mt-10")}>
                      <h5 className={cx("item-title")}>
                        {feedback?.feedbackDetail &&
                          feedback?.feedbackDetail.length + 2}
                        . Bài viết sau khi được chỉnh sửa:
                      </h5>
                      <div className={cx("corrected-essay")}>
                        {typeof feedback?.corrected_essay === "object" &&
                          feedback?.corrected_essay?.map((paragraph, index) => (
                            <p
                              key={index}
                              className={cx("corrected-paragraph")}
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </CardScroll>
  );
};

export default ExamGradingWithAI;
