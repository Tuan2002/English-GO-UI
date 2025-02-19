import classNames from "classnames/bind";
import style from "../HomePage.module.scss";
const cx = classNames.bind(style);
const Footer = () => {
  return (
    <div className={cx("footer")}>
      <span className='text-center'>
        Copyright © By <span className='font-weight-600'>Nguyễn Tạ Quyền</span> &{" "}
        <span className='font-weight-600'>Nguyễn Ngọc Anh Tuấn</span> <br /> 62K3 CNTT - Version 1.0.2
      </span>
    </div>
  );
};
export default Footer;
