/* eslint-disable @typescript-eslint/no-explicit-any */
import SpeakingRecord from "@/components/SpeakingRecord";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

interface IPrepareRecordProps {
  startRecord: () => void;
}
interface IRecordingQuestionProps {
  stopRecord: (url: string) => void;
  totalTime?: number;
}
const PrepareRecord = ({ startRecord }: IPrepareRecordProps) => {
  const [timeCountDown, setTimeCountDown] = useState(60);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeCountDown) {
        setTimeCountDown(timeCountDown - 1);
      }
    }, 1000);
    if (timeCountDown == 0) {
      // Call api to submit skill
      startRecord();
      clearInterval(interval);
      return;
    }
    if (timeCountDown <= 5) {
      message.warning(`Hệ thống sẽ tự động ghi âm sau ${timeCountDown} giây nữa!`);
    }
    return () => clearTimeout(interval);
  }, [timeCountDown]);
  return (
    <div className={cx("prepare-record")}>
      <h5 className={cx("prepare-header")}>Đang trong thời gian chuẩn bị</h5>
      <h5 className={cx("prepare-header")}>Hệ thống sẽ tự động ghi âm sau</h5>
      <span className={cx("prepare-countdown")}>{timeCountDown}</span>
    </div>
  );
};
const RecordingQuestion = ({ stopRecord, totalTime = 60 }: IRecordingQuestionProps) => {
  const [timeCountDown, setTimeCountDown] = useState(totalTime);
  const speakingRecordRef = useRef<any>(null);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeCountDown) {
        setTimeCountDown(timeCountDown - 1);
      }
    }, 1000);
    if (timeCountDown == 0) {
      // Call api to submit skill
      if (speakingRecordRef.current) {
        speakingRecordRef.current.handleStopRecording();
      }
      clearInterval(interval);
      return;
    }
    if (timeCountDown <= 5) {
      message.warning(`Hệ thống sẽ tự động ghi âm sau ${timeCountDown} giây nữa!`);
    }
    return () => clearTimeout(interval);
  }, [timeCountDown]);

  const handleEndRecording = async (blob: Blob) => {
    try {
      // const audioUpload = await uploadService.uploadAnAudio(blob, CloudPresets.AUDIO);
      // if (audioUpload.success) {
      //   stopRecord(audioUpload.data.secure_url);
      // } else {
      //   toast.error("Có lỗi xảy ra khi tải file lên server");
      // }
    } catch {
      // handle error
      toast.error("Có lỗi xảy ra khi tải file lên server");
    }
  };
  useEffect(() => {
    if (speakingRecordRef.current) {
      speakingRecordRef.current.handleStartRecording();
    }
  }, []);
  return (
    <div className={cx("recording-box")}>
      <SpeakingRecord ref={speakingRecordRef} handleEndRecording={handleEndRecording} />
      <div className={cx("time-countdown")}>
        <span className={cx("minutes")}>
          {Math.floor(timeCountDown / 60) >= 0 ? `0${Math.floor(timeCountDown / 60)}`.slice(-2) : "00"}
        </span>
        <span className={cx("space")}>:</span>
        <span className={cx("seconds")}>{timeCountDown % 60 >= 0 ? `0${timeCountDown % 60}`.slice(-2) : "00"}</span>
      </div>
      <span>Hệ thống đang thu âm, hãy ghé sát micro để thu được chất lượng tốt nhất</span>
    </div>
  );
};

const SpeakingQuestion = () => {
  const [isPreparing, setIsPreparing] = useState(false);
  const startRecord = () => {
    setIsPreparing(false);
  };
  const stopRecord = (url: string) => {
    console.log("url", url);

    // upload file ở đây, dùng url để upload
  };
  // hết 1 level => lưu bài làm => chuyển sang bài tiếp theo

  return (
    <div className={cx("speaking-wrapper")}>
      <div className={cx("content-box")}>
        {isPreparing ? (
          <PrepareRecord startRecord={startRecord} />
        ) : (
          <RecordingQuestion totalTime={180} stopRecord={stopRecord} />
        )}
      </div>
      <div className={cx("note-box")}>
        <h5 className={cx("note-header")}>Lưu ý:</h5>
        <div className={cx("note-list")}>
          <p className={cx("note-item")}>1. Hệ thống sẽ tự động lưu bài làm của bạn.</p>
          <p className={cx("note-item")}>2. Hệ thống sẽ tự động chuyển sang bài tiếp theo khi kết thúc.</p>
          <p className={cx("note-item")}>3. Trước khi bắt đầu một bài mới, bạn sẽ có 1 phút để chuẩn bị.</p>
          <p className={cx("note-item")}>4. Nếu nhấn nạp kĩ năng, hệ thống sẽ kết thúc luôn bài thi của bạn.</p>
        </div>
      </div>
    </div>
  );
};
export default SpeakingQuestion;
