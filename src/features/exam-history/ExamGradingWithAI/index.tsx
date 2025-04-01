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
const cx = classNames.bind(style);
const ExamGradingWithAI = () => {
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") as "writing" | "speaking";
  const { examId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { listQuestionLevel, selectedQuestionLevel, selectedQuestion } = useSelector((state: RootState) => state.gradingStore);

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
  }, [selectedQuestion?.gradeFeedback?.id, selectedQuestion?.gradeFeedback?.feedback]);
  console.log("feedback", feedback);
  return (
    <CardScroll showBackButton cardHeader={`Chấm điểm bài thi ${skill === "speaking" ? "nói" : "viết"} với AI`}>
      <div className={cx("exam-grading-with-ai")}>
        <div className={cx("header-box")}>
          <Select
            className='full-width'
            style={{ maxWidth: 350 }}
            showSearch
            value={selectedQuestionLevel}
            onChange={(value) => handleQuestionLevelChange(value)}
            placeholder='Chọn bài thi của bạn'
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
                    {"=>  "}Cho điểm: {feedback?.score} / 10.0 điểm
                  </h5>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>2. Về ngữ pháp: - {feedback?.grammar?.score} / 2.0 điểm</h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.grammar?.feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>3. Về từ vựng trong bài: - {feedback?.vocabulary?.score} / 2.0 điểm</h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.vocabulary?.feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>
                    4. Về mức độ hoàn thành yêu cầu của đề tài: - {feedback?.task_achievement?.score} / 2.0 điểm
                  </h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.task_achievement?.feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>
                    5. Về tính mạch lạc của bài viết: - {feedback?.coherence?.score} / 2.0 điểm
                  </h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.coherence?.feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>
                    6. Về mức độ phức tạp trong câu: - {feedback?.sentence_complexity?.score} / 2.0 điểm
                  </h5>
                  <ul className={cx("list-comment")}>
                    {feedback?.sentence_complexity?.feedback?.map((item, index) => (
                      <li key={index} className={cx("comment-item")}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cx("grade-comment-item", "mt-10")}>
                  <h5 className={cx("item-title")}>7. Bài viết sau khi được chỉnh sửa:</h5>
                  <div className={cx("corrected-essay")}>
                    {feedback?.corrected_essay?.split("\n").map((paragraph, index) => (
                      <p key={index} className={cx("corrected-paragraph")}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </CardScroll>
  );
};

export default ExamGradingWithAI;
