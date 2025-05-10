import { GradeTargetLabels } from "@/constants/GradeTargets";
import { IFeedbackDetail } from "@/types/gradingFeedback/GradingFeedbackType";
import classNames from "classnames/bind";
import style from "./GradeFeedback.module.scss";
const cx = classNames.bind(style);

interface IGradeFeedbackProps {
  feedback: IFeedbackDetail | null;
  skill: string;
}
const GradeFeedback = ({ feedback, skill }: IGradeFeedbackProps) => {
  return (
    <div className={cx("feedback-content")}>
      <div className={cx("grade-comment-item")}>
        <h5 className={cx("item-title")}>1. Nhận xét chung:</h5>
        <ul className={cx("list-comment")}>
          {feedback?.overall_feedback?.map((item, index) =>
            item?.trim() === "" ? null : (
              <li key={index} className={cx("comment-item")}>
                - {item}
              </li>
            )
          )}
        </ul>
        <h5 className={cx("score-title")}>
          {"=>  "}Cho điểm: <span>{feedback?.score} / 10.0 điểm</span>
        </h5>
      </div>
      {feedback?.feedbackDetail?.map((item, index) => (
        <div className={cx("grade-comment-item", "mt-10")}>
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
              {feedback?.feedbackDetail && feedback?.feedbackDetail.length + 2}.
              Bài viết sau khi được chỉnh sửa:
            </h5>
            <div className={cx("corrected-essay")}>
              {feedback?.corrected_essay?.map((paragraph, index) => (
                <p key={index} className={cx("corrected-paragraph")}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default GradeFeedback;
