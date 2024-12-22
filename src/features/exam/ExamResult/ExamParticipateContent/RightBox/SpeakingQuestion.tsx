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
    <div className={cx("speaking-wrapper")}>
      <div className='speaking-result'>
        {audioSrc ? (
          <audio
            key={audioSrc} // This forces the audio element to reload when the source changes
            controls
            className='full-width mt-10 mb-10'
          >
            <source src={audioSrc} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className='text-center'>
            <span className='text-center'>Bạn chưa thực hiện bài nghe này</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingQuestion;
