/* eslint-disable @typescript-eslint/no-explicit-any */
import SpeakingRecord from "@/components/SpeakingRecord";
import { LoadingOutlined } from "@ant-design/icons";
import style from "./RightBox.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import { message, Spin } from "antd";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useNavigate } from "react-router-dom";
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
    return () => {
      clearTimeout(interval);
    };
  }, [timeCountDown]);
  useEffect(() => {
    return () => {
      setTimeCountDown(60);
    };
  }, []);

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
  const dispatch: AppDispatch = useDispatch();
  const { isSubmitting } = useSelector((state: RootState) => state.examStore);
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
      dispatch(ExamActions.changeIsSubmitting(true));
      const audioUpload = await uploadService.uploadAnAudio(blob, CloudPresets.AUDIO);
      if (audioUpload.success) {
        stopRecord(audioUpload.data.secure_url);
        toast.success("Tải file lên server thành công");
      } else {
        toast.error("Có lỗi xảy ra khi tải file lên server");
        dispatch(ExamActions.changeIsSubmitting(false));
      }
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
      {isSubmitting && (
        <div className={cx("loading")}>
          <Spin indicator={<LoadingOutlined spin />} size='large' />
        </div>
      )}
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
  const [isPreparing, setIsPreparing] = useState(true);
  const navigation = useNavigate();
  const { selectedQuestion, selectedLevel, listQuestionOfSkill, selectedSkill, currentExam } = useSelector(
    (state: RootState) => state.examStore
  );
  const dispatch: AppDispatch = useDispatch();
  const startRecord = () => {
    setIsPreparing(false);
  };
  useEffect(() => {
    if (selectedSkill && (listQuestionOfSkill?.length ?? 0) > 0) {
      dispatch(ExamActions.getCurrentSpeakingQuestion());
    }
  }, [selectedSkill, listQuestionOfSkill, dispatch]);
  useEffect(() => {
    setIsPreparing(true);
    console.log("change level");
  }, [selectedLevel]);
  const stopRecord = (url: string) => {
    dispatch(
      ExamActions.submitSpeakingSkill({
        questionId: selectedQuestion?.id || "",
        answer: url,
        skillId: selectedQuestion?.skillId || "speaking",
        levelId: selectedQuestion?.levelId || "",
      })
    );
    if (selectedQuestion?.skill?.id === "speaking" && selectedQuestion?.levelId === "speaking-part-3") {
      navigation(`/exam/score/${currentExam?.id}`);
    }
    // upload file ở đây, dùng url để upload
  };
  const timeExpired = useMemo(() => {
    if (selectedLevel === "speaking-part-1") {
      return 180;
    }
    if (selectedLevel === "speaking-part-2") {
      return 240;
    }
    return 300;
  }, [selectedLevel]);
  // hết 1 level => lưu bài làm => chuyển sang bài tiếp theo
  return (
    <div className={cx("speaking-wrapper")}>
      <div className={cx("content-box")}>
        {isPreparing ? (
          <PrepareRecord startRecord={startRecord} />
        ) : (
          <RecordingQuestion totalTime={timeExpired} stopRecord={stopRecord} />
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
