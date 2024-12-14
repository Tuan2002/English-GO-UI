/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
const cx = classNames.bind(style);

const SpeakingQuestion = () => {
  const { questionResult } = useSelector((state: RootState) => state.examStore);
  console.log(questionResult);
  return (
    <div className={cx("speaking-wrapper")}>
      {questionResult?.results?.map((result) => (
        <div key={result.id} className='speaking-result'>
          <audio controls className='full-width mt-10 mb-10'>
            <source src={result.answer && result.answer.trim() && result.answer} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};
export default SpeakingQuestion;
