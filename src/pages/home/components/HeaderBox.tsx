import classNames from "classnames/bind";
import { ReactNode } from "react";
import style from "../HomePage.module.scss";
const cx = classNames.bind(style);

interface HeaderBoxProps {
  title?: string;
  description?: ReactNode;
  isUpperCase?: boolean;
  maxWidth?: string;
}
const HeaderBox = ({ title = "Truyền title vào nè", description, isUpperCase = false, maxWidth = "500px" }: HeaderBoxProps) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className={cx("header-box")} style={{ maxWidth }}>
        <h1 className={cx("header-title", { uppercase: isUpperCase })}>{title}</h1>
        <img className={cx("trang-tri")} src='/trang-tri.png' alt='' />
        <div className={cx("description")}>{description}</div>
      </div>
    </div>
  );
};

export default HeaderBox;
