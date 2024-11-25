import React, { memo, useEffect, useRef, useState } from "react";
import style from "./AudioPlayer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

// Định nghĩa kiểu cho các props của component
interface AudioPlayerProps {
  audioSrc: string;
  disabledPause?: boolean;
  disabledChangeProgress?: boolean;
  disabledRepeat?: boolean;
  currentAudioTime?: number;
  changeCurrentAudioTime?: (time: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  disabledPause = false,
  disabledChangeProgress = false,
  disabledRepeat = false,
  currentAudioTime = 0,
  changeCurrentAudioTime,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioTimeRef = useRef<number>(currentAudioTime); // Ref để lưu currentTime chính xác khi unmount
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(currentAudioTime);
  const [duration, setDuration] = useState<number>(0);

  // Hàm định dạng thời gian
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Hàm điều khiển play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        if (disabledPause) return;
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Hàm cập nhật thời gian khi audio đang phát
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(currentProgress) ? 0 : currentProgress); // Kiểm tra giá trị NaN cho progress
      setCurrentTime(audio.currentTime);
      currentAudioTimeRef.current = audio.currentTime; // Cập nhật currentAudioTimeRef
    }
  };

  // Hàm khi metadata của audio được tải xong
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      const audioDuration = audio.duration;
      setDuration(isNaN(audioDuration) || audioDuration === 0 ? 1 : audioDuration); // Kiểm tra giá trị NaN hoặc 0 cho duration
    }
  };

  // Hàm thay đổi tiến độ khi người dùng kéo thanh tiến độ
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newProgress = Number(e.target.value);
    if (audio) {
      if (disabledChangeProgress) return;
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  // Hàm cập nhật currentAudioTime khi prop currentAudioTime thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentAudioTime !== undefined) {
      audio.currentTime = currentAudioTime;
      setCurrentTime(currentAudioTime);
      setProgress((currentAudioTime / duration) * 100);
    }
  }, [currentAudioTime, duration, audioSrc, changeCurrentAudioTime]);

  // Hàm xử lý sự kiện khi audioSrc thay đổi
  useEffect(() => {
    setIsPlaying(false);
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    // Cleanup khi component bị unmount hoặc audioSrc thay đổi
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
      if (changeCurrentAudioTime) {
        changeCurrentAudioTime(currentAudioTimeRef.current);
      }
    };
  }, [audioSrc]);

  return (
    <div className={cx("audio-player")}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(disabledRepeat);
          if (changeCurrentAudioTime) changeCurrentAudioTime(duration);
        }}
      ></audio>

      <button onClick={togglePlayPause} className={cx("play-pause-btn")}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <div className={cx("time-display")}>
        <span>{formatTime(currentTime)}</span> <span> /</span> <span>{formatTime(duration)}</span>
      </div>
      <input
        type='range'
        min='0'
        max='100'
        value={isNaN(progress) ? 0 : progress} // Kiểm tra giá trị NaN cho progress
        onChange={handleProgressChange}
        className={cx("progress-bar")}
      />
    </div>
  );
};

export default memo(AudioPlayer);
