import React, { useEffect, useRef, useState } from "react";
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
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  disabledPause = false,
  disabledChangeProgress = false,
  disabledRepeat = false,
  currentAudioTime = 15,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Tham chiếu đến phần tử audio
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(currentAudioTime); // Thời gian hiện tại
  const [duration, setDuration] = useState<number>(0); // Thời lượng audio

  // Chuyển đổi thời gian (giây) thành chuỗi mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Bắt đầu hoặc dừng phát audio
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

  // Xử lý cập nhật tiến trình phát và thời gian hiện tại
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(audio.currentTime);
    }
  };

  // Thiết lập thời lượng khi audio đã tải metadata
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  // Xử lý khi người dùng kéo thanh tiến trình
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newProgress = Number(e.target.value);
    if (audio) {
      if (disabledChangeProgress) return;
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  // Cập nhật currentTime khi externalCurrentTime thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentAudioTime !== undefined && currentAudioTime !== currentTime) {
      audio.currentTime = currentAudioTime;
      setCurrentTime(currentAudioTime);
      setProgress((currentAudioTime / duration) * 100);
    }
  }, [currentAudioTime, duration]);

  return (
    <div className={cx("audio-player")}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(disabledRepeat)}
      ></audio>

      <button onClick={togglePlayPause} className={cx("play-pause-btn")}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <div className={cx("time-display")}>
        <span>{formatTime(currentTime)}</span> <span> /</span> <span>{formatTime(duration)}</span>
      </div>
      <input type='range' min='0' max='100' value={progress} onChange={handleProgressChange} className={cx("progress-bar")} />
    </div>
  );
};

export default AudioPlayer;
