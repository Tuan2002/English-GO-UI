import { useMemo } from "react";
import { Select } from "antd";
import style from "./ResultTab.module.scss";
import classNames from "classnames/bind";
import HTMLDisplay from "@/components/HtmlDisplay";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { IFeedbackDetail } from "@/types/gradingFeedback/GradingFeedbackType";
import GradeFeedback from "../GradeFeedback";
import EXAM_SKILLS from "@/constants/ExamSkills";
const cx = classNames.bind(style);

const ResultTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const { listQuestionLevel, selectedQuestionLevel, selectedQuestion } =
    useSelector((state: RootState) => state.gradingStore);

  const handleQuestionLevelChange = (value: string) => {
    dispatch(GradingActions.setSelectedQuestionLevel(value));
  };
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
  console.log("selectedQuestion", selectedQuestion);
  return (
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
            {selectedQuestion.question?.skill?.id === EXAM_SKILLS.WRITING ? (
              <div className={cx("answer-content")}>
                <HTMLDisplay htmlContent={selectedQuestion.results[0].answer} />
              </div>
            ) : (
              <div className={cx("speaking-answer-content")}>
                {selectedQuestion.results[0] &&
                selectedQuestion.results[0].answer?.trim() !== "" ? (
                  <audio
                    style={{ width: "100%", maxWidth: 500 }}
                    className={cx("speaking-audio")}
                    controls
                  >
                    <source
                      src={selectedQuestion.results[0].answer}
                      type="audio/mpeg"
                    />
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
              <span className={cx("title-text")}>Phản hồi từ người chấm</span>
            </div>
            {feedback ? (
              <GradeFeedback
                feedback={feedback}
                skill={selectedQuestion.question.skillId}
              />
            ) : (
              <div className={cx("no-feedback")}>
                <span>Bài này chưa được chấm</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultTab;
