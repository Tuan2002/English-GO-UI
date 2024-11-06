import React, { forwardRef, useImperativeHandle } from "react";
import { BiMicrophone } from "react-icons/bi";
import style from "./AudioRecord.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

interface ISpeakingRecordProps {
  handleEndRecording: (blob: Blob) => void;
}
interface ISpeakingRecordRef {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const SpeakingRecord = forwardRef<ISpeakingRecordRef, ISpeakingRecordProps>(({ handleEndRecording }, ref) => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: Blob) => {
    handleEndRecording(blob);
  };
  const handleStartRecording = () => {
    recorderControls.startRecording();
  };
  const handleStopRecording = () => {
    recorderControls.stopRecording();
  };
  useImperativeHandle(ref, () => ({
    handleStartRecording,
    handleStopRecording,
  }));

  return (
    <div>
      <button className={cx("audio-button")}>
        <BiMicrophone />
      </button>
      <AudioRecorder
        classes={{
          AudioRecorderClass: cx("audio-recorder"),
        }}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        // showVisualizer
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
    </div>
  );
});

export default SpeakingRecord;
