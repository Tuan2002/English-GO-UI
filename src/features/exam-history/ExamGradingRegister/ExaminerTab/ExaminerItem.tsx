import { Checkbox, Popover } from "antd";
import style from "../ExamGradingRegister.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const ExaminerDetail = () => {
  return <div className={cx("examiner-detail")}></div>;
};

const ExaminerItem = () => {
  return (
    <div className={cx("examiner-item")}>
      <Popover content={<ExaminerDetail />} arrow={true} trigger='click'>
        <div className={cx("examiner-item-box")}>
          <span className={cx("examiner-choose")}>
            <Checkbox />
          </span>
          <div className={cx("examiner-avatar")}>
            <img
              className='full-width full-height'
              src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png'
              alt='avatar'
            />
            <span>Nguyễn Tạ Quyền</span>
          </div>
          <p className={cx("examiner-description")}>
            Mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô
            tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả
            mô tả mô tả mô tả mô tả mô tả mô tả mô tả
          </p>
        </div>
      </Popover>
    </div>
  );
};
export default ExaminerItem;
