import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Footer = () => {
  return (
    <div className={cx("footer")}>
      <span>
        Copyright © By <span className='font-weight-600'>Nguyễn Tạ Quyền</span> - 62K3 CNTT - Version 1.0.1
      </span>
    </div>
  );
};
export default Footer;
