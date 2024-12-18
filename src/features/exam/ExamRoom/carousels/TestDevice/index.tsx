import SpeakingRecord from "@/components/SpeakingRecord";
import style from "../Carousel.module.scss";
import classNames from "classnames/bind";
import React from "react";
import { BiMicrophone, BiPlayCircle, BiRotateLeft } from "react-icons/bi";
const cx = classNames.bind(style);
const TestDevice = () => {
  const speakerRef = React.useRef<any>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const handleEndRecord = (blob: any) => {
    console.log(blob);
  };
  const handleStartRecord = () => {
    setIsRecording(true);
  };

  return (
    <div className={cx("carousel-item-wrapper")}>
      <div className={cx("carousel-item-header")}>
        <span className={cx("number")}>1</span>
        <span className={cx("title")}>Kiểm tra thiết bị</span>
      </div>
      <div className={cx("carousel-content")}>
        <div className={cx("test-device-box", "content-box")}>
          <div className={cx("test-device-item", "content-item", "mb-10")}>
            <h5 className={cx("title")}>
              <span className='secondary-color'>Phần 1:</span> Kiểm tra âm thanh
            </h5>
            <div className={cx("content")}>
              <p>
                <span>- Bước 1: </span> Mở loa hoặc đeo tai nghe để nghe đoạn audio bên dưới
              </p>
              <audio controls className='full-width mt-10 mb-10'>
                <source src='/src/assets/audio-test.mp3' type='audio/mpeg' />
                Your browser does not support the audio element.
              </audio>
              <p>
                <span>- Bước 2: </span> Để mic thu âm sát miệng
              </p>
              <p>
                <span>- Bước 3: </span> Nhấp vào nút "Thu âm" ở bên dưới để bắt đầu thu âm.
              </p>
              <p>
                <span>- Bước 4: </span> Nhấp vào nút "Nghe lại", nếu không nghe được giọng của mình, vui lòng kiểm tra lại cài đặt
                hoặc thiết bị.
              </p>
              <div className={cx("test-micro")}>
                <div className={cx("button", "button-small")}>
                  <BiPlayCircle />
                </div>
                {!isRecording ? (
                  <div onClick={handleStartRecord} className={cx("button", "button-record")}>
                    <BiMicrophone />
                  </div>
                ) : (
                  <div onClick={handleEndRecord} className={cx("button", "button-record")}>
                    <BiMicrophone />
                  </div>
                )}
                <div className={cx("button", "button-small")}>
                  <BiRotateLeft />
                </div>
              </div>
              <div className='d-none'>
                <SpeakingRecord ref={speakerRef} handleEndRecording={handleEndRecord} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestDevice;
