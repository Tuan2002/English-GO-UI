import { useDispatch, useSelector } from "react-redux";
import style from "./LeftBox.module.scss";
import classNames from "classnames/bind";
import { AppDispatch, RootState } from "@/stores";
import HTMLDisplay from "@/components/HtmlDisplay";
import AudioPlayer from "@/components/AudioPlayer";
import { Skeleton } from "antd";
import { useEffect, useRef } from "react";
import { ExamActions } from "@/stores/examStore/examReducer";

const cx = classNames.bind(style);

interface LeftBoxProps {
  isScroll?: boolean;
}
const LeftBox = ({ isScroll = true }: LeftBoxProps) => {
  const { selectedQuestion, listeningAudioStatus } = useSelector((state: RootState) => state.examStore);
  const dispatch: AppDispatch = useDispatch();

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
    const currentTime = listeningAudioStatusRef.current?.find((audio) => audio.questionId === selectedQuestion?.id)?.currentTime;
    if (currentTime !== undefined) {
      audioCurrentTimeRef.current = currentTime;
    }
  }, [listeningAudioStatus, selectedQuestion?.id]);

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
    <div className={cx("left-box-wrapper", { scrollbar: isScroll })}>
      {selectedQuestion?.id ? (
        <div className={cx("level-info")}>
          <span className={cx("level-name")}>{selectedQuestion?.level?.displayName}: </span>
          {selectedQuestion?.level?.description && <span className={cx("level-desc")}>{selectedQuestion.level.description}</span>}
        </div>
      ) : (
        <Skeleton.Input active block size='large' style={{ height: "40px" }} />
      )}
      <div className={cx("question-info")}>
        {selectedQuestion?.id ? (
          selectedQuestion?.description && (
            <div className={cx("question-description")}>
              <span>{selectedQuestion.description}</span>
            </div>
          )
        ) : (
          <Skeleton.Input active block size='large' style={{ height: "40px", margin: "10px 0" }} />
        )}
        <div className={cx("question-content")}>
          {selectedQuestion?.attachedFile &&
            (selectedQuestion?.id ? (
              <AudioPlayer
                audioSrc={selectedQuestion?.attachedFile}
                currentAudioTime={audioCurrentTimeRef.current} // Lấy từ useRef
                changeCurrentAudioTime={(time) => changeCurrentAudioTime(time, selectedQuestion.id)}
              />
            ) : (
              <Skeleton.Input active block size='large' style={{ height: "40px" }} />
            ))}
          {selectedQuestion?.id ? (
            <HTMLDisplay htmlContent={selectedQuestion?.questionContent ?? ""} />
          ) : (
            <>
              <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
              <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
              <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
              <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
            </>
          )}
        </div>
        {selectedQuestion?.id ? (
          selectedQuestion?.questionNote && (
            <div className={cx("question-note")}>
              <span>"{selectedQuestion.questionNote}"</span>
            </div>
          )
        ) : (
          <Skeleton.Input active block size='large' style={{ height: "40px", margin: "10px 0" }} />
        )}
      </div>
    </div>
  );
};

export default LeftBox;
