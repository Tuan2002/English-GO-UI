import { useSelector } from "react-redux";
import style from "./LeftBox.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import HTMLDisplay from "@/components/HtmlDisplay";
import AudioPlayer from "@/components/AudioPlayer";
import { Skeleton } from "antd";
const cx = classNames.bind(style);
const LeftBox = () => {
  const { selectedQuestion } = useSelector((state: RootState) => state.examStore);
  console.log("selectedQuestion", selectedQuestion);
  return (
    <div className={cx("left-box-wrapper", "scrollbar")}>
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
              <AudioPlayer disabledPause disabledChangeProgress disabledRepeat audioSrc={selectedQuestion?.attachedFile} />
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
