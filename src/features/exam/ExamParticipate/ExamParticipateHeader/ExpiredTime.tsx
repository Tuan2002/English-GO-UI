import { message } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import style from "./ExamHeader.module.scss";
const cx = classNames.bind(style);
interface IExpiredTimeProps {
  initTime?: number;
  handleSubmit: () => void;
  key?: string;
}
const ExpiredTime = ({ initTime, handleSubmit, key }: IExpiredTimeProps) => {
  const [timeCountDown, setTimeCountDown] = useState(initTime);

  useEffect(() => {
    setTimeCountDown(initTime);
  }, [initTime, key]);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeCountDown) {
        setTimeCountDown(timeCountDown - 1);
      }
    }, 1000);
    if (timeCountDown == 0) {
      // Call api to submit skill
      handleSubmit();
      clearInterval(interval);
      return;
    }
    if (timeCountDown == 60) {
      message.warning("Hệ thống sẽ tự nạp bài sau 1 phút nữa!");
    }
    if (timeCountDown == 5) {
      message.warning("Hệ thống sẽ tự nạp bài sau 5 giây nữa!");
    }
    return () => clearTimeout(interval);
  }, [handleSubmit, timeCountDown]);
  return (
    <div className={cx("time")}>
      <div className={cx("time-countdown")}>
        <span className={cx("minutes")}>
          {timeCountDown && Math.floor(timeCountDown / 60) >= 0 ? `0${Math.floor(timeCountDown / 60)}`.slice(-2) : "00"}
        </span>
        <span className={cx("space")}>:</span>
        <span className={cx("seconds")}>
          {timeCountDown && timeCountDown % 60 >= 0 ? `0${timeCountDown % 60}`.slice(-2) : "00"}
        </span>
      </div>
    </div>
  );
};
export default ExpiredTime;
