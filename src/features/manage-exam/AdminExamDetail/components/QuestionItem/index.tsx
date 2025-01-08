import { IExamQuestion, IResultOfQuestion } from "@/types/exam/ExamTypes";
import style from "./QuestionItem.module.scss";
import classNames from "classnames/bind";
import AudioPlayer from "@/components/AudioPlayer";
import { Skeleton } from "antd";
import HTMLDisplay from "@/components/HtmlDisplay";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { ExamActions } from "@/stores/examStore/examReducer";
import ListSubQuestion from "./ListSubQuestion";
import ResultOfWritingQuestion from "./ResultOfWritingQuestion";
import ResultOfSpeakingQuestion from "./ResultOfSpeakingQuestion";
const cx = classNames.bind(style);
interface QuestionItemProps {
  question: IExamQuestion;
  questionResult?: IResultOfQuestion;
  index: number;
}
const QuestionItem = ({ question, questionResult }: QuestionItemProps) => {
  console.log("QuestionItem render", questionResult);
  const dispatch: AppDispatch = useDispatch();
  const { listeningAudioStatus } = useSelector((state: RootState) => state.examStore);

  // Dùng useRef để lưu trữ giá trị mới nhất của listeningAudioStatus
  const listeningAudioStatusRef = useRef(listeningAudioStatus);
  // Cập nhật useRef mỗi khi listeningAudioStatus thay đổi
  useEffect(() => {
    listeningAudioStatusRef.current = listeningAudioStatus;
  }, [listeningAudioStatus]);

  // Sử dụng useRef thay vì useState để lưu currentTime
  const audioCurrentTimeRef = useRef<number>(0);

  // Cập nhật audioCurrentTime khi listeningAudioStatus thay đổi
  useEffect(() => {
    const currentTime = listeningAudioStatusRef.current?.find((audio) => audio.questionId === question?.id)?.currentTime;
    if (currentTime !== undefined) {
      audioCurrentTimeRef.current = currentTime;
    }
  }, [listeningAudioStatus, question?.id]);
  const changeCurrentAudioTime = (time: number, questionId: string) => {
    const newListeningAudioStatus = listeningAudioStatusRef.current?.map((audio) => {
      if (audio.questionId === questionId) {
        return { ...audio, currentTime: time };
      }
      return audio;
    });
    dispatch(ExamActions.changeListeningAudioStatus(newListeningAudioStatus));
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("question-info")}>
        {question?.id ? (
          <div className={cx("level-info", "text-justify")}>
            <span className={cx("level-name")}>{question?.level?.displayName}: </span>
            {question?.level?.description && <span className={cx("level-desc")}>{question.level.description}</span>}
          </div>
        ) : (
          <Skeleton.Input active block size='large' style={{ height: "40px" }} />
        )}
        <div className={cx("question-info")}>
          {question?.id ? (
            question?.description && (
              <div className={cx("question-description")}>
                <span>{question.description}</span>
              </div>
            )
          ) : (
            <Skeleton.Input active block size='large' style={{ height: "40px", margin: "10px 0" }} />
          )}
          <div className={cx("question-content")}>
            {question?.attachedFile &&
              (question?.id ? (
                <AudioPlayer
                  audioSrc={question?.attachedFile}
                  currentAudioTime={audioCurrentTimeRef.current} // Lấy từ useRef
                  changeCurrentAudioTime={(time) => changeCurrentAudioTime(time, question.id)}
                />
              ) : (
                <Skeleton.Input active block size='large' style={{ height: "40px" }} />
              ))}
            {question?.id ? (
              <HTMLDisplay htmlContent={question?.questionContent ?? ""} />
            ) : (
              <>
                <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
                <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
                <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
                <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
              </>
            )}
          </div>
          {question?.id ? (
            question?.questionNote && (
              <div className={cx("question-note")}>
                <span>"{question.questionNote}"</span>
              </div>
            )
          ) : (
            <Skeleton.Input active block size='large' style={{ height: "40px", margin: "10px 0" }} />
          )}
        </div>
      </div>
      <div className={cx("sub-question-box")}>
        <ListSubQuestion questionResult={questionResult} question={question} />
      </div>
      {question?.skill?.id === "writing" && (
        <div className=''>
          <ResultOfWritingQuestion questionResult={questionResult} />
        </div>
      )}
      {question?.skill?.id === "speaking" && (
        <div>
          <ResultOfSpeakingQuestion questionResult={questionResult} />
        </div>
      )}
    </div>
  );
};
export default QuestionItem;
