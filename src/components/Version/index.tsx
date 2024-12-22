import style from "./Version.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const Version = () => {
  return <span className={cx("version")}>Version 1.0.1</span>;
};
export default Version;
