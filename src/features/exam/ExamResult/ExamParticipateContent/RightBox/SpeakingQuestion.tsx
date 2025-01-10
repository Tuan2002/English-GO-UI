import { useSelector } from "react-redux";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
const cx = classNames.bind(style);

const SpeakingQuestion = () => {
  const { questionResult } = useSelector((state: RootState) => state.examStore);

  // Generate a unique key for the audio element whenever the source changes
  const audioSrc = questionResult?.results[0]?.answer?.trim();

  return (
    <div className={cx("speaking-answer-box")}>
      <div className={cx("answer-title")}>
        <span>Kết quả bài nói:</span>
        {!audioSrc && <span className={cx("result-error")}>Bài nói chưa được thực hiện hoặc quá trình lưu bị lỗi</span>}
      </div>
      <div className={cx("speaking-input-box")}>
        <audio key={audioSrc} controls className={cx("audio-player")}>
          {audioSrc && <source src={audioSrc} type='audio/mpeg' />}
        </audio>
      </div>
    </div>
  );
};

export default SpeakingQuestion;
